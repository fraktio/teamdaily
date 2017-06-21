import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ProjectView from '../components/ProjectView/ProjectView';
import * as entryActions from 'ducks/entry';

export default connect(
  state => ({
    employees: state.employees,
    projects: state.projects,
    entries: state.entry.entries,
    date: state.entry.d,
  }),
  dispatch => ({
      entryActions: bindActionCreators(entryActions, dispatch),
  }),
)(ProjectView);
