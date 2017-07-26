import { connect } from 'react-redux';

import AdminView from '../components/AdminView/AdminView';
import { addProject, deleteProject } from 'ducks/projects';
import { addEmployee, deleteEmployee } from 'ducks/employees';

export default connect(
  state => ({
    employees: state.employees,
    projects: state.projects,
  }),
  {
    addProject,
    deleteProject,
    addEmployee,
    deleteEmployee,
  },
)(AdminView);
