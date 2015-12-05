var server = require('../../server/server');
var db = server.dataSources.mongodb;

module.exports = function(Client) {
  Client.beforeRemote('create', function(context, user, next) {
    var req = context.req;

    req.body.created = Date.now();
    req.body.lastUpdated = Date.now();

    if (req.body.id) {
      delete req.body['id'];
    }

    console.log(JSON.stringify(req.body));

    next();
  });
};
