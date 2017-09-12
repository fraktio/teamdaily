import React, { Component } from 'react';
import styles from './style.pcss';
import classnames from 'classnames';

import ProjectColor from './ProjectColor';
import ProjectMessage from './ProjectMessage';

export default class ProjectBox extends Component {
  render() {
    const { project, entries, saveProjectColor, saveProjectMessage } = this.props;

    return (
      <div className={classnames(styles.outerCard, project.color)}>
        <div className={classnames(styles.card)}>
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

          <hr className={styles.separator} />

          <ProjectColor color={project.color} saveProjectColor={saveProjectColor} />
          <ProjectMessage message={project.message} saveProjectMessage={saveProjectMessage} />
        </div>
      </div>
    );
  }
}
