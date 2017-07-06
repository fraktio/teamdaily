import React, { Component } from 'react';
import { alphabeticalSort, getLatestEntry, getEntryColor, doesFlaggedExist } from '../../utils/helpers';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';

import WeekSelection from '../WeekSelection';
import Modal from 'react-modal';

import { Icon } from 'react-fa';
import keydown from 'react-keydown';

import FlaggedIcon from 'assets/flagged.svg';

import styles from './style.pcss';
import menuStyles from './menuStyle.pcss';
import modalStyles from './modalStyle.pcss';

export default class EmployeeModal extends React.Component {
    selectColor = (color) => this.setState({color: color});
    handleCloseClick = () => this.props.handleClose();

    componentWillMount() {
        const latestEntry = this.props.e.entry.size > 0 ? this.props.e.entry.get(-1) : null;
        if (latestEntry) {
            this.selectColor(latestEntry.color);
        }
    }

    @keydown(37)
    lastWeek(event) { this.props.changeWeek(-1) }
    @keydown(39)
    nextWeek(event) { this.props.changeWeek(1) }
    @keydown(27)
    closeModal = (event) => {
        event.preventDefault();
        this.props.handleClose();
    }
    @keydown(40)
    next(event) {
        event.preventDefault();
        const ordered = this.props.orderedEmployees.toJS();
        const index = ordered.findIndex(emp => emp.id === this.props.e.id);

        if (!ordered[index + 1]) {
            return
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
            return
        }

        const prevEmployee = ordered[index - 1];
        this.props.handleSelectEmployee(prevEmployee);
    }

    render() {
        const { e, handleClose, projects, sortedEmployees, handleSelectEmployee, orderedEmployees, entries, date } = this.props;

        if (!e) { return null; }

        const latestEntry = getLatestEntry(e.entry);
        const color = getEntryColor(latestEntry);
        const flagged = doesFlaggedExist(latestEntry);

        return (
            <div>
                <div className={menuStyles.menu}>
                    <div className={menuStyles.header}>
                        <WeekSelection weekNumberAndYear={date.format('WW-GGGG')} onChange={this.props.changeWeek}/>
                    </div>
                    {
                        orderedEmployees.map(employee => {
                            const isSelected = employee.id === e.id;
                            const menuColor = `menu-${getColor(employee)}`
                            const employeeLatestEntry = entries.filter(entry => entry.name === employee.name).get(-1);
                            const flagged = doesFlaggedExist(employeeLatestEntry);

                            return (
                                <div
                                    className={`${menuStyles.employee} ${isSelected ? menuStyles.selected : ''} ${menuColor}`}
                                    key={employee.id}
                                    onClick={() => handleSelectEmployee(employee)}>
                                    {employee.name}
                                    {flagged && <img className={menuStyles.flagged} src={FlaggedIcon} />}
                                </div>
                            )
                        })
                    }
                </div>
                <Modal
                    isOpen={true}
                    contentLabel="Modal"
                    onRequestClose={this.closeModal}
                    className={{
                        base: modalStyles.modal,
                    }}
                    overlayClassName={{
                        base: modalStyles.overlay,
                    }}
                >
                <button className={modalStyles.closeButton} onClick={this.handleCloseClick}>X</button>
                <div className={`${modalStyles.header} ${color}`}>
                    <h4 className={modalStyles.title}>
                        {e.name}
                        {flagged && <img src={FlaggedIcon} />}
                    </h4>
                </div>
                {latestEntry &&
                    <div className={modalStyles.message}>
                        {latestEntry.message}
                    </div>
                }
                <div className={modalStyles.content}>
                    Fiilismittari:
                    <div className={modalStyles.moods}>
                        {MoodsList.map(m => {
                            const isActive = color === m.color ? true : false;

                            return (
                                <div
                                    className={`${modalStyles.mood} ${isActive ? modalStyles.activeMood : ''}`}
                                    key={m.color}>
                                    {m.icon}
                                    <p className={m.color}>{m.text}</p>
                                </div>
                            )
                        })}
                    </div>
                    Mitkä projektit odottavat panostasi?
                    <div className={modalStyles.projects}>
                        {e.employeeProjects &&
                        e.employeeProjects.sort((a, b) => alphabeticalSort(a.name,b.name)).map(p => <button className={styles.project} key={p.id}>{p.name}</button>)}
                    </div>
                </div>
                </Modal>
            </div>
        )
    }
}

const MoodsList = [
    {
        color: 'blue',
        text: 'Ei tekemistä',
        icon: '😪',
    },
    {
        color: 'green',
        text: 'Sopiva',
        icon: '😁',
    },
        {
        color: 'yellow',
        text: 'Kiirettä',
        icon: '😕',
    },
        {
        color: 'red',
        text: 'Overload!!',
        icon: '😵',
    },
]

function getColor(e) {
    const latestEntry = e.entry.size > 0 ? e.entry.get(-1) : null;
    return latestEntry ? latestEntry.color : "empty";
}
