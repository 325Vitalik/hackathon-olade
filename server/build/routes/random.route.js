"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomRoutes = void 0;

var _express = require("express");

var router = new _express.Router();
exports.randomRoutes = router;
router.get("/", function (req, res, next) {
  res.json({
    name: 'Random'
  });
});