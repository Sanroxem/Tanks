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
var BoardGrid = /** @class */ (function (_super) {
    __extends(BoardGrid, _super);
    function BoardGrid(gridData) {
        var _this = _super.call(this) || this;
        _this.setupGrid(gridData);
        return _this;
    }
    BoardGrid.prototype.setupGrid = function (gridData) {
        this.backgroundImage = this.createGridImage("empty");
        if (gridData.type !== "empty") {
            this.gridImage = this.createGridImage(gridData.type);
        }
        this.setHP(gridData.hp);
        this.setDestructible(gridData.destructible);
        this.setSolid(gridData.solid);
        this.setHasTank(gridData.hasTank);
    };
    BoardGrid.prototype.setHasTank = function (hasTank) {
        this.hasTank = hasTank;
    };
    BoardGrid.prototype.getHasTank = function () {
        return this.hasTank;
    };
    BoardGrid.prototype.setAsEmptySpace = function () {
        this.removeChild(this.gridImage);
        this.gridImage = null;
        this.setSolid(false);
        this.setDestructible(false);
    };
    BoardGrid.prototype.setAsTankGrid = function () {
        this.setHasTank(true);
        this.setSolid(true);
    };
    BoardGrid.prototype.setAsTankLeftGrid = function () {
        this.setHasTank(false);
        this.setSolid(false);
    };
    BoardGrid.prototype.isSolid = function () {
        return this.SOLID;
    };
    BoardGrid.prototype.setSolid = function (isSolid) {
        return this.SOLID = isSolid;
    };
    BoardGrid.prototype.isDestructible = function () {
        return this.DESTRUCTIBLE;
    };
    BoardGrid.prototype.setDestructible = function (isDestructible) {
        return this.DESTRUCTIBLE = isDestructible;
    };
    BoardGrid.prototype.createGridImage = function (type) {
        var gridImage = PIXI.Sprite.from("images/board/" + type + ".png");
        gridImage.anchor.set(0.5);
        return this.addChild(gridImage);
    };
    BoardGrid.prototype.getHP = function () {
        return this.HP;
    };
    BoardGrid.prototype.setHP = function (hp) {
        this.HP = hp;
    };
    BoardGrid.prototype.dealDamage = function (damage) {
        this.setHP(this.getHP() - damage);
        var damageLeftInBullet = 0;
        var isDestroyed = this.getHP() <= 0;
        if (isDestroyed) {
            this.setAsEmptySpace();
            damageLeftInBullet = Math.abs(this.getHP());
        }
        //Console.log left for You for easier testing ;)
        console.log("HP left in Hay: ", this.getHP());
        return { isDestroyed: isDestroyed, damageLeftInBullet: damageLeftInBullet };
    };
    return BoardGrid;
}(PIXI.Container));
exports["default"] = BoardGrid;
