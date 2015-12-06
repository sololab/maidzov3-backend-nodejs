var server = require('../../server');
var db = server.dataSources.mongodb;
var counterDb = db.models.Counter;

counterDb.create({name: 'clientId', seq: 1}, function (err, obj) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(JSON.stringify(obj));
});
