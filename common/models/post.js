module.exports = function(Post) {
  // Hide some methods
  Post.disableRemoteMethod('createChangeStream', true);

  // Model constraint
  Post.validatesUniquenessOf('slug', {message: 'slug is not unique'});
};
