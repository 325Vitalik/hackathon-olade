"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorHandler = errorHandler;

function errorHandler(err, req, res, next) {
  console.error(err.message);

  if (!err.statusCode) {
    err.statusCode = 500;
  }

  res.status(err.statusCode).send(err.message);
}

;