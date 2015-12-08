module.exports = function(BlogCategory) {
  // Hide some methods
  BlogCategory.disableRemoteMethod('createChangeStream', true);

  // Model constraint
  BlogCategory.validatesUniquenessOf('slug', {message: 'slug is not unique'});
};
