import React, { Component } from 'react';
import { alphabeticalSort } from '../../utils/helpers';
import styles from './style.pcss';
import { Icon } from 'react-fa';

export default class EmployeeCard extends Component {
    render() {
        const { employee, entry, handleClick } = this.props;

        const lastEntry = entry ? entry.get(-1) : null;
        const color = lastEntry ? lastEntry.color : "empty";

        const projects = employee.employeeProjects;

        return (
            <div className={styles.masonryCard} onClick={() => handleClick(employee, projects)}>
                <div className={`${styles.masonryCardInner} ${color}`}>
                    <h4 className={styles.employeeTitle}>{employee.name}</h4>

                    {lastEntry && <p>{lastEntry.message}</p>}

                <div className={styles.projectsContainer}>
                    {projects &&
                    projects.sort((a, b) => alphabeticalSort(a.name,b.name)).map(p => <button className={styles.project} key={p.name}>{p.name}</button>)}
                </div>
            </div>
        );
    }
}
