const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

try {
  connection.connect();
} catch (e) {
  console.log(`Database Connection failed: ${e}`); // eslint-disable-line no-console
}

module.exports = connection;
