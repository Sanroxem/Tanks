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
var Tank = /** @class */ (function (_super) {
    __extends(Tank, _super);
    function Tank(tankData, tankPosition, tankPositionOnBoard) {
        var _this = _super.call(this) || this;
        _this.setupTankData(tankData);
        _this.setupBulletData(tankData);
        _this.setPosition(tankPosition);
        _this.setTankPositionOnBoard(tankPositionOnBoard);
        _this.tankSprite = _this.createTankSprite();
        return _this;
    }
    Tank.prototype.setupBulletData = function (tankData) {
        this.BULLET_DATA = {
            numberOfBullets: tankData.numberOfBullets,
            damage: tankData.damage
        };
    };
    Tank.prototype.setupTankData = function (tankData) {
        this.TYPE = tankData.type;
        this.rotationKey = tankData.rotationKey;
    };
    Tank.prototype.createTankSprite = function () {
        var tankSprite = PIXI.Sprite.from("images/board/tank_" + this.TYPE + ".png");
        tankSprite.anchor.set(0.5);
        return this.addChild(tankSprite);
    };
    Tank.prototype.setTankRotation = function (rotation, rotationKey) {
        this.rotationKey = rotationKey;
        this.tankSprite.rotation = rotation;
    };
    Tank.prototype.getRotationKey = function () {
        return this.rotationKey;
    };
    Tank.prototype.getRotation = function () {
        return this.tankSprite.rotation;
    };
    Tank.prototype.setTankPositionOnBoard = function (tankPositionOnBoard) {
        this.tankPositionOnBoard = tankPositionOnBoard;
    };
    Tank.prototype.getTankPositionOnBoard = function () {
        return this.tankPositionOnBoard;
    };
    Tank.prototype.setPosition = function (tankPosition) {
        this.position = tankPosition;
    };
    Tank.prototype.getBulletData = function () {
        return this.BULLET_DATA;
    };
    return Tank;
}(PIXI.Container));
exports["default"] = Tank;
