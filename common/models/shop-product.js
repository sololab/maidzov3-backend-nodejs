module.exports = function(ShopProduct) {
  ShopProduct.disableRemoteMethod('createChangeStream', true);
};
