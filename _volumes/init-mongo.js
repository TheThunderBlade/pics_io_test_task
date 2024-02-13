let db = db.getSiblingDB('mongo');
db.createUser({
  user: 'root',
  pwd: 'root',
  roles: [{ role: 'readWrite', db: 'mongo' }]
});
