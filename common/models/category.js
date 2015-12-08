module.exports = function(Category) {
  // Hide some methods
  Category.disableRemoteMethod('createChangeStream', true);

  // Model constraint
  Category.validatesUniquenessOf('slug', {message: 'slug is not unique'});
};
