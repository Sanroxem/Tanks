"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var PIXI = require("pixi.js");
var Tank_1 = require("./Tank");
var Bullet_1 = require("./Bullet");
var BoardGrid_1 = require("./BoardGrid");
var GameConfig_1 = require("../model/GameConfig");
var main_1 = require("../main");
var GameBoard = /** @class */ (function (_super) {
    __extends(GameBoard, _super);
    function GameBoard() {
        var _this = _super.call(this) || this;
        _this.environmentLayer = _this.addChild(new PIXI.Container());
        _this.activeElementsLayer = _this.addChild(new PIXI.Container());
        _this.gameGrid = _this.createRandomGridSpace();
        _this.tanks = _this.createTanks();
        return _this;
    }
    GameBoard.prototype.createBullet = function (positionOnBoard, bulletData) {
        var bulletPosition = this.gameGrid[positionOnBoard.x][positionOnBoard.y];
        var bullet = new Bullet_1["default"](bulletPosition, positionOnBoard, bulletData);
        return this.activeElementsLayer.addChild(bullet);
    };
    GameBoard.prototype.createTanks = function () {
        var _this = this;
        var tanks = [];
        var tanksData = main_1.tanksModel.getTanksData();
        tanksData.forEach(function (data, i) { return tanks.push(_this.createTank(data, i)); });
        return tanks;
    };
    GameBoard.prototype.createTank = function (data, i) {
        var tankPosition = this.gameGrid[this.tanksPositions[i].x][this.tanksPositions[i].y].position;
        var tank = new Tank_1["default"](data, tankPosition, this.tanksPositions[i]);
        return this.activeElementsLayer.addChild(tank);
    };
    GameBoard.prototype.createRandomGridSpace = function () {
        var gridTypes = main_1.boardModel.getRandomBoardGridData();
        var boardBounds = main_1.boardModel.getBoardBounds();
        this.tanksPositions = [];
        var gridY = [];
        var gridData;
        for (var x = 0; x < boardBounds.x; x++) {
            var gridX = [];
            for (var y = 0; y < boardBounds.y; y++) {
                gridData = gridTypes.pop();
                gridX.push(this.createBoardGrid(x, y, gridData));
                if (gridData.hasTank) {
                    this.tanksPositions.push({ x: x, y: y });
                }
            }
            gridY.push(gridX);
        }
        return gridY;
    };
    GameBoard.prototype.createBoardGrid = function (x, y, gridData) {
        var boardGrid = new BoardGrid_1["default"](gridData);
        boardGrid.position.set(x * GameConfig_1.GRID_SIZE.x, y * GameConfig_1.GRID_SIZE.y);
        return this.environmentLayer.addChild(boardGrid);
    };
    return GameBoard;
}(PIXI.Container));
exports["default"] = GameBoard;
