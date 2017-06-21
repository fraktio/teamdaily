import path from 'path';
import { createServer } from './utils/express';
import webpackConfig from '../webpack.config.babel';

createServer(process.argv.pop(), webpackConfig, (app, httpServer, devMiddleware) => {

  app.get('*', (req, res) => {
    const index = devMiddleware.fileSystem.readFileSync(
      path.join(webpackConfig.output.path, 'index.html'),
    );
    res.end(index);
  });

  return Promise.resolve();
});
