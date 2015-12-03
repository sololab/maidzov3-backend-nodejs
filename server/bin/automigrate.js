var app = require('../server');
var dataSource = app.dataSources.mysql;
var User = app.models.user;
var users = [
    {
      firstName: 'Tuan',
      lastName: 'Lai Manh',
      username: 'laituan245',
      password: '123456',
      email: 'laituan245@gmail.com',
      emailVerified: false,
      created: new Date(),
      lastUpdated: new Date()
    },
    {
      firstName: 'Duong',
      lastName: 'Truong',
      username: 'duongtd',
      password: '123456',
      email: 'duongtd@sololab.net',
      emailVerified: false,
      created: new Date(),
      lastUpdated: new Date()
    }
  ];

var count = users.length;
dataSource.automigrate('user', function (err) {
  users.forEach(function(user) {
    User.create(user, function(err, result) {
      if(!err) {
        console.log('Record created:', result);
        count--;
        if(count === 0) {
          console.log('done');
          dataSource.disconnect();
        }
      }
    });
  });
});
