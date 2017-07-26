import { List } from 'immutable';
import api from 'services/api';
import { name } from 'services/employee';

const LOAD = 'teamdaily/employees/LOAD';

export default function reducer(state = List(), action) {
  switch (action.type) {
    case LOAD:
      return action.sortedEmployees;
    default:
      return state;
  }
}

function receiveEmployees(employees) {
  const sortedEmployees = employees.sort(
    function(a, b) {
      const aName = name(a.name)
      const bName = name(b.name)

      return aName.localeCompare(bName)
    }
  )

  return {
    type: LOAD,
    sortedEmployees
  };
}

export function fetchEmployees(date) {
  return function(dispatch) {
    api.getEmployees().then(employees => {
      dispatch(receiveEmployees(employees));
    });
  };
};

export function addEmployee(employee) {
  return dispatch => {
    return api.addEmployee(employee)
      .then(() => dispatch(fetchEmployees()))
      .catch(() => dispatch(fetchEmployees()));
  };
};

export function deleteEmployee(id) {
  return dispatch => {
    api.deleteEmployee(id)
      .then(() => dispatch(fetchEmployees()))
      .catch(() => dispatch(fetchEmployees()));
  };
};