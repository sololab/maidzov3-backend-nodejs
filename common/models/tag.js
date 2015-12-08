module.exports = function(Tag) {
  Tag.disableRemoteMethod('createChangeStream', true);
};
