module.exports = function(BlogComment) {
  BlogComment.disableRemoteMethod('createChangeStream', true);
};
