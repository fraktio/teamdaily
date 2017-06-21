import mysql from 'mysql';

// Create a pool of database connections
export default () => mysql.createPool({
  connectionLimit: 3,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
