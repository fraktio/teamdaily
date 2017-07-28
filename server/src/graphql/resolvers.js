import connectDatabase from '../services/database';

const database = connectDatabase();

const resolvers = {
  Query: {
    people(root, args) {
      return database.query(
        `
          SELECT id, name FROM employees
          WHERE deleted = 0
          ORDER BY name ASC
        `,
      );
    },

    async person(root, args) {
      const r = await database.query(
        `
          SELECT id, name FROM employees
          WHERE name = ? AND deleted = 0
          ORDER BY name ASC
        `,
        args.name,
      );

      return r[0];
    },

    projects(root, args) {
      return database.query(
        `
          SELECT id, name FROM projects
          WHERE deleted = 0
          ORDER BY name ASC
        `,
      );
    },

    async project(root, args) {
      const r = await database.query(
        `
          SELECT id, name FROM projects
          WHERE name = ? AND deleted = 0
          ORDER BY name ASC
        `,
        args.name,
      );

      return r[0];
    },

    entries(root, { year, week }) {
      return database.query(
        `
          SELECT id, year, week, name, message, status, created, color, flagged
          FROM logs
          WHERE year = ? AND week = ?
          ORDER BY created DESC
        `,
        [year, week],
      );
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
    entries(person, { year, week }) {
      return database.query(
        `
          SELECT id, year, week, name, message, status, created, color, flagged
          FROM logs
          WHERE year = ? AND week = ? AND name = ?
          ORDER BY created DESC
        `,
        [year, week, person.name],
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
