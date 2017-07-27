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
      date,
      fetchEmployees,
      fetchEntries,
      fetchProjects,
      fetchEmployeeProjects,
    } = this.props;

    fetchEmployees();
    fetchEntries(date);
    fetchProjects();
    fetchEmployeeProjects();

    this.setReactivizer(date);
  }

  setReactivizer(date) {
    const { fetchEntries } = this.props;

    if (this.reactivizer) {
      clearInterval(this.reactivizer);
    }

    this.reactivizer = setInterval(() => {
      fetchEntries(date);
    }, fetchEntriesInterval);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.date.isSame(nextProps.date)) {
      this.setReactivizer(nextProps.date);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { date, fetchEntries } = this.props;

    if (!date.isSame(prevProps.date)) {
      fetchEntries(date);
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
      date,
      prevWeek,
      nextWeek,
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
        <Header
          renderWeekSelector={renderWeekSelector}
          date={date}
          onPrevWeek={prevWeek}
          onNextWeek={nextWeek}
        />

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

