import React, { Component } from 'react';
import moment from 'moment';
import { push } from '../ReduxRouter';
import Masonry from 'react-masonry-component';

import PersonCard from './PersonCard';
import EmployeeModal from './EmployeeModal';

const changeWeekInterval = 60000;

export default class PeopleView extends Component {
  state = {
    isShowingModal: false,
    selectedEmployee: undefined,
  };

  componentDidMount() {
    this.props.data.startPolling(10000 /* 10 seconds */);
    this.setWeekChangerInterval();
  }

  componentWillMount() {
    const { match, setWeek } = this.props;

    const week = match.params.week;
    if (week) {
      setWeek(week);
    }
  }

  componentWillUnmount() {
    this.props.data.stopPolling();
    clearInterval(this.weekChanger);
  }

  componentWillReceiveProps(nextProps) {
    const { data: { loading, people }, date, setWeek } = this.props;
    const week = parseInt(nextProps.match.params.week, 10);
    const newDate = nextProps.date;

    // Update modal data (this.state.selectedEmployee) when week changes
    // Quite hairy...
    const { selectedEmployee: { id } = { id: undefined }, isShowingModal } = this.state;
    if (isShowingModal && id && !loading) {
      const filteredPeople = people.filter(person => person.id === id);
      const selectedEmployee = filteredPeople.length > 0 ? filteredPeople[0] : undefined;
      this.setState({ selectedEmployee });
    }

    if (date.isSame(newDate) || week === newDate.week()) {
      return;
    }

    if (week) {
      setWeek(newDate.week());
    }

    this.setWeekChangerInterval();
    this.updatePath(newDate.week());
  }

  setWeekChangerInterval() {
    const { match, setWeek, date } = this.props;

    if (this.weekChanger) {
      clearInterval(this.weekChanger);
    }

    this.weekChanger = setInterval(() => {
      const week = date.week();
      const weekNow = moment().week();

      if (!match.params.week && week < weekNow) {
        setWeek(week);
      }
    }, changeWeekInterval);
  }

  updatePath(weekNumber) {
    const currentWeekNumber = moment().week();

    if (weekNumber !== currentWeekNumber) {
      push('/people/' + weekNumber);
      return;
    }

    push('/people');
  }

  handleSelectEmployee = employee => this.setState({ selectedEmployee: employee });

  handleClick = personId => {
    const { data: { people } } = this.props;
    let selectedPerson;

    if (people.length > 0) {
      const filteredPeople = people.filter(person => person.id === personId);
      selectedPerson = filteredPeople.length > 0 ? filteredPeople[0] : undefined;
    }

    this.setState({ isShowingModal: true, selectedEmployee: selectedPerson });
  };

  handleClose = () => this.setState({ isShowingModal: false });

  render() {
    const { data: { loading, people }, date, prevWeek, nextWeek } = this.props;

    const masonryOptions = {
      transitionDuration: 0,
    };

    if (loading) {
      return null;
    }

    const prioritizedPeople = sortPeopleByPriority(people);

    return (
      <div>
        {this.state.isShowingModal &&
          <EmployeeModal
            employee={this.state.selectedEmployee}
            handleClose={this.handleClose}
            people={prioritizedPeople}
            handleSelectEmployee={this.handleSelectEmployee}
            onPrevWeek={prevWeek}
            onNextWeek={nextWeek}
            date={date}
          />}
        <Masonry options={masonryOptions}>
          {prioritizedPeople.map(person =>
            <PersonCard
              key={person.id}
              id={person.id}
              name={person.name}
              projects={person.projects}
              entries={person.entries}
              onClick={this.handleClick}
            />,
          )}
        </Masonry>
      </div>
    );
  }
}

// Higher number means higher priority, 0 lowest priority.
function calculatePriority(person) {
  const { entries, projects } = person;
  let priority = 0;

  if (projects.length < 1 && projects.length > 4) {
    priority = priority + 2;
  }

  if (entries.length > 0) {
    const latestEntry = entries[0];
    if (latestEntry.flagged) {
      priority = priority + 5;
    }

    switch (latestEntry.color) {
      case 'red':
        priority = priority + 20;
        break;
      case 'yellow':
        priority = priority + 12;
        break;
      case 'blue':
        priority = priority + 5;
        break;
      case 'green':
        priority = priority + 1;
        break;
      default:
        break;
    }
  }

  return {
    ...person,
    priority,
  };
}

function sortByPriority(a, b) {
  if (a.priority > b.priority) return -1;
  if (a.priority < b.priority) return 1;
  if (a.priority === b.priority) return 0;
}

function sortPeopleByPriority(people) {
  return people.map(calculatePriority).slice().sort(sortByPriority);
}
