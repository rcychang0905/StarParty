
// config should be imported before importing any other file
import config from './config/config';
import app from './config/express';

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  // listen on port config.get('PORT')
  app.listen(config.get('PORT'), () => {
    console.info(`server started on port ${config.get('PORT')} (${config.get('NODE_ENV')})`); // eslint-disable-line no-console
  });
}

export default app;

