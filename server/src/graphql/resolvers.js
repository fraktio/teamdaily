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

  Mutation: {
    async addProject(root, { name }) {
      const insertResult = await database.query('INSERT INTO projects SET ?', { name });

      const result = await database.query(
        'SELECT id, name FROM projects WHERE id = ?',
        insertResult.insertId,
      );

      return result[0];
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

      const result = await database.query(
        'SELECT id, name FROM employees WHERE id = ?',
        insertResult.insertId,
      );

      return result[0];
    },

    async deletePerson(root, { id }) {
      const result = await database.query(
        'UPDATE employees SET deleted = ? WHERE id = ? AND deleted = 0',
        [1, id],
      );

      return result.affectedRows;
    },

    async addEntry(root, { year, week, name, message, color, flagged }) {
      const result = await database.query(
        `
          INSERT INTO logs (year, week, name, message, color, flagged)
          VALUES (?, ?, ?, ?, ?, ?)
        `,
        [year, week, name, message, color, flagged],
      );

      return result.affectedRows;
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
