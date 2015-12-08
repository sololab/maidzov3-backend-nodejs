/*jshint loopfunc:true*/
'use strict';

var app = require('../../server');
var faker = require('faker');

var Category = app.models.BlogCategory;
var Post = app.models.BlogPost;

Category.deleteAll();
Post.deleteAll();

for (var i = 0; i < 5; i++) {
  var name = faker.lorem.sentence(5);
  var slug = faker.helpers.slugify(name);

  var postName = faker.lorem.sentence(5);
  var postSlug = faker.helpers.slugify(postName);
  var postContent = faker.lorem.paragraphs(5);
  var postImage = faker.image.imageUrl();

  Category.create({
    name: name,
    slug: slug
  }, function(err, category) {
    if (err) {
      console.log('Error create category', err);
    }
    console.log('created Category', category.name);
  });

  Post.create({
    name: postName,
    slug: postSlug,
    content: postContent,
    image: postImage,
    categoryId: 1
  }, function(err, post) {
    if (err) {
      console.log('Error create post', err);
    }
    console.log('created Post', post.name);
  });
}
