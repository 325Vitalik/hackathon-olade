"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _config = require("./configs/config");

var _routes = require("./routes");

var _errorHandling = require("./middlewares/errorHandling.middleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use(_express["default"].json());
(0, _routes.combineRoutes)(app);
app.use(_errorHandling.errorHandler);
app.listen(_config.port, function () {
  console.log("Example app listening at http://localhost:".concat(_config.port));
});