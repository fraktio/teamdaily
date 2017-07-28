import React, { Component } from 'react';
import styles from './style.pcss';

export default class ProjectBox extends Component {
  render() {
    const { project, people } = this.props;

    return (
      <div className={styles.card}>
        <h4 className={styles.projectTitle}>
          {project.name}
        </h4>

        {people.map(person => {
          const latestEntry = person.entries.length > 0 ? person.entries[0] : null;
          const color = latestEntry ? latestEntry.color : 'empty';

          return (
            <span key={`${project.id}-${person.id}`} className={`${styles.employee} ${color}`}>
              {person.name}
            </span>
          );
        })}
      </div>
    );
  }
}
