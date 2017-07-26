import { connect } from 'react-redux';

import PeopleView from '../components/PeopleView/PeopleView';
import { changeWeek } from 'ducks/entry';

export default connect(
  state => ({
    employees: state.employees,
    projects: state.projects,
    entries: state.entry.entries,
    date: state.entry.date,
  }),
  {
    changeWeek
  },
)(PeopleView);
