import { Map } from 'immutable';

const NOTIFICATION_SET = 'teamdaily/employeeProject/NOTIFICATION_SET';

const defaultState = Map({
  projectsSavedNotification: false,
});

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case NOTIFICATION_SET:
      return state.update('projectsSavedNotification', () => action.projectsSavedNotification);

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
