const express = require('express');
const app = express();
const routes = require('./routes');

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
  console.log(`starting server on http://localhost:${port}`);
});
