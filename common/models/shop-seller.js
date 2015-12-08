module.exports = function(ShopSeller) {
  ShopSeller.disableRemoteMethod('createChangeStream', true);
};
