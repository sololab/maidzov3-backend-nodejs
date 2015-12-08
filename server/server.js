var env = require('dotenv').load();
var path = require('path');
var loopback = require('loopback');
var explorer = require('loopback-component-explorer');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.start = function() {
  var host = process.env.VCAP_APP_HOST || app.get('host');
  var port = process.env.VCAP_APP_PORT || app.get('port');

  // start the web server
  return app.listen(port, function() {
    app.emit('started');
    var baseUrl = host + ':' + port;
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
