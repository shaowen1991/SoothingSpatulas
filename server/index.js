'use strict';
const app = require('./app');
const channel = require('./channel');
const db = require('../db');
const PORT = process.env.port || 3000;

app.listen(PORT, () => {
  console.log('Momento server listening on port 3000!');
});
