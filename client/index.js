if (typeof(PhusionPassenger) != 'undefined') {
    PhusionPassenger.configure({ autoInstall: false });
}

const express = require('express');
const next = require('next');
const logger = require('pino-http')()

const port = parseInt(process.env.PORT, 10) || 3000;
const isDev = process.env.NODE_ENV !== 'production';

const app = next({ dev: isDev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(express.json());
  server.use(logger);

  server.all('*', (req, res) => handle(req, res));
  if (typeof (PhusionPassenger) != 'undefined') {
    server.listen('passenger');
    console.log(`> Ready on passenger`);
  } else {
    server.listen(3000);
    console.log(`> Ready on http://localhost:${port}`);
  }
});
