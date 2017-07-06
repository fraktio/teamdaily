import React, { Component } from 'react';
import { alphabeticalSort, getLatestEntry, getEntryColor, doesFlaggedExist } from '../../utils/helpers';
import styles from './style.pcss';
import { Icon } from 'react-fa';

import FlaggedIcon from 'assets/flagged.svg';

export default class EmployeeCard extends Component {
    render() {
        const { employee, entry, handleClick } = this.props;

        const latestEntry = getLatestEntry(entry);
        const color = getEntryColor(latestEntry);
        const flagged = doesFlaggedExist(latestEntry);
        const projects = employee.employeeProjects;

        return (
            <div className={styles.masonryCard} onClick={() => handleClick(employee, projects)}>
                <div className={`${styles.masonryCardInner} ${color}`}>
                    <h4 className={styles.employeeTitle}>{employee.name}</h4>

                    {flagged && <img className={styles.flagged} src={FlaggedIcon} />}
                    {latestEntry && <p>{latestEntry.message}</p>}

                    <div className={styles.projectsContainer}>
                        {projects &&
                        projects.sort((a, b) => alphabeticalSort(a.name,b.name)).map(p => <button className={styles.project} key={p.name}>{p.name}</button>)}
                    </div>
                </div>
            </div>
        );
    }
}
