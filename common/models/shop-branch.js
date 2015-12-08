module.exports = function(ShopBranch) {
  ShopBranch.disableRemoteMethod('createChangeStream', true);
};
