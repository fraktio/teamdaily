import React, { Component } from 'react';
import { alphabeticalSort } from '../../utils/helpers';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import Masonry from 'react-masonry-component';

import styles from './style.pcss';

import ProjectBox from './ProjectBox';

export default class ProjectView extends Component {
  render() {
    const { employees, projects, entries, date, setProjectColor, setProjectMessage } = this.props;

    const projectsWithEmployeesFirst = projects
      .sort((a, b) => alphabeticalSort(a.name, b.name))
      .map(p => {
        p.employees = employees.filter(e => e.projects).filter(e => e.projects.includes(p.id));
        return p;
      });

    const masonryOptions = {
      transitionDuration: 0,
    };

    return (
      <div>
        <div className={styles.projectsWrapper}>
          <Masonry options={masonryOptions}>
            {projectsWithEmployeesFirst.map(p => {
              if (p.employees.size > 0) {
                return (
                  <ProjectBox
                    key={p.id}
                    project={p}
                    entries={entries}
                    saveProjectColor={status => setProjectColor(p, status)}
                    saveProjectMessage={desc => setProjectMessage(p, desc)}
                  />
                );
              }
            })};
          </Masonry>

          <h4 className={styles.title}>
            <FormattedMessage
              id="projects_projectsWithout"
              defaultMessage="Projects without anyone assigned"
            />
          </h4>

          <Masonry options={masonryOptions}>
            {projectsWithEmployeesFirst.map(p => {
              if (p.employees.size < 1) {
                return (
                  <ProjectBox
                    key={p.id}
                    project={p}
                    entries={entries}
                    saveProjectColor={status => setProjectColor(p, status)}
                    saveProjectMessage={desc => setProjectMessage(p, desc)}
                  />
                );
              }
            })};
          </Masonry>
        </div>
      </div>
    );
  }
}
