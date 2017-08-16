import connectDatabase from '../services/database';
import { getPeople, getPerson } from '../services/personRepository';
import { getProjects, getProject } from '../services/projectRepository';

const database = connectDatabase();

const resolvers = {
  Query: {
    people(root, args) {
      return getPeople();
    },

    projects(root, args) {
      return getProjects();
    },

    entries(root, { startYear, startWeek, endYear, endWeek }) {
      return database.query(
        `
          SELECT id, year, week, name, message, created, color, flagged
          FROM logs
          WHERE year <= ? AND week <= ? AND year >= ? AND week >= ?
          ORDER BY created DESC
        `,
        [startYear, startWeek, endYear, endWeek],
      );
    },
  },

  Mutation: {
    async addProject(root, { name }) {
      const insertResult = await database.query('INSERT INTO projects SET ?', { name });

      return getProject(insertResult.insertId);
    },

    async deleteProject(root, { id }) {
      const result = await database.query(
        'UPDATE projects SET deleted = ? WHERE id = ? AND deleted = 0',
        [1, id],
      );

      return result.affectedRows;
    },

    async addPerson(root, { name }) {
      const insertResult = await database.query('INSERT INTO employees SET ?', { name });

      return getPerson(insertResult.insertId);
    },

    async deletePerson(root, { id }) {
      const result = await database.query(
        'UPDATE employees SET deleted = ? WHERE id = ? AND deleted = 0',
        [1, id],
      );

      return result.affectedRows;
    },

    async addEntry(root, { year, week, name, message, color, flagged }) {
      const insertResult = await database.query(
        `
          INSERT INTO logs (year, week, name, message, color, flagged)
          VALUES (?, ?, ?, ?, ?, ?)
        `,
        [year, week, name, message, color, flagged],
      );

      const result = await database.query(
        `
          SELECT id, year, week, name, message, created, color, flagged
          FROM logs WHERE id = ?
        `,
        insertResult.insertId,
      );

      return result[0];
    },

    async addPersonToProject(root, { personId, projectId }) {
      const result = await database.query(
        `
          INSERT INTO employee_projects (employee_id, project_id)
          VALUES (?, ?)
        `,
        [personId, projectId],
      );

      const person = getPerson(personId);
      const project = getProject(projectId);

      return {
        person,
        project,
      };
    },

    async removePersonFromProject(root, { personId, projectId }) {
      const result = await database.query(
        'DELETE FROM employee_projects WHERE employee_id = ? AND project_id = ?',
        [personId, projectId],
      );

      const person = getPerson(personId);
      const project = getProject(projectId);

      return {
        person,
        project,
      };
    },
  },

  Person: {
    projects(person) {
      return database.query(
        `
          SELECT p.id, p.name FROM projects p INNER JOIN employee_projects ep
          ON p.id = ep.project_id
          WHERE ep.employee_id = ? AND p.deleted = 0
          ORDER BY p.name ASC
        `,
        person.id,
      );
    },
    entries(person, { startYear, startWeek, endYear, endWeek }) {
      return database.query(
        `
          SELECT id, year, week, name, message, created, color, flagged
          FROM logs
          WHERE year <= ? AND week <= ? AND year >= ? AND week >= ? AND name = ?
          ORDER BY created DESC
        `,
        [startYear, startWeek, endYear, endWeek, person.name],
      );
    },
  },

  Project: {
    people(project) {
      return database.query(
        `
          SELECT e.id, e.name FROM employees e INNER JOIN employee_projects ep
          ON e.id = ep.employee_id WHERE ep.project_id = ? AND e.deleted = 0
          ORDER BY e.name ASC
        `,
        project.id,
      );
    },
  },
};

export default resolvers;
