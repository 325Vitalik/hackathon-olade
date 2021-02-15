"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validationMiddleware = validationMiddleware;

function validationMiddleware(req, res, next) {
  if (req.body.name) {
    throw new Error('');
  }
}