const Koa = require('koa');
const logger = require('logger');
const koaLogger = require('koa-logger');
const config = require('config');
const loader = require('loader');
const { koaBody } = require('koa-body');
const ErrorSerializer = require('serializers/error.serializer');
require('dotenv').config();

async function init() {
  return new Promise((resolve) => {
    const app = new Koa();

    app.use(koaBody({
      multipart: true,
      jsonLimit: '50mb',
      formLimit: '50mb',
      textLimit: '50mb'
    }));

    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (inErr) {
        let error = inErr;
        try {
          error = JSON.parse(inErr);
        } catch (e) {
          logger.debug('Could not parse error message - is it JSON?: ', inErr);
          error = inErr;
        }
        ctx.status = error.status || ctx.status || 500;
        if (ctx.status >= 500) {
          logger.error(error);
        } else {
          logger.info(error);
        }

        ctx.body = ErrorSerializer.serializeError(ctx.status, error.message);
        if (process.env.NODE_ENV === 'prod' && ctx.status === 500) {
          ctx.body = 'Unexpected error';
        }
        ctx.response.type = 'application/vnd.api+json';
      }
    });

    app.use(koaLogger());

    loader.loadRoutes(app);

    const port = config.get('service.port');
    const server = app.listen(port);

    logger.info('Server started in ', port);
    resolve({ app, server });
  });
}

module.exports = init;
