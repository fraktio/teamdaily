import { Map, List } from 'immutable';
import api from 'services/api';
import localstorage from 'services/localstorage';

const LOAD = 'teamdaily/employeeProject/LOAD';
const NOTIFICATION_SET = 'teamdaily/employeeProject/NOTIFICATION_SET';

const defaultState = Map({
  employeeProjects: List(),
  projectsSavedNotification: false,
});

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case LOAD:
      return state.update('employeeProjects', () => action.employeeProjects);

    case NOTIFICATION_SET:
      return state.update('projectsSavedNotification', () => action.projectsSavedNotification);

    default:
      return state;
  }
}

function receiveEmployeeProjects(employeeProjects) {
  return {
    type: LOAD,
    employeeProjects,
  };
}

function projectsSavedNotification(projectsSavedNotification) {
  return {
    type: NOTIFICATION_SET,
    projectsSavedNotification,
  };
}

export function fetchEmployeeProjects() {
  return function(dispatch) {
    api.getEmployeeProjects().then(employeeProjects => {
      dispatch(receiveEmployeeProjects(employeeProjects));
    });
  };
}

export function saveProject(state, employeeId, projectId, newProjectState) {
  localstorage.save({
    ...state,
  });

  return function(dispatch) {
    api
      .saveProject(employeeId, projectId, newProjectState)
      .then(employeeProjects => {
        dispatch(projectsSavedNotification(true));
        setTimeout(() => {
          dispatch(projectsSavedNotification(false));
        }, 2000);
      })
      .catch(() => {
        console.log('TODO fail handler');
      });
  };
}

export function displayProjectsSavedNotification() {
  return dispatch => {
    dispatch(projectsSavedNotification(true));

    setTimeout(() => {
      dispatch(projectsSavedNotification(false));
    }, 2000);
  };
}
