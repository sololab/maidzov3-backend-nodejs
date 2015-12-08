module.exports = function(BlogPost) {
  // Hide some methods
  BlogPost.disableRemoteMethod('createChangeStream', true);

  // Model constraint
  BlogPost.validatesUniquenessOf('slug', {message: 'slug is not unique'});
};
