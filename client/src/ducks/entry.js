import { List } from 'immutable';
import moment from 'moment';
import api from 'services/api';
import localstorage from 'services/localstorage';

const CHANGE_WEEK = 'teamdaily/entry/CHANGE_WEEK';
const SET_WEEK = 'teamdaily/entry/SET_WEEK';
const RESET_WEEK = 'teamdaily/entry/RESET_WEEK';
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
    case SET_WEEK: 
      return {
        ...state,
        date: moment().day("Monday").week(action.week)
      }
    case RESET_WEEK:
      return {
        ...state,
        date: moment()
      }
    case CHANGE_WEEK:
      return {
        ...state,
        date: moment(state.date).add(action.amount, 'weeks')
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
        loading: true
      };

    default:
      return state;
  }
}

export function setWeek(week) {
  return {
    type: SET_WEEK,
    week
  };
}

function requestEntries() {
  return {
    type: REQUEST_ENTRIES
  };
}

function receiveEntries(entries) {
  return {
    type: RECEIVE_ENTRIES,
    entries
  };
}

export function changeWeek(amount) {
  return {
    type: CHANGE_WEEK,
    amount
  };
};

export function resetWeek() {
  return {
    type: RESET_WEEK
  }
}

export function fetchEntries(date) {
  return function(dispatch, getState) {
    dispatch(requestEntries(date));
    api.getEntries(date).then(entries => {
      dispatch(receiveEntries(entries));
    });
  };
};

function requestNewEntry() {
  return {
    type: REQUEST_NEW_ENTRY
  };
}

function receiveNewEntry(entry) {
  return {
    type: RECEIVE_NEW_ENTRY,
    entry
  };
}

export function addEntry(entry) {
  localstorage.save({
    ...entry
  });

  return (dispatch, getState) => {
    dispatch(requestNewEntry(entry));

    const date = getState().entry.date;

    api.submitStatus(entry, date).then(entry => {
      dispatch(receiveNewEntry(entry));
    }).catch(() => {
      console.log('TODO fail handler');
    });
  };
}
