import React, { Component } from 'react';
import screenfull from 'screenfull';
import KeyCapture from 'components/KeyCapture';
import Header from 'components/Header';
import { Switch, Route, Redirect } from 'react-router';
import Week from 'containers/WeekContainer';
import NotFound from 'components/NotFound';

import MobileStatus from 'containers/MobileStatusContainer';
import Info from 'containers/InfoContainer';
import PeopleView from 'containers/PeopleViewContainer';
import ProjectView from 'containers/ProjectViewContainer';
import Menu from 'components/Menu';
import WeeklyMatrix from 'containers/WeeklyMatrixContainer';


import styles from './App.pcss';

export default class App extends Component {
  componentDidMount() {
    const {
      d,
      employeeActions,
      entryActions,
      projectActions,
      employeeProjectActions,
    } = this.props;

    employeeActions.fetchEmployees();
    entryActions.fetchEntries(d);
    projectActions.fetchProjects();
    employeeProjectActions.fetchEmployeeProjects();

    this.reactivizer = setTimeout(() => {
      entryActions.fetchEntries(d);
    }, 60000);
  }

  componentDidUpdate(prevProps, prevState) {
    const { d, entryActions } = this.props;

    if (d !== prevProps.d) {
      entryActions.fetchEntries(d);
    }
  }

  componentWillUnmount() {
    clearInterval(this.reactivizer);
  }

  toggleFullScreen() {
    screenfull.toggle();
  }

  render() {
    const {
      d,
      entryActions,
      match,
    } = this.props;

    const pathname = document.location.pathname;

    const weekSelectorPaths = [
      '/people',
      '/projects',
    ];

    const renderWeekSelector = weekSelectorPaths.indexOf(pathname) !== -1;

    return (
      <div>
        <Header renderWeekSelector={renderWeekSelector} date={d} onChange={entryActions.changeWeek} />

        <Switch>
          <Route exact path="/matrix" component={WeeklyMatrix} />
          <Route exact path='/week' component={Week}/>
          <Route exact path="/index" component={Menu}/>
          <Route exact path="/info" component={Info} />
          <Route exact path="/people" component={PeopleView} />
          <Route exact path="/projects" component={ProjectView} />
          <Redirect from='/' to='/week' />
          <Route component={NotFound} />
        </Switch>

        <KeyCapture
          combination="ctrl+f"
          onFire={this.toggleFullScreen}
        />
      </div>
    );
  }
}
