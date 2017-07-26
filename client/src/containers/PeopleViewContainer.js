import { connect } from 'react-redux';

import PeopleView from '../components/PeopleView/PeopleView';
import { prevWeek, nextWeek, setWeek } from 'ducks/entry';

export default connect(
  state => ({
    employees: state.employees,
    projects: state.projects,
    entries: state.entry.entries,
    date: state.entry.date,
  }),
  {
    prevWeek,
    nextWeek,
    setWeek
  },
)(PeopleView);
