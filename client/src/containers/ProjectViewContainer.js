import { connect } from 'react-redux';

import ProjectView from '../components/ProjectView/ProjectView';
import { setProjectColor, setProjectMessage } from '../ducks/projects';

export default connect(
  state => ({
    employees: state.employees,
    projects: state.projects,
    entries: state.entry.entries,
    date: state.entry.date,
  }),
  {
    setProjectColor,
    setProjectMessage,
  },
)(ProjectView);
