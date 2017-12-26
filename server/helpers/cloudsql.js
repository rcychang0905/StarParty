import mysql from 'mysql';
import config from '../../config/config';

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

export default pool;
