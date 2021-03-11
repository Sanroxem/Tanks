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
var Bullet = /** @class */ (function (_super) {
    __extends(Bullet, _super);
    function Bullet(bulletPosition, bulletPositionOnBoard, bulletData) {
        var _this = _super.call(this) || this;
        _this.setPosition(bulletPosition);
        _this.setBulletPositionOnBoard(bulletPositionOnBoard);
        _this.bulletsData = _this.setBulletsData(bulletData);
        _this.bulletSprite = _this.createBulletSprite();
        _this.bulletSprite.rotation = bulletData.rotation;
        _this.visible = false;
        return _this;
    }
    Bullet.prototype.setBulletsData = function (bulletData) {
        var bulletsData = [];
        for (var i = 0; i < bulletData.numberOfBullets; i++) {
            bulletsData.push(bulletData.damage);
        }
        return bulletsData;
    };
    Bullet.prototype.createBulletSprite = function () {
        var bulletSprite = PIXI.Sprite.from("images/board/bullet_" + this.getBulletsData().length + ".png");
        bulletSprite.anchor.set(0.5);
        return this.addChild(bulletSprite);
    };
    Bullet.prototype.updateBulletSprite = function () {
        this.bulletSprite.texture = PIXI.Texture.from("images/board/bullet_" + this.getBulletsData().length + ".png");
    };
    Bullet.prototype.setBulletPositionOnBoard = function (bulletPositionOnBoard) {
        this.bulletPositionOnBoard = bulletPositionOnBoard;
    };
    Bullet.prototype.getBulletPositionOnBoard = function () {
        return this.bulletPositionOnBoard;
    };
    Bullet.prototype.setPosition = function (tankPosition) {
        this.position = tankPosition;
    };
    Bullet.prototype.getBulletsData = function () {
        return this.bulletsData;
    };
    Bullet.prototype.updateBulletsCondition = function (bulletsData) {
        this.bulletsData = bulletsData;
        this.updateBulletSprite();
    };
    Bullet.prototype.erase = function () {
        this.removeChildren();
        this.parent.removeChild(this);
    };
    Bullet.prototype.makeVisible = function () {
        this.visible = true;
    };
    return Bullet;
}(PIXI.Container));
exports["default"] = Bullet;
