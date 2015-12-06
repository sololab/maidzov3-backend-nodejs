var server = require('../../server/server');
var db = server.dataSources.mongodb;
var deasync = require('deasync'); // for turning async function into sync


module.exports = function(Client) {
  Client.beforeRemote('create', function(context, user, next) {
    var counterDb = db.models.Counter;
    var req = context.req;

    req.body.created = Date.now();
    req.body.lastUpdated = Date.now();

    if (req.body.id) {
      delete req.body['id'];
    }

    // Get the counter for clientId
    var done = false;
    var tmpId = null;
    counterDb.findOne(
      {fields: ['_id', 'seq'], where: {name: 'clientId'}},
      function(err, returnedInstances) {
        tmpId = returnedInstances._id;
        req.body.clientId = returnedInstances.seq;
        done = true;
      }
    );
    deasync.loopWhile(function(){return !done;});


    // Increase the counter for clientId
    done = false;
    counterDb.updateAll(
      {_id: tmpId},
      {_id: tmpId, name: 'clientId', seq: 1 + req.body.clientId},
      function(err, obj) {
        done = true;
      }
    );
    deasync.loopWhile(function(){return !done;});


    console.log(JSON.stringify(req.body));

    next();
  });
};
