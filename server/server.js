const express = require('express');
const app = express();
saveTimestamp();
const routes = require('./routes');

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
  console.log(`starting server on http://localhost:${port}`);
});

function saveTimestamp() {
  const fs = require('fs');
  const filepath = `${__dirname}/../config/timestamp.json`;
  const date = JSON.stringify(String(Date.now()));
  fs.writeFileSync(filepath, date);
}
