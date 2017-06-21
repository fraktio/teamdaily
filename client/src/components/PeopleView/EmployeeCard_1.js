import React, { Component } from 'react';
import styles from './style';
import { Icon } from 'react-fa';

export default class EmployeeCard extends Component {
    render() {
        const { employee, entry, handleClick } = this.props;

        const lastEntry = entry ? entry.get(-1) : null;
        const color = lastEntry ? lastEntry.color : "empty";

        const projects = employee.employeeProjects;

        return (
            <div className={`${styles.card} ${color}`} onClick={() => handleClick(employee, projects)}>
                <h4 className={styles.employeeTitle}>{employee.name}</h4>

                {lastEntry && lastEntry.flagged &&
                <Icon className={styles.flaggedIcon} name="commenting-o" size={'2x'} />}

                {lastEntry && <p>{lastEntry.message}</p>}

                <div className={styles.projectsContainer}>
                    {projects &&
                    projects.map(p => <button className={styles.project} key={p.name}>{p.name}</button>)}
                </div>
            </div>
        );
    }
}
