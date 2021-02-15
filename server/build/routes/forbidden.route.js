"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forbiddenRoutes = void 0;

var _express = require("express");

var router = new _express.Router();
exports.forbiddenRoutes = router;
router.get("/", function (req, res, next) {
  var error = new Error(':(');
  error.statusCode = 403;
  next(error);
});