// Migrate blog database table
var server = require('../../server');
var ds = server.dataSources.mysql;
var Author = require('../../../common/models/author.json');
var Category = require('../../../common/models/category.json');
var Post = require('../../../common/models/post.json');
var Comment = require('../../../common/models/comment.json');

ds.createModel(Author.name, Author.properties, Author.options);
ds.createModel(Category.name, Category.properties, Category.options);
ds.createModel(Post.name, Post.properties, Post.options);

ds.automigrate(function() {
  ds.discoverModelProperties(Author.name, function (er, props) {
    if (er) throw er;

    console.log(props);

    ds.disconnect();
  });

  ds.discoverModelProperties(Category.name, function (er, props) {
    if (er) throw er;

    console.log(props);

    ds.disconnect();
  });

  ds.discoverModelProperties(Post.name, function (er, props) {
    if (er) throw er;

    console.log(props);

    ds.disconnect();
  });

  ds.discoverModelProperties(Comment.name, function (er, props) {
    if (er) throw er;

    console.log(props);

    ds.disconnect();
  });
});