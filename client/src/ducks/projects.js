import { List } from 'immutable';
import api from 'services/api';

const LOAD = 'teamdaily/projects/LOAD';
const CREATE = 'teamdaily/projects/CREATE';
const UPDATE = 'teamdaily/projects/UPDATE';

export default function reducer(state = List(), action) {
  switch (action.type) {
    case LOAD:
      return action.projects;
    case CREATE:
      return state.push({
        name: action.project,
        id: `${action.project}-disabled`,
        disabled: true,
      });
    case UPDATE:
      // console.log(state.findIndex(item => item.id === action.project.id))
      return state.set(state.findIndex(item => item.id === action.project.id), action.project);
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

export function setProjectStatus(project, status) {
  return dispatch => {
    project.status = status;
    dispatch({
      type: UPDATE,
      project,
    });
  };

  return dispatch => {
    project.set('status', status);

    return api
      .updateProject(project)
      .then(() =>
        dispatch({
          type: UPDATE,
          project,
        }),
      )
      .catch(() => dispatch(fetchProjects()));
  };
}

export function setProjectDescription(project, description) {
  return dispatch => {
    project.description = description;

    dispatch({
      type: UPDATE,
      project,
    });

    return Promise.resolve();
  };

  return dispatch => {
    project.description = description;

    return api
      .updateProject(project)
      .then(() =>
        dispatch({
          type: UPDATE,
          project,
        }),
      )
      .catch(() => dispatch(fetchProjects()));
  };
}
