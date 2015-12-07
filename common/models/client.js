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

    next();
  });


  Client.afterRemote('create', function(context, user, next) {
    var counterDb = db.models.Counter;
    var tmpId = user._id;
    var tmpClientId = user.clientId;

    // Increase the counter for clientId
    var done = false;
    counterDb.updateAll(
      {_id: tmpId},
      {_id: tmpId, name: 'clientId', seq: 1 + tmpClientId},
      function(err, obj) {
        done = true;
      }
    );
    deasync.loopWhile(function(){return !done;});

    next();
  });
};
