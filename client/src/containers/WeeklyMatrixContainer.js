import { connect } from 'react-redux';
import WeeklyMatrix from 'components/WeeklyMatrix';

export default connect(
  state => ({
    entries: state.entry.entries,
    date: state.entry.date,
    loading: state.entry.loading,
    employees: state.employees,
    projects: state.projects,
    employeeProjectsSavedNotification: state.employeeProjects.get(
      'employeeProjectsSavedNotification',
    ),
  }),
  {},
)(WeeklyMatrix);
