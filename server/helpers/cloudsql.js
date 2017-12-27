import mysql from 'mysql';
import config from '../../config/config';

const Promise = require('bluebird'); // eslint-disable-line no-global-assign

Promise.promisifyAll(mysql);
Promise.promisifyAll(require('mysql/lib/Connection').prototype);
Promise.promisifyAll(require('mysql/lib/Pool').prototype);

const options = {
  connectionLimit: 10,
  user: config.get('MYSQL_USER'),
  password: config.get('MYSQL_PASSWORD'),
  database: 'starparty'
};

if (config.get('INSTANCE_CONNECTION_NAME') && config.get('NODE_ENV') === 'production') {
  options.socketPath = `/cloudsql/${config.get('INSTANCE_CONNECTION_NAME')}`;
}

const pool = mysql.createPool(options);

function getConnection() {
  return pool.getConnectionAsync().disposer(connection =>
    connection.release()
  );
}

function useConnection(query, parameters) {
  return Promise.using(
    getConnection(),
    connection => connection.queryAsync(query, parameters)
  );
}

export default useConnection;
