import { List } from 'immutable';
import api from 'services/api';

const LOAD = 'teamdaily/projects/LOAD';
const CREATE = 'teamdaily/projects/CREATE';
const UPDATE = 'teamdaily/projects/UPDATE';

export default function reducer(state = [], action) {
  switch (action.type) {
    case LOAD:
      return List(action.projects).toJS();
    case CREATE:
      return List(state)
        .push({
          name: action.project,
          id: `${action.project}-disabled`,
          disabled: true,
        })
        .toJS();
    case UPDATE:
      return List(state)
        .set(state.findIndex(item => item.id === action.project.id), action.project)
        .toJS();
    default:
      return state;
  }
}

function receiveProjects(projects) {
  return {
    type: LOAD,
    projects,
  };
}

export function fetchProjects() {
  return dispatch => {
    api.getProjects().then(projects => {
      dispatch(receiveProjects(projects));
    });
  };
}

function addNewProject(project) {
  return {
    type: CREATE,
    project,
  };
}

export function addProject(project) {
  return dispatch => {
    // Perform optimistic update, add new project as
    // disabled (since we don't know project ID yet)
    dispatch(() => addNewProject(project));

    // Always refetch projects to be sure we are in
    // sync with the server
    return api
      .addProject(project)
      .then(() => dispatch(fetchProjects()))
      .catch(() => dispatch(fetchProjects()));
  };
}

export function deleteProject(id) {
  return dispatch => {
    api
      .deleteProject(id)
      .then(() => dispatch(fetchProjects()))
      .catch(() => dispatch(fetchProjects()));
  };
}

export function setProjectColor(project, color) {
  return dispatch => {
    project.color = color;

    return api
      .updateProject(project)
      .then(() =>
        dispatch({
          type: UPDATE,
          project,
        }),
      )
      .catch(e => {
        console.log(e);
        dispatch(fetchProjects());
      });
  };
}

export function setProjectMessage(project, message) {
  return dispatch => {
    project.message = message;

    return api
      .updateProject(project)
      .then(() =>
        dispatch({
          type: UPDATE,
          project,
        }),
      )
      .catch(e => {
        console.log(e);
        dispatch(fetchProjects());
      });
  };
}
