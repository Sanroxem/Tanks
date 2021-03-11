"use strict";
exports.__esModule = true;
var main_1 = require("../main");
var GameResizer = /** @class */ (function () {
    function GameResizer() {
        window.onresize = this.resizeRoot;
        this.resizeRoot();
    }
    GameResizer.prototype.resizeRoot = function () {
        var offset = 70;
        var scale = Math.min(window.innerWidth / (main_1.root.gameBoard.width + offset), window.innerHeight / (main_1.root.gameBoard.height + offset));
        main_1.root.resizeApp();
        main_1.root.stage.scale.set(scale);
        main_1.root.stage.x = window.innerWidth / 2 - (main_1.root.gameBoard.width / 2) * scale;
        main_1.root.stage.y = window.innerHeight / 2 - (main_1.root.gameBoard.height / 2) * scale;
    };
    return GameResizer;
}());
exports["default"] = GameResizer;
