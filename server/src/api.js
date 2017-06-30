import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDatabase from './services/database';
import moment from 'moment';
import auth from 'http-auth';
import bcrypt from 'bcrypt';
import morgan from 'morgan';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const database = connectDatabase();

function getNumberOfWeeksForYear(year) {
  return moment(year, 'YYYY').weeksInYear();
}

const now = moment();
const currentWeek = now.format('WW');
const weekAmount = 25;

const app = express();
app.use(cors({
  origin: true,
  credentials: true,
  allowedHeaders: ['Authorization', 'Content-Type', 'Credentials']
}));
app.set('json spaces', 2);
app.use(bodyParser.json());

registerLogging(app);
registerHealthCheckMiddleware(app);
registerSecureOnlyMiddleware(app);
registerTrustProxy(app);
registerAuthMiddleware(app);

function asyncWrap(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

app.get('/api/message/latest', asyncWrap(async (req, res) => {
  const year = parseInt(now.format('YYYY'));
  const startingFromWeek = (currentWeek - weekAmount);

  if (startingFromWeek < 0) {
    const previousYear = year - 1;
    const numberOfWeeksLastYear = getNumberOfWeeksForYear(previousYear);

    const params = [
      previousYear,
      (numberOfWeeksLastYear + startingFromWeek), // startingFromWeek is a negative number
      year,
      startingFromWeek
    ];

    const result = await database.query('SELECT * FROM logs WHERE (year = ? AND week >= ?) OR (year = ? AND week >= ?)', params);
    res.json(result);

  } else {
    const result = await database.query('SELECT * FROM logs WHERE year = ? AND week >= ?', [ year, startingFromWeek ]);
    res.json(result);
  }
}));

app.get('/api/message/:year/:week', asyncWrap(async (req, res) => {
  const year = req.params.year;
  const week = req.params.week;
  const queryData = [year, week];

  const result = await database.query('SELECT * FROM logs WHERE year = ? AND week = ?', queryData);
  res.json(result);
}));

app.post('/api/message/:year/:week', asyncWrap(async (req, res) => {
  const logData = {
    year: req.params.year,
    week: req.params.week,
    name: req.body.name,
    message: req.body.message,
    color: req.body.color,
    flagged: req.body.flagged,
  };

  const result = await database.query('INSERT INTO logs SET ?', logData);
  res.json(result);
}));


app.get('/api/employee', asyncWrap(async (req, res) => {
  const result = await database.query('SELECT e.*, ep.project_id FROM employees e LEFT JOIN employee_projects ep ON (e.id = ep.employee_id) WHERE e.deleted != ?', 1);
  let results = [];
  for(const key in result){
    if(typeof(results[result[key]['id']]) == 'undefined') {
      results[result[key]['id']] = {
        'id': result[key]['id'],
        'name': result[key]['name']
      };
    }
    if(result[key]['project_id']) {
      if(typeof(results[result[key]['id']]['projects']) != 'undefined') {
        results[result[key]['id']]['projects'].push(result[key]['project_id']);
      } else {
        results[result[key]['id']]['projects'] = [result[key]['project_id']];
      }
    }
  }
  res.json(results.filter(Boolean));
}));

app.post('/api/employee', asyncWrap(async (req, res) => {
  const { employee } = req.body;

  if (!employee || !employee.length) {
    res.json({ error: 'Invalidos employeeros!' });
  }

  try {
    database.query('INSERT INTO employees SET ?', { name: employee });
    res.json({ error: null });
  } catch (err) {
    console.error('POST REQUEST: /api/employee', employee, err);
    res.json({ error: `Cannot insert ${employee} in to database.` });
  }
}));

app.post('/api/deleteemployee', asyncWrap(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    res.json({ error: 'Invalidos ids los employeeros!' });
  }

  try {
    await database.query('UPDATE employees SET deleted = 1 WHERE id = ?', id);
    res.json({error: null});
  } catch (err) {
    console.error('POST REQUEST: /api/deleteemployee', id, err);
    res.json({ error: `Cannot delete employee ${id}.` });
  }
}));

