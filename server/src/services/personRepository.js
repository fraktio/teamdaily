import connectDatabase from '../services/database';

const database = connectDatabase();

export async function getPeople() {
  return await database.query('SELECT * FROM employees WHERE deleted = 0 ORDER BY name ASC');
}

export async function getPerson(id) {
  const result = await database.query('SELECT * FROM employees WHERE deleted = 0 AND id = ?', id);

  return result[0];
}
