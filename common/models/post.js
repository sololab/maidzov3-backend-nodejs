module.exports = function(Post) {
  Post.disableRemoteMethod('createChangeStream', true);
};
