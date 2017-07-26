import { connect } from 'react-redux';
import ProjectMatrix from 'components/ProjectMatrix';

export default connect(
  state => ({
    employees: state.employees,
    projects: state.projects,
    employeeProjects: state.employeeProjects.get('employeeProjects')
  }),
  {},
)(ProjectMatrix);
