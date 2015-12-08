var server = require('../../server');
var db = server.dataSources.mongodb;
var counterDb = db.models.Counter;

// Admin has clientId 1
counterDb.create({name: 'clientId', seq: 2}, function (err, obj) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(JSON.stringify(obj));
});
