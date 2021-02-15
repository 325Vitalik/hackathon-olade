"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combineRoutes = void 0;

var _random = require("./random.route");

var _forbidden = require("./forbidden.route");

var combineRoutes = function combineRoutes(app) {
  app.use('/api', _random.randomRoutes);
  app.use('/forbidden', _forbidden.forbiddenRoutes);
};

exports.combineRoutes = combineRoutes;