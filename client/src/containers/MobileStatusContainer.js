import { connect } from 'react-redux';
import MobileStatus from 'components/MobileStatus';

import { addEntry } from 'ducks/entry';

export default connect(
  state => ({
    entries: state.entry.entries,
    date: state.entry.date,
    loading: state.entry.loading,
    employees: state.employees,
    projects: state.projects,
  }),
  {
    addEntry,
  },
)(MobileStatus);
