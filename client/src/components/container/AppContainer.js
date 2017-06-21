import { connect } from 'react-redux';
import App from '../App';
import { bindActionCreators } from 'redux';

import * as entryActions from 'ducks/entry';
import * as employeeActions from 'ducks/employees';
import * as projectActions from 'ducks/projects';
import * as employeeProjectActions from 'ducks/employeeProjects';
import { withRouter } from 'react-router';
import { compose } from 'recompose';

export default compose(
  withRouter,
  connect(state => ({
      entries: state.entry.entries,
      d: state.entry.d,
      loading: state.entry.loading,
      employees: state.employees,
      projects: state.projects,
      employeeProjects: state.employeeProjects
    }),
    dispatch => ({
      entryActions: bindActionCreators(entryActions, dispatch),
      employeeActions: bindActionCreators(employeeActions, dispatch),
      projectActions: bindActionCreators(projectActions, dispatch),
      employeeProjectActions: bindActionCreators(employeeProjectActions, dispatch)
    })
  )
)(App);
