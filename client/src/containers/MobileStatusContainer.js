import { connect } from 'react-redux';
import MobileStatus from 'components/MobileStatus';
import { bindActionCreators } from 'redux';

import * as entryActions from 'ducks/entry';
import * as employeeActions from 'ducks/employees';
import * as projectActions from 'ducks/projects';

export default connect(
  state => ({
    entries: state.entry.entries,
    d: state.entry.d,
    loading: state.entry.loading,
    employees: state.employees,
    projects: state.projects
  }),
  dispatch => ({
    entryActions: bindActionCreators(entryActions, dispatch),
    employeeActions: bindActionCreators(employeeActions, dispatch),
    projectActions: bindActionCreators(projectActions, dispatch)
  }),
)(MobileStatus);
