module.exports = function(ShopBrand) {
  ShopBrand.disableRemoteMethod('createChangeStream', true);
};
