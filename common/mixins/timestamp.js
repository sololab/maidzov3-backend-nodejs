module.exports = function(Model, options) {
  Model.defineProperty('created', {type: Date, default: '$now'});
  Model.defineProperty('lastUpdated', {type: Date, default: '$now'});
};
