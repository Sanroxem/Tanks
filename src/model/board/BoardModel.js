"use strict";
exports.__esModule = true;
var ArrayUtil_1 = require("../../utils/ArrayUtil");
var GameConfig_1 = require("../GameConfig");
var BoardModel = /** @class */ (function () {
    function BoardModel() {
        this.ELEMENTS_AMOUNT = this.createElementsAmountData();
    }
    BoardModel.prototype.createElementsAmountData = function () {
        var elementsAmount = [];
        GameConfig_1.BOARD_DATA.gridTypes.forEach(function (gridType) { return elementsAmount.push(gridType); });
        return elementsAmount;
    };
    BoardModel.prototype.getRandomBoardGridData = function () {
        return this.generateRandomBoardGridArray();
    };
    BoardModel.prototype.generateRandomBoardGridArray = function () {
        var randomBoardGridArray = [];
        var totalGrids = GameConfig_1.BOARD_DATA.columns * GameConfig_1.BOARD_DATA.rows;
        var emptySpaces;
        for (var i = 0; i < GameConfig_1.BOARD_DATA.gridTypes.length; i++) {
            for (var j = 0; j < GameConfig_1.BOARD_DATA.gridTypes[i].amount; j++) {
                randomBoardGridArray.push(this.getGridData(GameConfig_1.BOARD_DATA.gridTypes[i].type));
            }
        }
        emptySpaces = totalGrids - randomBoardGridArray.length;
        for (var i = 0; i < emptySpaces; i++) {
            randomBoardGridArray.push(this.getGridData("empty"));
        }
        return ArrayUtil_1.shuffleArray(randomBoardGridArray);
    };
    BoardModel.prototype.getGridData = function (type) {
        return GameConfig_1.GRID_TYPE_DATA.get(type);
    };
    BoardModel.prototype.getElementsAmount = function () {
        return this.ELEMENTS_AMOUNT;
    };
    BoardModel.prototype.getBoardBounds = function () {
        return { x: GameConfig_1.BOARD_DATA.columns, y: GameConfig_1.BOARD_DATA.rows };
    };
    return BoardModel;
}());
exports["default"] = BoardModel;
