import 'module-alias/register';
import app from './app';
import * as config from './config/index';
import logger from './logger';

const { port } = config.express;

app.listen(port, () =>
  logger.info(`
  ################################################
            Listening on port ${port}
  ################################################`),
);
