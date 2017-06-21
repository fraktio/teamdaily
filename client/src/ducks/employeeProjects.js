import { Map, List } from 'immutable';
import api from 'services/api';
import localstorage from 'services/localstorage';

const LOAD = 'teamdaily/employeeProject/LOAD';
const NOTIFICATION_SET = 'teamdaily/employeeProject/NOTIFICATION_SET';

const defaultState = Map({
  employeeProjects: List(),
  employeeProjectsSavedNotification: false
});

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case LOAD:
      return state.update('employeeProjects', () => action.employeeProjects);

    case NOTIFICATION_SET:
      return state.update('employeeProjectsSavedNotification', () =>
        action.employeeProjectsSavedNotification
      );

    default:
      return state;
  }
}

function receiveEmployeeProjects(employeeProjects) {
  return {
    type: LOAD,
    employeeProjects
  };
}

function setEmployeeProjectsSavedNotificationState(employeeProjectsSavedNotification) {
  return {
    type: NOTIFICATION_SET,
    employeeProjectsSavedNotification
  }
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
    ...state
  });

  return function(dispatch) {
    api.saveProject(employeeId, projectId, newProjectState).then(employeeProjects => {
      dispatch(setEmployeeProjectsSavedNotificationState(true));
      setTimeout(() => {
        dispatch(setEmployeeProjectsSavedNotificationState(false));
      }, 2000);
    }).catch(() => {
      console.log('TODO fail handler');
    });
  };
}
