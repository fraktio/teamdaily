import React from 'react';
import { alphabeticalSort } from '../utils/helpers';
import { Link } from 'react-router-dom';
import Header from './Header';
import EmployeeName from './EmployeeName';

export default ({ employees, projects, employeeProjects }) => {
  const projectsOnHold = [];

  return (
    <div>
      <Header />
      <div className="matrix-data-container">
        <Link to="/index" className="btn btn-info btn-back">
          Takaisin etusivulle
        </Link>
        <h1 className="matrix">Projektit</h1>

        <table className="table">
          <thead>
            <tr>
              <th>Projekti</th>
              {projects.sort((a, b) => alphabeticalSort(a.name, b.name)).map(project => {
                const employees = employeeProjects.filter(ep => ep.project_id == project.id);

                if (employees.size === 0) {
                  projectsOnHold.push(project.name);
                }

                return (
                  <th key={project.id} className="fixed-width wide clickable">
                    {project.name}
                    <span className="counter-ball">
                      {employees.size}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {employees.map(employee =>
              <tr key={employee.name + '-row'}>
                <td>
                  <EmployeeName name={employee.name} />{' '}
                  <span className="counter-ball">
                    {employee.projects && employee.projects.length ? employee.projects.length : ''}
                  </span>
                </td>
                {projects.sort((a, b) => alphabeticalSort(a.name, b.name)).map(project => {
                  const employeeProject = employeeProjects
                    .sort((a, b) => alphabeticalSort(a.name, b.name))
                    .filter(ep => ep.employee_id == employee.id && ep.project_id == project.id)
                    .size;

                  return (
                    <td
                      className={employeeProject ? 'green' : ''}
                      key={employee.name + '-' + project.id + '-cell'}
                    >
                      {' '}
                    </td>
                  );
                })}
              </tr>,
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
