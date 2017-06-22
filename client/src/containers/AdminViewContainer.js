import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AdminView from '../components/AdminView/AdminView';
import * as projectActions from 'ducks/projects';
import * as employeeActions from 'ducks/employees';

export default connect(
  state => ({
    employees: state.employees,
    projects: state.projects,
  }),
  dispatch => ({
    projectActions: bindActionCreators(projectActions, dispatch),
    employeeActions: bindActionCreators(employeeActions, dispatch),
  }),
)(AdminView);
