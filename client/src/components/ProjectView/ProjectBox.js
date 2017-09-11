import React, { Component } from 'react';
import styles from './style.pcss';

import ProjectStatus from './ProjectStatus';
import ProjectDescription from './ProjectDescription';

export default class ProjectBox extends Component {
  render() {
    const { project, entries, saveStatus, saveDescription } = this.props;
    console.log(project);
    return (
      <div className={styles.card}>
        <h4 className={styles.projectTitle}>
          {project.name}
        </h4>
        {project.employees.map(e => {
          const entry = entries.filter(entry => entry.name === e.name);
          const latestEntry = entry ? entry.get(-1) : null;
          const color = latestEntry ? latestEntry.color : 'empty';

          return (
            <span key={`${project.id}-${e.name}`} className={`${styles.employee} ${color}`}>
              {e.name}
            </span>
          );
        })}

        <ProjectStatus status={project.status} saveStatus={saveStatus} />
        <ProjectDescription description={project.description} saveDescription={saveDescription} />
      </div>
    );
  }
}
