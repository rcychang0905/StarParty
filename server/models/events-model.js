import getConnection from '../helpers/cloudsql';

export {
  getAllEvent,
  getCurrentEvent,
  getEventById,
  getEventLocationById,
  addEntryForEvent
};

function getAllEvent() {
  return getConnection('SELECT MainTable.*,\n' +
    '       (SELECT COALESCE(SUM(Events.people), 0)\n' +
    '        FROM Events\n' +
    '        WHERE MainTable.eventID = Events.eventID\n' +
    '       ) AS total_attendance\n' +
    'FROM MainTable');
}

function getCurrentEvent() {
  return getConnection('SELECT MainTable.*,\n' +
    '       (SELECT COALESCE(SUM(Events.people), 0)\n' +
    '        FROM Events\n' +
    '        WHERE MainTable.eventID = Events.eventID\n' +
    '       ) AS total_attendance\n' +
    'FROM MainTable WHERE MainTable.current = 1');
}

function getEventById(id) {
  return getConnection('SELECT * FROM Events WHERE EventID = ?', id);
}

function getEventLocationById(id) {
  return getConnection('SELECT DISTINCT id, userName, GPS FROM Events WHERE EventID = ?', id);
}

function addEntryForEvent(data) {
  return getConnection('INSERT INTO Events SET ?', data);
}
