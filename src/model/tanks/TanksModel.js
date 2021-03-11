"use strict";
exports.__esModule = true;
var GameConfig_1 = require("../GameConfig");
var Texts_1 = require("../Texts");
var TanksModel = /** @class */ (function () {
    function TanksModel() {
        this.TANK_ROTATIONS = this.createTanksRotationData();
        this.currentTankIndex = 0;
    }
    TanksModel.prototype.createTanksRotationData = function () {
        var tankRotations = new Map();
        tankRotations.set(Texts_1.TANK_DIRECTIONS.UP, 0);
        tankRotations.set(Texts_1.TANK_DIRECTIONS.LEFT, 4.71);
        tankRotations.set(Texts_1.TANK_DIRECTIONS.RIGHT, 1.57);
        tankRotations.set(Texts_1.TANK_DIRECTIONS.DOWN, 3.14);
        return tankRotations;
    };
    TanksModel.prototype.getCurrentTankIndex = function () {
        return this.currentTankIndex;
    };
    TanksModel.prototype.switchCurrentTankIndex = function () {
        if (this.currentTankIndex === GameConfig_1.TANKS_DATA.length - 1) {
            this.currentTankIndex = 0;
        }
        else {
            this.currentTankIndex++;
        }
    };
    TanksModel.prototype.getTanksData = function () {
        return GameConfig_1.TANKS_DATA;
    };
    TanksModel.prototype.getTankRotation = function (key) {
        return this.TANK_ROTATIONS.get(key);
    };
    return TanksModel;
}());
exports["default"] = TanksModel;
