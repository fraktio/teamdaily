import connectDatabase from '../services/database';

const database = connectDatabase();

export async function getProjects() {
  return await database.query('SELECT * FROM projects WHERE deleted = 0 ORDER BY name ASC');
}

export async function getProject(id) {
  const result = await database.query('SELECT * FROM projects WHERE deleted = 0 AND id = ?', id);

  return result[0];
}
