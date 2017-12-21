
import extend from 'lodash/assign';
import mysql from 'mysql';
import config from '../../config/config';

const options = {
  user: config.get('MYSQL_USER'),
  password: config.get('MYSQL_PASSWORD'),
  database: 'starparty'
};

if (config.get('INSTANCE_CONNECTION_NAME') && config.get('NODE_ENV') === 'production') {
  options.socketPath = `/cloudsql/${config.get('INSTANCE_CONNECTION_NAME')}`;
}

const connection = mysql.createConnection(options);

module.exports = {
  createSchema,
  list,
  add,
  read
};

function list(cb) {
  connection.query('SELECT * FROM events', (err, results) => {
    if (err) throw err;
    cb(err, results);
  });
}

function add(data, cb) {
  connection.query('INSERT INTO events SET ?', data, (err, res) => {
    if (err) {
      cb(err);
      return;
    }
    console.log('Inserted successfully');
    read(res.insertId, cb);
  });
}

function read(id, cb) {
  connection.query(
    'SELECT * FROM events WHERE `id` = ?', id, (err, results) => {
      if (!err && !results.length) {
        err = {
          code: 404,
          message: 'Not found'
        };
      }
      if (err) {
        cb(err);
        return;
      }
      cb(null, results[0]);
    });
}

function createSchema() {
  const schemaConnection = mysql.createConnection(extend({
    multipleStatements: true
  }, options));

  schemaConnection.query(
    `CREATE DATABASE IF NOT EXISTS \`starparty\`
      DEFAULT CHARACTER SET = 'utf8'
      DEFAULT COLLATE 'utf8_general_ci';
    USE \`starparty\`;
    CREATE TABLE IF NOT EXISTS \`starparty\`.\`events\` (
      \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
      \`title\` VARCHAR(255) NULL,
      \`description\` TEXT NULL,
      \`startDate\` VARCHAR(255) NULL,
      \`endDate\` VARCHAR(255) NULL,
      \`createdBy\` VARCHAR(255) NULL,
    PRIMARY KEY (\`id\`));`,
    (err) => {
      if (err) {
        throw err;
      }
      console.log('Successfully created schema');
      schemaConnection.end();
    }
  );
}
