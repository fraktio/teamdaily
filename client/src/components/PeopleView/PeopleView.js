import React, { Component } from "react";
import { alphabeticalSort } from "../../utils/helpers";
import { Link } from "react-router-dom";
import moment from "moment";
import { Icon } from "react-fa";
import { OrderedSet } from "immutable";
import { push } from "../ReduxRouter";
import Masonry from "react-masonry-component";
import { cloneDeep } from "lodash";

import EmployeeCard from "./EmployeeCard";
import styles from "./style.pcss";
import EmployeeModal from "./EmployeeModal";
import menuStyles from "./menuStyle.pcss";
import modalStyles from "./modalStyle.pcss";

const changeWeekInterval = 60000;

export default class PeopleView extends Component {
  state = {
    isShowingModal: false,
    selectedEmployee: null
  };

  handleSelectEmployee = (e, p) => this.setState({ selectedEmployee: e });
  handleClick = (e, p) =>
    this.setState({ isShowingModal: true, selectedEmployee: e });
  handleClose = () => this.setState({ isShowingModal: false });

  componentDidMount() {
    this.setWeekChangerInterval();
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
  componentWillUnmount() {
    clearInterval(this.weekChanger);
  }
  componentWillMount() {
    const { match, setWeek } = this.props;

    const week = match.params.week;
    if (week) {
      setWeek(week);
    }
  }
  componentWillReceiveProps(nextProps) {
    const { date, setWeek } = this.props;
    const week = parseInt(nextProps.match.params.week);
    const newDate = nextProps.date;

    if (date.isSame(newDate) || week === newDate.week()) {
      return;
    }

    if (week) {
      setWeek(newDate.week());
    }

    this.setWeekChangerInterval();
    this.updatePath(newDate.week());
  }

  updatePath(weekNumber) {
    const weekNumberNow = moment().week();

    if (weekNumber !== weekNumberNow) {
      push("/people/" + weekNumber);
      return;
    }

    push("/people");
  }

  render() {
    const {
      employees,
      projects,
      entries,
      date,
      prevWeek,
      nextWeek
    } = this.props;
    const sortedEmployees = sortEmployeesByImportance(
      cloneDeep(employees),
      cloneDeep(entries),
      cloneDeep(projects)
    );

    const orderedEmployees = OrderedSet(
      sortedEmployees.attention
        .concat(sortedEmployees.green)
        .concat(sortedEmployees.withoutEntry)
    );

    const masonryOptions = {
      transitionDuration: 0
    };

    return (
      <div>
        {this.state.isShowingModal &&
          <EmployeeModal
            e={this.state.selectedEmployee}
            handleClose={this.handleClose}
            sortedEmployees={sortedEmployees}
            orderedEmployees={orderedEmployees}
            entries={entries}
            handleSelectEmployee={this.handleSelectEmployee}
            onPrevWeek={prevWeek}
            onNextWeek={nextWeek}
            date={date}
          />}
        <Masonry options={masonryOptions}>
          {orderedEmployees.map(e => {
            return (
              <EmployeeCard
                key={e.name}
                employee={e}
                entry={e.entry}
                handleClick={this.handleClick}
              />
            );
          })}
        </Masonry>
      </div>
    );
  }
}

function sortEmployeesByImportance(employees, entries, projects) {
  return employees.reduce(
    (list, e, r) => {
      e.entry = entries.filter(entry => entry.name === e.name);
      e.employeeProjects = projects
        .sort((a, b) => alphabeticalSort(a.name, b.name))
        .filter(p => {
          if (!e.projects) return null;
          return e.projects.includes(p.id);
        });
      const entry = e.entry.get(-1);
      if (!entry) {
        list.withoutEntry.push(e);
      } else {
        if (entry.color === "green") {
          list.green.push(e);
        } else {
          list.attention.push(e);
        }
      }
      return list;
    },
    { attention: [], green: [], withoutEntry: [] }
  );
}
