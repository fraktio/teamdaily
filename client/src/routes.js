import React from 'react';
import { Router, Route, IndexRoute, Redirect } from 'react-router';

import App from 'containers/AppContainer';
import Week from 'containers/WeekContainer';
import Info from 'containers/InfoContainer';
import ProjectMatrix from 'containers/ProjectMatrixContainer';
import PeopleView from 'containers/PeopleViewContainer';
import ProjectView from 'containers/ProjectViewContainer';
import Menu from 'components/Menu';
import WeeklyMatrix from 'containers/WeeklyMatrixContainer';
import NotFound from 'components/NotFound';

export const createRouter = (history) => (
  <Router history={history}>
    <Redirect from="/" to="/week" />
    <Route component={App} path="/">
      <Route name="index" path="index" component={Menu}/>
      <Route name="info" path="info" component={Info} />
      <Route name="matrix" path="matrix" component={WeeklyMatrix} />
      <Route name="people" path="people" component={PeopleView} />
      <Route name="projects" path="projects" component={ProjectView} />
      <Route name="week" path="week" component={Week}/>
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);

/* <Route name="projects" path="projects" component={ProjectMatrix} /> */
