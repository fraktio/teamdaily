import { connect } from 'react-redux';
import Week from 'components/Week';
import { bindActionCreators } from 'redux';

import * as entryActions from 'ducks/entry';
import * as employeeActions from 'ducks/employees';
import * as projectActions from 'ducks/projects';
import * as employeeProjectActions from 'ducks/employeeProjects';

export default connect(
  state => ({
    entries: state.entry.entries,
    date: state.entry.d,
    loading: state.entry.loading,
    employees: state.employees,
    projects: state.projects,
    employeeProjectsSavedNotification: state.employeeProjects.get('employeeProjectsSavedNotification')
  }),
  dispatch => ({
    entryActions: bindActionCreators(entryActions, dispatch),
    employeeActions: bindActionCreators(employeeActions, dispatch),
    projectActions: bindActionCreators(projectActions, dispatch),
    employeeProjectActions: bindActionCreators(employeeProjectActions, dispatch)
  }),
)(Week);
