import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import styles from './style.pcss';

import ProjectBox from './ProjectBox';

export default class ProjectView extends Component {
  render() {
    const { data: { loading, projects } } = this.props;

    if (loading) {
      return null;
    }

    return (
      <div>
        <div className={styles.projectsWrapper}>
          <div className={styles.cardContainer}>
            {projects
              .filter(p => p.people.length > 0)
              .map(p => <ProjectBox key={p.id} project={p} people={p.people} />)}
          </div>

          <h4 className={styles.title}>
            <FormattedMessage
              id="projects_projectsWithout"
              defaultMessage="Projects without anyone assigned"
            />
          </h4>

          <div className={styles.cardContainer}>
            {projects
              .filter(p => p.people.length === 0)
              .map(p => <ProjectBox key={p.id} project={p} people={p.people} />)}
          </div>
        </div>
      </div>
    );
  }
}
