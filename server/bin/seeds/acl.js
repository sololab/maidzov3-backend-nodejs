// Seed for Users and Roles
var app = require('../../server');
var User = app.models.user;
var Role = app.models.Role;
var RoleMapping = app.models.RoleMapping;

//create the admin role
Role.create({
  name: 'admin'
}, function(err, role) {
  if (err) throw err;
  console.log('Created role:', role);
});

//create the blogAuthor role
Role.create({
  name: 'blogAuthor'
}, function(err, role) {
  if (err) throw err;
  console.log('Created role:', role);
});

//create the member role
Role.create({
  name: 'member'
}, function(err, role) {
  if (err) throw err;
  console.log('Created role:', role);
});
