const app = require('./app');
const { PORT = 8443 } = process.env;

app.listen(PORT, () =>
  console.log(`Listening on PORT : http://localhost:${PORT}`)
);
