import mysql from 'promise-mysql';

let pool;

export default () => {
  if (!pool) {
    // Create a pool of database connections
    pool = mysql.createPool({
      connectionLimit: 10,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }

  return pool;
};
