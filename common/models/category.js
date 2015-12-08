module.exports = function(Category) {
  Category.disableRemoteMethod('createChangeStream', true);
};
