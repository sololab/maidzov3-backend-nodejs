module.exports = function(Comment) {
  Comment.disableRemoteMethod('createChangeStream', true);
};
