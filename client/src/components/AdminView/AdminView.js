import React, { Component } from 'react';
import Button from 'components/Button';
import Masonry from 'react-masonry-component';
import { FormattedMessage, injectIntl } from 'react-intl';

import { alphabeticalSort } from '../../utils/helpers';
import styles from './style.pcss';

class AdminView extends Component {
  render() {
    const { projects, employees, intl } = this.props;

    const masonryOptions = {
      transitionDuration: 0
    };

    return (
      <div className={styles.container}>
        <div className={styles.formsContainer}>
          <form onSubmit={(e) => this.addEmployee(e)} className={styles.form}>
            <input placeholder={intl.messages.admin_addEmployee} type="text" ref={(input) => this.employeeName = input} />
            <Button type="submit">
              <FormattedMessage 
                  id='admin_addEmployee'
                  defaultMessage='Add Person'
              />
            </Button>
          </form>

          <form onSubmit={(e) => this.addProject(e)} className={styles.form}>
            <input placeholder={intl.messages.admin_addProject} type="text" ref={(input) => this.projectName = input} />
            <Button type="submit">
              <FormattedMessage 
                  id='admin_addProject'
                  defaultMessage='Add Project'
              />
            </Button>
          </form>
        </div>

        <hr />
        <p>
          <FormattedMessage 
              id='admin_projects'
              defaultMessage='Projects'
          />
        </p>
        <Masonry options={masonryOptions}>
          {projects.sort((a, b) => alphabeticalSort(a.name,b.name)).map(project => (
            <div key={project.id} className={styles.project}>
              <div>{project.name}</div>
  
              <button className={styles.deleteButton} onClick={() => this.deleteProject(project.id)}>
                <FormattedMessage 
                    id='admin_delete'
                    defaultMessage='Delete'
                />
              </button>
            </div>
          ))}
        </Masonry>

        <hr />
        <p>
          <FormattedMessage 
              id='admin_employees'
              defaultMessage='Employees'
          />
        </p>
        <Masonry options={masonryOptions}>
          {employees.sort((a, b) => alphabeticalSort(a.name,b.name)).map(employee => (
            <div key={employee.id} className={styles.project}>
              <div>{employee.name}</div>
  
              <button className={styles.deleteButton} onClick={() => this.deleteEmployee(employee.id)}>
                <FormattedMessage 
                    id='admin_delete'
                    defaultMessage='Delete'
                />
              </button>
            </div>
          ))}
        </Masonry>
      </div>
    );
  }

  addProject = (e) => {
    const { projectActions } = this.props;

    e.preventDefault();

    projectActions.addProject(this.projectName.value)
    .then(() => this.projectName.value = '');
  }

  addEmployee = (e) => {
    const { employeeActions } = this.props;

    e.preventDefault();

    employeeActions.addEmployee(this.employeeName.value)
    .then(() => this.employeeName.value = '');
  }

  deleteProject = (id) => {
    const { projectActions } = this.props;

    projectActions.deleteProject(id);
  }
  
  deleteEmployee = (id) => {
    const { employeeActions } = this.props;

    employeeActions.deleteEmployee(id);
  }
};

export default injectIntl(AdminView);