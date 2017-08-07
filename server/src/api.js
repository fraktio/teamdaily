import bodyParser from 'body-parser';
import cors from 'cors';
import auth from 'http-auth';
import bcrypt from 'bcrypt';
import morgan from 'morgan';
import express from 'express';
import dotenv from 'dotenv';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import schema from './graphql/schema';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type', 'Credentials'],
  }),
);
app.set('json spaces', 2);
app.use(bodyParser.json());

registerLogging(app);
registerHealthCheckMiddleware(app);
registerSecureOnlyMiddleware(app);
registerTrustProxy(app);
registerAuthMiddleware(app);

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(process.env.PORT, process.env.HOST, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Listening at http://localhost:${process.env.PORT}:${process.env.HOST}`);
});

function registerLogging(app) {
  app.use(
    morgan('combined', {
      skip: (req, res) => {
        if (req.url === '/healthz') {
          return res.statusCode === 200;
        }

        return false;
      },
    }),
  );
}

function registerHealthCheckMiddleware(app) {
  app.use((req, res, next) => {
    if (req.url === '/healthz') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('okay');
    } else {
      next();
    }
  });
}

function registerAuthMiddleware(app) {
  const authEnabled = !!process.env.AUTH_ENABLED;

  console.log('auth enabled', authEnabled);

  if (authEnabled) {
    let basicAuth = auth.basic(
      {
        realm: 'TeamDaily',
      },
      (username, password, callback) => {
        bcrypt.compare(password, process.env.AUTH_PASSWORD, (err, res) => {
          callback(res && username == process.env.AUTH_USERNAME);
        });
      },
    );

    const basicAuthMiddleWare = auth.connect(basicAuth);

    app.use((req, res, next) => {
      const whitelist = process.env.AUTH_WHITELIST.split(',').map(w => w.trim());

      if (whitelist.includes(req.ip)) {
        next();
      } else {
        basicAuthMiddleWare(req, res, next);
      }
    });
  }
}

function registerSecureOnlyMiddleware(app) {
  const secureOnly = !!process.env.SECURE_ONLY;
  if (secureOnly) {
    app.use((req, res, next) => {
      if (req.secure) {
        next();
      } else {
        res.writeHead(301, { Location: 'https://' + req.headers['host'] + req.url });
        res.end();
      }
    });
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
