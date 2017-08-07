import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import keydown from 'react-keydown';
import Modal from 'react-modal';

import WeekSelection from '../WeekSelection';
import styles from './style.pcss';
import menuStyles from './menuStyle.pcss';
import modalStyles from './modalStyle.pcss';
import FlaggedIcon from 'assets/flagged.svg';

const KEYCODES = {
  ARROW_LEFT: 37,
  ARROW_RIGHT: 39,
  ARROW_UP: 38,
  ARROW_DOWN: 40,
  ESC: 27,
};

class EmployeeModal extends Component {
  @keydown(KEYCODES.ARROW_LEFT)
  lastWeek(event) {
    this.props.onPrevWeek();
  }

  @keydown(KEYCODES.ARROW_RIGHT)
  nextWeek(event) {
    this.props.onNextWeek();
  }

  @keydown(KEYCODES.ESC)
  closeModal = event => {
    event.preventDefault();
    this.props.handleClose();
  };

  @keydown(KEYCODES.ARROW_DOWN)
  next(event) {
    event.preventDefault();
    const people = this.props.people;
    const index = people.findIndex(emp => emp.id === this.props.employee.id);

    if (!people[index + 1]) {
      return;
    }

    const nextEmployee = people[index + 1];
    this.props.handleSelectEmployee(nextEmployee);
  }

  @keydown(KEYCODES.ARROW_UP)
  prev(event) {
    event.preventDefault();
    const people = this.props.people;
    const index = people.findIndex(emp => emp.id === this.props.employee.id);

    if (!people[index - 1]) {
      return;
    }

    const prevEmployee = people[index - 1];
    this.props.handleSelectEmployee(prevEmployee);
  }

  render() {
    const {
      employee,
      handleSelectEmployee,
      people,
      date,
      intl,
      onPrevWeek,
      onNextWeek,
    } = this.props;

    if (!employee) {
      return null;
    }

    const latestEntry = this.props.employee.entries.length > 0 && this.props.employee.entries[0];
    const modalHeaderColor = latestEntry ? latestEntry.color : 'empty';
    const isFlagged = latestEntry ? latestEntry.flagged : false;

    return (
      <div>
        <div className={menuStyles.menu}>
          <div className={menuStyles.header}>
            <WeekSelection date={date} onPrevWeek={onPrevWeek} onNextWeek={onNextWeek} />
          </div>
          {people.map(person => {
            const isSelected = person.id === employee.id;
            const personLastestEntry = person.entries.length > 0 && person.entries[0];
            const menuColor = `menu-${personLastestEntry.color || 'empty'}`;
            const isFlagged = personLastestEntry ? personLastestEntry.flagged : false;

            return (
              <div
                className={`${menuStyles.employee} ${isSelected
                  ? menuStyles.selected
                  : ''} ${menuColor}`}
                key={person.id}
                onClick={() => handleSelectEmployee(person)}
              >
                {person.name}
                {isFlagged && <img className={menuStyles.flagged} src={FlaggedIcon} />}
              </div>
            );
          })}
        </div>
        <Modal
          isOpen={true}
          contentLabel="Modal"
          onRequestClose={this.closeModal}
          className={{ base: modalStyles.modal }}
          overlayClassName={{ base: modalStyles.overlay }}
        >
          <button className={modalStyles.closeButton} onClick={this.props.handleClose}>
            X
          </button>
          <div className={`${modalStyles.header} ${modalHeaderColor}`}>
            <h4 className={modalStyles.title}>
              {employee.name}
              {isFlagged && <img src={FlaggedIcon} />}
            </h4>
          </div>

          {latestEntry &&
            <div className={modalStyles.message}>
              {latestEntry.message}
            </div>}

          <div className={modalStyles.content}>
            <FormattedMessage id="people_status" defaultMessage="Status" />
            <div className={modalStyles.moods}>
              {moodsList.map(mood => {
                const isActive = modalHeaderColor === mood.color ? true : false;

                return (
                  <div
                    className={`${modalStyles.mood} ${isActive ? modalStyles.activeMood : ''}`}
                    key={mood.color}
                  >
                    <span className={modalStyles.emoji}>
                      {mood.icon}
                    </span>
                    <p className={mood.color}>
                      {intl.messages[mood.message]}
                    </p>
                  </div>
                );
              })}
            </div>
            <FormattedMessage id="people_participating" defaultMessage="Projects" />
            <div className={modalStyles.projects}>
              {employee.projects &&
                employee.projects.map((project, i) =>
                  <button className={styles.project} key={`${project.id}-${i}`}>
                    {project.name}
                  </button>,
                )}
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default injectIntl(EmployeeModal);

const moodsList = [
  {
    color: 'pink',
    message: 'statusForm_onVacation',
    icon: '🌴',
  },
  {
    color: 'blue',
    message: 'statusForm_notEnough',
    icon: '😪',
  },
  {
    color: 'green',
    message: 'statusForm_ok',
    icon: '😁',
  },
  {
    color: 'yellow',
    message: 'statusForm_busy',
    icon: '😕',
  },
  {
    color: 'red',
    message: 'statusForm_tooMuch',
    icon: '😵',
  },
];
