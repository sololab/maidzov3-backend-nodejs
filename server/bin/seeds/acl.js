// Seed for Users and Roles
var app = require('../../server');
var User = app.models.user;
var Client = app.models.Client;
var Role = app.models.Role;
var RoleMapping = app.models.RoleMapping;

// create the admin role
Role.create({
  name: 'admin'
}, function(err, role) {
  if (err) throw err;
  console.log('Created role:', role);
  // create an admin 'client'
  Client.create([
    {
      clientId: 0,
      firstName: 'Maidzo',
      lastName: 'Maidzo',
      username: 'admin',
      password: '123456',
      email: 'duongtd@sololab.net',
      emailVerified: false,
      created: new Date(),
      lastUpdated: new Date()
    }], function(err, clients) {
      role.principals.create({
      principalType: RoleMapping.USER,
      principalId: clients[0].id
    }, function(err, principal) {
      if (err) throw err;
      console.log('Created principal:', principal);
    });
  });
});


// create the blogAuthor role
Role.create({
  name: 'blogAuthor'
}, function(err, role) {
  if (err) throw err;
  console.log('Created role:', role);
});

// create the member role
Role.create({
  name: 'member'
}, function(err, role) {
  if (err) throw err;
  console.log('Created role:', role);
});
