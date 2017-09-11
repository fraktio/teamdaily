import { connect } from 'react-redux';

import ProjectView from '../components/ProjectView/ProjectView';
import { setProjectStatus, setProjectDescription } from '../ducks/projects';

export default connect(
  state => ({
    employees: state.employees,
    projects: state.projects,
    entries: state.entry.entries,
    date: state.entry.date,
  }),
  {
    setProjectStatus,
    setProjectDescription,
  },
)(ProjectView);
