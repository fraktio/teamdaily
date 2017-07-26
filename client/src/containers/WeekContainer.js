import { connect } from 'react-redux';
import Week from 'components/Week';
import { bindActionCreators } from 'redux';

import * as entryActions from 'ducks/entry';
import * as employeeProjectActions from 'ducks/employeeProjects';
import * as projectActions from 'ducks/projects';

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
    employeeProjectActions: bindActionCreators(employeeProjectActions, dispatch),
    projectActions: bindActionCreators(projectActions, dispatch)
  }),
)(Week);
