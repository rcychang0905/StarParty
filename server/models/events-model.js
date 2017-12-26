import pool from '../helpers/cloudsql';

export {
  list,
  add,
  read
};

function list(cb) {
  pool.getConnection((err, connection) => {
    connection.query('SELECT * FROM Events', (err, results) => {
      connection.release();
      if (err) throw err;
      cb(err, results);
    });
  });
}

function add(data, cb) {
  pool.getConnection((err, connection) => {
    connection.query('INSERT INTO Events SET ?', data, (err, res) => {
      connection.release();
      if (err) {
        cb(err);
        return;
      }
      read(res.insertId, cb);
    });
  });
}

function read(id, cb) {
  pool.getConnection((err, connection) => {
    connection.query(
      'SELECT * FROM Events WHERE `eventID` = ?', id, (err, res) => {
        connection.release();
        if (err) {
          cb(err);
          return;
        }
        cb(null, res[0]);
      });
  });
}

