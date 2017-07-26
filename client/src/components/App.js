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
import AdminView from 'containers/AdminViewContainer';

import styles from './App.pcss';

const fetchEntriesInterval = 60000;

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

    this.setReactivizer(d);
  }

  setReactivizer(d) {
    const { entryActions } = this.props;

    if (this.reactivizer) {
      clearInterval(this.reactivizer);
    }

    this.reactivizer = setInterval(() => {
      entryActions.fetchEntries(d);
    }, fetchEntriesInterval);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.d !== nextProps.d) {
      this.setReactivizer(nextProps.d);
    }
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
      '/week',
    ];

    const renderWeekSelector = weekSelectorPaths.find(path => pathname.includes(path));

    return (
      <div>
        <Header renderWeekSelector={renderWeekSelector} date={d} onChange={entryActions.changeWeek} />

        <Switch>
          <Route path="/matrix" component={WeeklyMatrix} exact />
          <Route path='/week' component={Week} exact />
          <Route path="/index" component={Menu} exact />
          <Route path="/info" component={Info} exact />
          <Route path="/projects" component={ProjectView} exact />
          <Route path="/admin" component={AdminView} exact />
          <Route path="/people/:week" component={PeopleView} exact />
          <Route path="/people" component={PeopleView} exact />
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

