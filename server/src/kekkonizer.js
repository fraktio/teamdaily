import faker from 'faker';
import { Range } from 'immutable';
import connectDatabase from './services/database';
import dotenv from 'dotenv';
dotenv.config();

const database = connectDatabase();

async function kekkonize() {
  console.log('Will elect Kekkonen...');
  await kekkonizeEmployeeNamesAndLogs();
  await kekkonizeProjectNames();
  await kekkonizeLogs();
  console.log("Kekkonen has done it's job");
  return true;
}

async function kekkonizeProjectNames() {
  const fakeProjects = generateFakeProjects(100);
  await Promise.all(
    fakeProjects
      .map((project, i) =>
        database.query('UPDATE projects SET name = ? WHERE id = ?', [project, i]),
      )
      .toJS(),
  );
  console.log(' * Kekkonized project names');
}

async function kekkonizeLogs() {
  console.log(' * Kekkonizing logs');
  const range = Range(0, 10000).map(() => faker.lorem.sentence()).toList().toJS();

  try {
    await Promise.all(
      range.map(
        async (k, i) => await database.query('UPDATE logs SET message = ? WHERE id = ?', [k, i]),
      ),
    );
    console.log(' * Kekkonized logs');
  } catch (e) {
    console.log(e);
    throw e;
  }
  return true;
}

async function kekkonizeEmployeeNamesAndLogs() {
  const fakePeople = generateFakePeople(100);
  await Promise.all(
    fakePeople.map(async (person, i) => {
      const result = await database.query('SELECT name FROM employees WHERE id = ?', [i]);
      if (result.length === 0) {
        return true;
      }
      const oldName = result[0].name;
      console.log(' * kekkonizing', oldName);
      await database.query('UPDATE logs SET name = ? WHERE name = ?', [person, oldName]);
      await database.query('UPDATE employees SET name = ? WHERE id = ?', [person, i]);
      return true;
    }),
  );

  return true;
}

function generateFakeProjects(amount) {
  return Range(0, amount).map(() => faker.company.companyName()).toList();
}

function generateFakePeople(amount) {
  const getName = () => {
    return faker.name.firstName() + ' ' + faker.name.lastName();
  };
  return Range(0, amount).map(() => getName()).toList();
}

kekkonize()
  .then(async () => {
    await database.end();
    console.log('Kekkonen is dead! Long live Kekkonen!');
  })
  .catch(e => {
    console.log('Fatal Error in electing Kekkonen :(', e);
  });
