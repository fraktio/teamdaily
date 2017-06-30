import React, { Component } from 'react';
import Button from 'components/Button';
import Masonry from 'react-masonry-component';

import { alphabeticalSort } from '../../utils/helpers';
import styles from './style.pcss';

export default class AdminView extends Component {
  render() {
    const { projects, employees } = this.props;

    const masonryOptions = {
      transitionDuration: 0
    };

    return (
      <div className={styles.container}>
        <div className={styles.formsContainer}>
          <form onSubmit={(e) => this.addEmployee(e)} className={styles.form}>
            <input placeholder="Lisää ihminen" type="text" ref={(input) => this.employeeName = input} />
            <Button type="submit">Lisää ihminen</Button>
          </form>

          <form onSubmit={(e) => this.addProject(e)} className={styles.form}>
            <input placeholder="Lisää projekti" type="text" ref={(input) => this.projectName = input} />
            <Button type="submit">Lisää projekti</Button>
          </form>
        </div>

        <hr />
        <p>Projektit</p>
        <Masonry options={masonryOptions}>
          {projects.sort((a, b) => alphabeticalSort(a.name,b.name)).map(project => (
            <div key={project.id} className={styles.project}>
              <div>{project.name}</div>
  
              <button className={styles.deleteButton} onClick={() => this.deleteProject(project.id)}>Poista</button>
            </div>
          ))}
        </Masonry>

        <hr />
        <p>Ihmiset</p>
        <Masonry options={masonryOptions}>
          {employees.sort((a, b) => alphabeticalSort(a.name,b.name)).map(employee => (
            <div key={employee.id} className={styles.project}>
              <div>{employee.name}</div>
  
              <button className={styles.deleteButton} onClick={() => this.deleteEmployee(employee.id)}>Poista</button>
            </div>
          ))}
        </Masonry>
      </div>
    );
  }

  addProject = (e) => {
    const { projectActions } = this.props;

    e.preventDefault();

    projectActions.addProject(this.projectName.value);
  }

  addEmployee = (e) => {
    const { employeeActions } = this.props;

    e.preventDefault();

    employeeActions.addEmployee(this.employeeName.value);
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