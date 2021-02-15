"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomService = void 0;
var randomService = {
  getError: function getError() {
    return ':(';
  },
  getSuccess: function getSuccess() {
    return {
      status: 'success'
    };
  }
};
exports.randomService = randomService;