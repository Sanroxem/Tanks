"use strict";
exports.__esModule = true;
exports.root = exports.tanksModel = exports.boardModel = exports.emitter = void 0;
var Root_1 = require("./view/Root");
var TankController_1 = require("./controller/TankController");
var BoardModel_1 = require("./model/board/BoardModel");
var TanksModel_1 = require("./model/tanks/TanksModel");
var GameResizer_1 = require("./controller/GameResizer");
var KeyInputController_1 = require("./controller/KeyInputController");
var utils_1 = require("@pixi/utils");
exports.emitter = new utils_1.EventEmitter();
exports.boardModel = new BoardModel_1["default"]();
exports.tanksModel = new TanksModel_1["default"]();
exports.root = new Root_1["default"]();
startUp();
function startUp() {
    new GameResizer_1["default"]();
    new TankController_1["default"]();
    new KeyInputController_1["default"]();
}
