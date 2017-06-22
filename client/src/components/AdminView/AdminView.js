import React, { Component } from 'react';
import Button from 'components/Button';
import { alphabeticalSort } from '../../utils/helpers';
import styles from './style.pcss';

export default class AdminView extends Component {
  render() {
    const { projects, employees } = this.props;

    return (
      <div className={styles.container}>
        <h2>Uuden projektin lisääminen</h2>
        <form onSubmit={(e) => this.addProject(e)}>
          <label for="projectName">Nimi:</label>
          <input id="projectName" type="text" ref={(input) => this.projectName = input} />
          <Button type="submit">Lisää</Button>
        </form>
        <h2>Uuden käyttäjän lisääminen</h2>
        <form onSubmit={(e) => this.addEmployee(e)}>
          <label for="employeeName">Nimi:</label>
          <input id="employeeName" type="text" ref={(input) => this.employeeName = input} />
          <Button type="submit">Lisää</Button>
        </form>
        <h2>Olemassa olevat projektit</h2>
        <div>
          {projects.sort((a, b) => alphabeticalSort(a.name,b.name)).map(project => (
            <div key={project.id} className={styles.itemWrapper}>
              <div className={styles.itemInner}>
                <div>{project.name}</div>
                <Button onClick={() => this.deleteProject(project.id)}>Poista</Button>
              </div>
            </div>
          ))}
        </div>
        <h2>Olemassa olevat projektit</h2>
        <div>
          {employees.sort((a, b) => alphabeticalSort(a.name,b.name)).map(employee => (
            <div key={employee.id} className={styles.itemWrapper}>
              <div className={styles.itemInner}>
                <div>{employee.name}</div>
                <Button onClick={() => this.deleteEmployee(employee.id)}>Poista</Button>
              </div>
            </div>
          ))}
        </div>
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