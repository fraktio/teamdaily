import { connect } from 'react-redux';
import App from 'components/App';

import { prevWeek, nextWeek } from 'ducks/entry';
import { withRouter } from 'react-router';
import { compose } from 'recompose';

export default compose(
  withRouter,
  connect(
    state => ({
      date: state.entry.date,
    }),
    {
      prevWeek,
      nextWeek,
    },
  ),
)(App);