app.get('/api/project', asyncWrap(async (req, res) => {
  const result = await database.query('SELECT * FROM projects WHERE deleted != ?', 1);
  res.json(result);
}));

app.post('/api/project', asyncWrap(async (req, res) => {
  const { project } = req.body;
  if (!project || !project.length) {
    res.json({ error: 'Invalidos projecteros!' });
    return;
  }
  const result = await database.query('INSERT INTO projects SET ?', { name: project });
  res.json({ error: null });
}));

app.post('/api/project', asyncWrap(async (req, res) => {
  const { project } = req.body;
  if (!project || !project.length) {
    res.json({ error: 'Invalidos projecteros!' });
    return;
  }
  const result = await database.query('INSERT INTO projects SET ?', { name: project });
  res.json({ error: null });
}));

app.post('/api/deleteproject', asyncWrap(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    res.json({ error: 'Invalidos ids los projecteros!' });
  }

  try {
    await database.query('UPDATE projects SET deleted = 1 WHERE id = ?', id);
    res.json({ error: null });
  } catch (err) {
    console.error('POST REQUEST: /api/deleteproject', id, err);
    res.json({ error: `Cannot delete project ${id}.` });
  }
}));

app.get('/api/employeeprojects', asyncWrap(async (req, res) => {
  const result = await database.query('SELECT * FROM employee_projects');
  res.json(result);
}));

app.post('/api/saveemployeeproject', asyncWrap(async (req, res) => {
  const queryArray = [req.body.employeeId, req.body.projectId];

  if(req.body.newProjectState) {
    const result = await database.query('INSERT INTO employee_projects (employee_id, project_id) VALUES ?', [[queryArray]]);
    res.json(result);
  } else {
    const result = await database.query('DELETE FROM employee_projects WHERE employee_id = ? AND project_id = ?', queryArray);
    res.json(result);
  }
}));

app.listen(process.env.PORT, process.env.HOST, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Listening at http://localhost:${process.env.PORT}:${process.env.HOST}`);
});

function registerLogging(app) {
  app.use(morgan('combined', {
    skip: (req, res) => {
      if (req.url === '/healthz') {
          return res.statusCode === 200;
      }

      return false;
    }
  }));
}

function registerHealthCheckMiddleware(app) {
  app.use((req, res, next) => {
    if (req.url === '/healthz') {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('okay');
    } else {
      next();
    }
  })
}

function registerAuthMiddleware(app) {

  const authEnabled = !!process.env.AUTH_ENABLED;

  console.log('auth enabled', authEnabled);

  if (authEnabled) {
    let basicAuth = auth.basic({
      realm: 'TeamDaily'
    }, (username, password, callback) => {
      bcrypt.compare(password, process.env.AUTH_PASSWORD, (err, res) => {
        callback(res && username == process.env.AUTH_USERNAME);
      })
    });

    const basicAuthMiddleWare = auth.connect(basicAuth);

    app.use((req, res, next) => {
      const whitelist = process.env.AUTH_WHITELIST.split(',').map(w => w.trim());

      if (whitelist.includes(req.ip)) {
        next();
      } else {
        basicAuthMiddleWare(req, res, next);
      }
    })
  }
}

function registerSecureOnlyMiddleware(app) {
  const secureOnly = !!process.env.SECURE_ONLY;
  if (secureOnly) {
    app.use((req, res, next) => {
      if (req.secure) {
        next();
      } else {
        res.writeHead(301, {"Location": "https://" + req.headers['host'] + req.url});
        res.end();
      }
    })
  }
}

function registerTrustProxy(app) {
  const isTrustProxySet = !!process.env.TRUST_PROXY;

  if (!isTrustProxySet) {
    return;
  }

  app.enable('trust proxy');
  if (process.env.TRUST_PROXY === 'true') {
    app.set('trust proxy', true);
  } else {
    app.set('trust proxy', process.env.TRUST_PROXY);
  }
}
