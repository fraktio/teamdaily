import { connect } from 'react-redux';
import Week from 'components/Week';

import { addEntry } from 'ducks/entry';
import { saveProject } from 'ducks/employeeProjects';
import { addProject } from 'ducks/projects';

export default connect(
  state => ({
    entries: state.entry.entries,
    date: state.entry.d,
    loading: state.entry.loading,
    employees: state.employees,
    projects: state.projects,
    employeeProjectsSavedNotification: state.employeeProjects.get('employeeProjectsSavedNotification')
  }),
  {
    addEntry,
    saveProject,
    addProject
  },
)(Week);
