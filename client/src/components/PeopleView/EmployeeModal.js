import React, { Component } from "react";
import {
  alphabeticalSort,
  getLatestEntry,
  getEntryColor,
  doesFlaggedExist
} from "../../utils/helpers";
import { FormattedMessage, injectIntl } from "react-intl";

import WeekSelection from "../WeekSelection";
import Modal from "react-modal";
import * as colors from "../../colors";

import { Icon } from "react-fa";
import keydown from "react-keydown";

import FlaggedIcon from "assets/flagged.svg";

import styles from "./style.pcss";
import menuStyles from "./menuStyle.pcss";
import modalStyles from "./modalStyle.pcss";

class EmployeeModal extends React.Component {
  selectColor = color => this.setState({ color: color });
  handleCloseClick = () => this.props.handleClose();

  componentWillMount() {
    const latestEntry =
      this.props.e.entry.size > 0 ? this.props.e.entry.get(-1) : null;
    if (latestEntry) {
      this.selectColor(latestEntry.color);
    }
  }

  @keydown(37)
  lastWeek(event) {
    this.props.onPrevWeek();
  }

  @keydown(39)
  nextWeek(event) {
    this.props.onNextWeek();
  }

  @keydown(27)
  closeModal = event => {
    event.preventDefault();
    this.props.handleClose();
  };
  @keydown(40)
  next(event) {
    event.preventDefault();
    const ordered = this.props.orderedEmployees.toJS();
    const index = ordered.findIndex(emp => emp.id === this.props.e.id);

    if (!ordered[index + 1]) {
      return;
    }

    const nextEmployee = ordered[index + 1];
    this.props.handleSelectEmployee(nextEmployee);
  }
  @keydown(38)
  prev(event) {
    event.preventDefault();
    const ordered = this.props.orderedEmployees.toJS();
    const index = ordered.findIndex(emp => emp.id === this.props.e.id);

    if (!ordered[index - 1]) {
      return;
    }

    const prevEmployee = ordered[index - 1];
    this.props.handleSelectEmployee(prevEmployee);
  }

  render() {
    const {
      e,
      handleClose,
      projects,
      sortedEmployees,
      handleSelectEmployee,
      orderedEmployees,
      entries,
      date,
      intl,
      onPrevWeek,
      onNextWeek
    } = this.props;

    if (!e) {
      return null;
    }

    const latestEntry = getLatestEntry(e.entry);
    const color = getEntryColor(latestEntry);
    const flagged = doesFlaggedExist(latestEntry);

    return (
      <div>
        <div className={menuStyles.menu}>
          <div className={menuStyles.header}>
            <WeekSelection
              date={date}
              onPrevWeek={onPrevWeek}
              onNextWeek={onNextWeek}
            />
          </div>
          {orderedEmployees.map(employee => {
            const isSelected = employee.id === e.id;
            const menuColor = `menu-${getColor(employee)}`;
            const employeeLatestEntry = entries
              .filter(entry => entry.name === employee.name)
              .get(-1);
            const flagged = doesFlaggedExist(employeeLatestEntry);

            return (
              <div
                className={`${menuStyles.employee} ${isSelected
                  ? menuStyles.selected
                  : ""} ${menuColor}`}
                key={employee.id}
                onClick={() => handleSelectEmployee(employee)}
              >
                {employee.name}
                {flagged &&
                  <img className={menuStyles.flagged} src={FlaggedIcon} />}
              </div>
            );
          })}
        </div>
        <Modal
          isOpen={true}
          contentLabel="Modal"
          onRequestClose={this.closeModal}
          className={{
            base: modalStyles.modal
          }}
          overlayClassName={{
            base: modalStyles.overlay
          }}
        >
          <button
            className={modalStyles.closeButton}
            onClick={this.handleCloseClick}
          >
            X
          </button>
          <div className={`${modalStyles.header} ${color}`}>
            <h4 className={modalStyles.title}>
              {e.name}
              {flagged && <img src={FlaggedIcon} />}
            </h4>
          </div>
          {latestEntry &&
            <div className={modalStyles.message}>
              {latestEntry.message}
            </div>}
          <div className={modalStyles.content}>
            <FormattedMessage id="people_status" defaultMessage="Status" />
            <div className={modalStyles.moods}>
              {MoodsList.map(m => {
                const isActive = color === m.color ? true : false;

                return (
                  <div
                    className={`${modalStyles.mood} ${isActive
                      ? modalStyles.activeMood
                      : ""}`}
                    key={m.color}
                  >
                    {m.icon}
                    <p className={m.color}>
                      {intl.messages[m.message]}
                    </p>
                  </div>
                );
              })}
            </div>
            <FormattedMessage
              id="people_participating"
              defaultMessage="Projects"
            />
            <div className={modalStyles.projects}>
              {e.employeeProjects &&
                e.employeeProjects
                  .sort((a, b) => alphabeticalSort(a.name, b.name))
                  .map(p =>
                    <button className={styles.project} key={p.id}>
                      {p.name}
                    </button>
                  )}
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default injectIntl(EmployeeModal);

const MoodsList = [
  {
    color: colors.COLOR_PINK,
    message: "statusForm_onVacation",
    icon: "🌴"
  },
  {
    color: colors.COLOR_BLUE,
    message: "statusForm_notEnough",
    icon: "😪"
  },
  {
    color: colors.COLOR_GREEN,
    message: "statusForm_ok",
    icon: "😁"
  },
  {
    color: colors.COLOR_YELLOW,
    message: "statusForm_busy",
    icon: "😕"
  },
  {
    color: colors.COLOR_RED,
    message: "statusForm_tooMuch",
    icon: "😵"
  }
];

function getColor(e) {
  const latestEntry = e.entry.size > 0 ? e.entry.get(-1) : null;
  return latestEntry ? latestEntry.color : "empty";
}
