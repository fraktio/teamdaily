import moment from 'moment';

const PREV_WEEK = 'teamdaily/entry/PREV_WEEK';
const NEXT_WEEK = 'teamdaily/entry/NEXT_WEEK';
const SET_DATE = 'teamdaily/entry/SET_DATE';

const defaultState = {
  date: moment(),
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SET_DATE:
      return {
        ...state,
        date: action.date,
      };

    case PREV_WEEK:
      return {
        ...state,
        date: moment(state.date).subtract(1, 'weeks'),
      };
    case NEXT_WEEK:
      return {
        ...state,
        date: moment(state.date).add(1, 'weeks'),
      };

    default:
      return state;
  }
}

export function setWeek(week) {
  return {
    type: SET_DATE,
    date: moment().day('Monday').week(week),
  };
}

export function prevWeek() {
  return {
    type: PREV_WEEK,
  };
}

export function nextWeek() {
  return {
    type: NEXT_WEEK,
  };
}

export function resetWeek() {
  return {
    type: SET_DATE,
    date: moment(),
  };
}
