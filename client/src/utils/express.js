import http from 'http';
import express from 'express';
import webpack from 'webpack';

/* eslint no-console:0, global-require: 0 */

const ENV = (process.env.NODE_ENV || 'development').trim();
console.log('Run mode:', ENV);

export function createServer(port, webpackConfig, callback) {
  const compiler = webpack(webpackConfig);

  const httpServer = http.createServer();
  const app = express();

  httpServer.on('request', app);

  let devMiddleware;

  if (ENV === 'development') {
    devMiddleware = require('webpack-dev-middleware')(compiler, {
      noInfo: false,
      publicPath: webpackConfig.output.publicPath,
      serverSideRender: false,
      color: true,
      stats: {
        colors: true,
      },
    });

    app.use(devMiddleware);
    app.use(require('webpack-hot-middleware')(compiler));
  }

  return callback(app, httpServer, devMiddleware).then(() => {
    httpServer.listen(port, () => {
      console.log(`Listening at http://localhost:${port}`);
    });

    return {
      app,
      httpServer,
    };
  });
}
