import { List } from 'immutable';
import moment from 'moment';
import api from 'services/api';
import localstorage from 'services/localstorage';

const PREV_WEEK = 'teamdaily/entry/PREV_WEEK';
const NEXT_WEEK = 'teamdaily/entry/NEXT_WEEK';
const SET_DATE = 'teamdaily/entry/SET_DATE';
const REQUEST_ENTRIES = 'teamdaily/entry/REQUEST_ENTRIES';
const RECEIVE_ENTRIES = 'teamdaily/entry/RECEIVE_ENTRIES';
const REQUEST_NEW_ENTRY = 'teamdaily/entry/REQUEST_NEW_ENTRY';
const RECEIVE_NEW_ENTRY = 'teamdaily/entry/RECEIVE_NEW_ENTRY';

const defaultState = {
  entries: List(),
  date: moment(),
  loading: false,
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

    case RECEIVE_NEW_ENTRY:
      return {
        ...state,
        entries: state.entries.concat(action.entry),
        loading: false,
      };

    case RECEIVE_ENTRIES:
      return {
        ...state,
        entries: action.entries.map(entry => {
          entry.flagged = entry.flagged === 1;
          return entry;
        }),
        loading: false,
      };

    // Loading indicators
    case REQUEST_NEW_ENTRY:
    case REQUEST_ENTRIES:
      return {
        ...state,
        loading: true,
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

function requestEntries() {
  return {
    type: REQUEST_ENTRIES,
  };
}

function receiveEntries(entries) {
  return {
    type: RECEIVE_ENTRIES,
    entries,
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

export function fetchEntries(date) {
  return function(dispatch, getState) {
    dispatch(requestEntries(date));
    api.getEntries(date).then(entries => {
      dispatch(receiveEntries(entries));
    });
  };
}

function requestNewEntry() {
  return {
    type: REQUEST_NEW_ENTRY,
  };
}

function receiveNewEntry(entry) {
  return {
    type: RECEIVE_NEW_ENTRY,
    entry,
  };
}

export function addEntry(entry) {
  localstorage.save({
    ...entry,
  });

  return (dispatch, getState) => {
    dispatch(requestNewEntry(entry));

    const date = getState().entry.date;

    api
      .submitStatus(entry, date)
      .then(entry => {
        dispatch(receiveNewEntry(entry));
      })
      .catch(() => {
        console.log('TODO fail handler');
      });
  };
}
