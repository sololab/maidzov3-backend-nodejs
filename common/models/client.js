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
        req.body.id = returnedInstances.seq;
        done = true;
      }
    );
    deasync.loopWhile(function(){return !done;});

    next();
  });


  Client.afterRemote('create', function(context, user, next) {
    // Initialize the role of each new client to be 'member'
    var Role = server.models.Role;
    var RoleMapping = server.models.RoleMapping;
    Role.findOne(
      {where: {name: 'member'}},
      function(err, role) {
        role.principals.create({
          principalType: RoleMapping.USER,
          principalId: user.id
        }, function(err, principal) {
          if (err) next(err);
          console.log('Created principal:', principal);
        });
      }
    );

    var counterDb = db.models.Counter;
    var tmpId = user.id;

    // Increase the counter for clientId
    var done = false;
    counterDb.updateAll(
      {name: 'clientId'},
      {name: 'clientId', seq: 1 + tmpId},
      function(err, obj) {
        done = true;
      }
    );
    deasync.loopWhile(function(){return !done;});

    next();
  });


  // This remote method is for updating the role of a client
  Client.updateRole = function(clientId, newRoleId, cb) {
    var Role = server.models.Role;
    var RoleMapping = server.models.RoleMapping;

    // Update the related role mapping
    RoleMapping.findOne(
      {where: {principalId: parseInt(clientId)}},
      function(err, roleMapping) {
        if (err)
          return cb(null, err);
        else {
          RoleMapping.updateAll(
            {principalId: parseInt(clientId)},
            {roleId: newRoleId},
            function(err, obj) {
              if (err)
                return cb(null,err);
              return cb(null,'Updated the user\'s role');
            }
          );
        }
      }
    );
  };


  Client.beforeRemote('updateRole', function(context, user, next) {
    var req = context.req;
    var err = null;
    if (!req.body.id) {
      err = new Error('Must specify the id of the user');
      err.status = 400;
      next(err);
    }
    else if (!req.body.newRole) {
      err = new Error('Must specify the new role for the user');
      err.status = 400;
      next(err);
    }
    else {
      var Client = server.models.Client;
      var Role = server.models.Role;

      var done = false;
      Role.findOne(
        {where: {name: req.body.newRole}},
        function(err, role) {
          if (err || !role) {
            err = new Error(req.body.newRole + ' is not a valid role');
            err.status = 400;
            return next(err);
          }
          done = true;
          req.body.newRole = role.id;
        }
      );
      deasync.loopWhile(function(){return !done;});

      done = false;
      Client.findOne(
        {where: {_id: parseInt(req.body.id)}},
        function(err, client) {
          if (err || !client) {
            err = new Error('There is no client with id ' + req.body.id);
            err.status = 400;
            return next(err);
          }
          done = true;
        }
      );
      deasync.loopWhile(function(){return !done;});

      next();
    }
  });


  Client.remoteMethod(
    'updateRole',
    {
      description: 'Update the role of a client',
      accepts: [{arg: 'id', type: 'string'}, {arg: 'newRole', type: 'string'}],
      returns: {arg: 'message', type: 'string'},
      http: {status: 200, errorStatus: 400},
    }
  );
};
