import faker from 'faker';
import { Range } from 'immutable';
import connectDatabase from './services/database';
import dotenv from 'dotenv';

dotenv.config();
const database = connectDatabase();

kekkonizeEmployeeNamesAndLogs()
.then(kekkonizeProjectNames)
.then(() => {
  console.log("Kekkonizer has done it's job");
})

function kekkonizeProjectNames() {
  return new Promise((resolve, reject) => {
    const fakeProjects = generateFakeProjects(100);

    fakeProjects.map((project, i) => {
      const params = [project, i];

      database.query('UPDATE projects SET name = ? WHERE id = ?', params);
    });

    resolve();
  })
}

function kekkonizeEmployeeNamesAndLogs() {
  return new Promise((resolve, reject) => {
    const fakePeople = generateFakePeople(100);

    fakePeople.map((person, i) => {
      database.query('SELECT name FROM employees WHERE id = ?', [i], ((err, result) => {
        if (!result[0]) {
          return;
        }

        const oldName = result[0].name;
        const kekkonizedMessage = faker.lorem.sentence();

        database.query('UPDATE logs SET name = ?, message = ? WHERE name = ?', [person, kekkonizedMessage, oldName]);
        database.query('UPDATE employees SET name = ? WHERE id = ?', [person, i]);
      }))
    });

    resolve();
  })
}


function generateFakeProjects(amount) {
  return Range(0, amount).map(() => faker.company.companyName()).toList();
}

function generateFakePeople(amount) {
  const getName = () => {
    return faker.name.firstName() + ' ' + faker.name.lastName();
  }
  return Range(0, amount).map(() => getName()).toList();
}
