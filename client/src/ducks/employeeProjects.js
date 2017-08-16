import { Map } from 'immutable';

const NOTIFICATION_SET = 'teamdaily/employeeProject/NOTIFICATION_SET';
const CHANGE_SELECTED_PERSON = 'teamdaily/employeeProject/CHANGE_SELECTED_PERSON';

const defaultState = Map({
  projectsSavedNotification: false,
  selectedPersonId: null,
});

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case NOTIFICATION_SET:
      return state.update('projectsSavedNotification', () => action.projectsSavedNotification);

    case CHANGE_SELECTED_PERSON:
      return state.update('selectedPersonId', () => action.selectedPersonId);

    default:
      return state;
  }
}

function projectsSavedNotification(projectsSavedNotification) {
  return {
    type: NOTIFICATION_SET,
    projectsSavedNotification,
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

function changeSelectedPersonId(selectedPersonId) {
  return {
    type: CHANGE_SELECTED_PERSON,
    selectedPersonId,
  };
}

export function changeSelectedPerson(selectedPersonId) {
  return dispatch => {
    dispatch(changeSelectedPersonId(selectedPersonId));
  };
}
