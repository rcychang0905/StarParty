import getConnection from '../helpers/cloudsql';

export {
  list,
  getEventById,
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

function getEventById(data) {
  return getConnection('SELECT * FROM Events WHERE EventID = ?', data);
}

function addEntryForEvent(data) {
  return getConnection('INSERT INTO Events SET ?', data);
}
