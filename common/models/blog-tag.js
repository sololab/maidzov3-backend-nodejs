module.exports = function(BlogTag) {
  // Hide some methods
  BlogTag.disableRemoteMethod('createChangeStream', true);

  // Model constraint
  BlogTag.validatesUniquenessOf('slug', {message: 'slug is not unique'});
};
