"use strict";
exports.__esModule = true;
var PIXI = require("pixi.js");
var GameBoard_1 = require("./GameBoard");
var Root = /** @class */ (function () {
    function Root() {
        this.app = this.createApplication();
        this.stage = this.app.stage;
        this.gameBoard = this.createGameBoard();
    }
    Root.prototype.createApplication = function () {
        var app = new PIXI.Application(this.getApplicationSettings());
        app.view.id = "game-canvas";
        document.body.appendChild(app.view);
        return app;
    };
    Root.prototype.getApplicationSettings = function () {
        return {
            autoResize: true,
            width: window.innerWidth,
            height: window.innerHeight,
        };
    };
    Root.prototype.createGameBoard = function () {
        var gameBoard = new GameBoard_1["default"]();
        return this.stage.addChild(gameBoard);
    };
    Root.prototype.resizeApp = function () {
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
    };
    return Root;
}());
exports["default"] = Root;
