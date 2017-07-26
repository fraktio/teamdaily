import { connect } from 'react-redux';
import Info from 'components/Info';

export default connect(
  state => ({
    entries: state.entry.entries,
    date: state.entry.date,
    loading: state.entry.loading,
    employees: state.employees,
    projects: state.projects
  }),
  {},
)(Info);
