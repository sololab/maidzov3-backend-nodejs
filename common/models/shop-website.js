module.exports = function(ShopWebsite) {
  ShopWebsite.disableRemoteMethod('createChangeStream', true);
};
