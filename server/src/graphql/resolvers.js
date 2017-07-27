import connectDatabase from '../services/database';

const database = connectDatabase();

const resolvers = {
  Query: {
    people(root, args) {
      return database.query('SELECT id, name FROM employees WHERE deleted = 0');
    },

    async person(root, args) {
      const r = await database.query(
        'SELECT id, name FROM employees WHERE name = ? AND deleted = 0',
        args.name
      );

      return r[0];
    },

    projects(root, args) {
      return database.query('SELECT id, name FROM projects WHERE deleted = 0');
    },

    async project(root, args) {
      const r = await database.query(
        'SELECT id, name FROM projects WHERE name = ? AND deleted = 0',
        args.name
      );

      return r[0];
    },
  },

  Person: {
    projects(author) {
      return database.query(
        `
          SELECT p.id, p.name FROM projects p INNER JOIN employee_projects ep
          ON p.id = ep.project_id WHERE ep.employee_id = ?
        `,
        author.id
      );
    },
  },
};

export default resolvers;
