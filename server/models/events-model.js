import getConnection from '../helpers/cloudsql';

export {
  list,
  getEventById,
  getEventLocationById,
  addEntryForEvent
};

function list() {
  return getConnection('SELECT MainTable.*,\n' +
    '       (SELECT COALESCE(SUM(Events.people), 0)\n' +
    '        FROM Events\n' +
    '        WHERE MainTable.eventID = Events.eventID\n' +
    '       ) AS total_attendance\n' +
    'FROM MainTable');
}

function getEventById(id) {
  return getConnection('SELECT * FROM Events WHERE EventID = ?', id);
}

function getEventLocationById(id) {
  return getConnection('SELECT DISTINCT userName, GPS FROM Events WHERE EventID = ?', id);
}

function addEntryForEvent(data) {
  return getConnection('INSERT INTO Events SET ?', data);
}
