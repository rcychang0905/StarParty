import getConnection from '../helpers/cloudsql';

export {
  list,
  add
};

function list() {
  return getConnection('SELECT * FROM Events');
}

function add(data) {
  return getConnection('INSERT INTO Events SET ?', data);
}
