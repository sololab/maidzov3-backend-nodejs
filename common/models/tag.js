module.exports = function(Tag) {
  // Hide some methods
  Tag.disableRemoteMethod('createChangeStream', true);

  // Model constraint
  Tag.validatesUniquenessOf('slug', {message: 'slug is not unique'});
};
