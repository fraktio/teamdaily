import { connect } from 'react-redux';
import ProjectMatrix from 'components/ProjectMatrix';
import { bindActionCreators } from 'redux';

import * as employeeActions from 'ducks/employees';
import * as projectActions from 'ducks/projects';
import * as employeeProjectActions from 'ducks/employeeProjects';

export default connect(
  state => ({
    employees: state.employees,
    projects: state.projects,
    employeeProjects: state.employeeProjects.get('employeeProjects')
  }),
  dispatch => ({
    employeeActions: bindActionCreators(employeeActions, dispatch),
    projectActions: bindActionCreators(projectActions, dispatch),
    employeeProjectActions: bindActionCreators(employeeProjectActions, dispatch)
  }),
)(ProjectMatrix);
