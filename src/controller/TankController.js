"use strict";
exports.__esModule = true;
var main_1 = require("../main");
var GameConfig_1 = require("../model/GameConfig");
var Texts_1 = require("../model/Texts");
var TankController = /** @class */ (function () {
    function TankController() {
        main_1.emitter.on(Texts_1.EMITTER_KEYS.MOVE_OR_ROTATE_TANK, this.moveOrRotateTank.bind(this));
        main_1.emitter.on(Texts_1.EMITTER_KEYS.SHOOT_CANNONS, this.shootCannons.bind(this));
        main_1.emitter.on(Texts_1.EMITTER_KEYS.CHANGE_TANK, this.changeTank.bind(this));
    }
    TankController.prototype.moveOrRotateTank = function (rotationKey) {
        var tank = this.getCurrentTank();
        if (tank.getRotation() === main_1.tanksModel.getTankRotation(rotationKey)) {
            this.tryMovingTank(rotationKey);
        }
        else {
            this.rotateTank(rotationKey);
        }
    };
    TankController.prototype.tryMovingTank = function (rotationKey) {
        var tank = this.getCurrentTank();
        var oldPosition = tank.getTankPositionOnBoard();
        var newPosition = this.generateNewPositionOnBoard(oldPosition, rotationKey);
        var gameGrid = main_1.root.gameBoard.gameGrid;
        if (this.isNewPositionInBounds(newPosition)) {
            if (this.isNewPositionNotSolid(newPosition, gameGrid)) {
                this.moveTank(tank, newPosition, oldPosition, gameGrid);
            }
        }
    };
    TankController.prototype.moveTank = function (tank, newPosition, oldPosition, gameGrid) {
        gameGrid[newPosition.x][newPosition.y].setAsTankGrid();
        gameGrid[oldPosition.x][oldPosition.y].setAsTankLeftGrid();
        tank.setTankPositionOnBoard(newPosition);
        tank.setPosition(gameGrid[newPosition.x][newPosition.y].position);
    };
    TankController.prototype.isNewPositionInBounds = function (newPosition) {
        var bounds = main_1.boardModel.getBoardBounds();
        return (newPosition.x >= 0 &&
            newPosition.x <= bounds.x - 1 &&
            newPosition.y >= 0 &&
            newPosition.y <= bounds.y - 1);
    };
    TankController.prototype.isNewPositionNotSolid = function (newPosition, gameGrid) {
        return !gameGrid[newPosition.x][newPosition.y].isSolid();
    };
    TankController.prototype.isNewPositionDestructible = function (newPosition, gameGrid) {
        return gameGrid[newPosition.x][newPosition.y].isDestructible();
    };
    TankController.prototype.generateNewPositionOnBoard = function (tankPositionOnBoard, rotationKey) {
        var newPositionOnBoard = {
            x: tankPositionOnBoard.x,
            y: tankPositionOnBoard.y
        };
        switch (rotationKey) {
            case Texts_1.TANK_DIRECTIONS.LEFT:
                newPositionOnBoard.x -= 1;
                break;
            case Texts_1.TANK_DIRECTIONS.UP:
                newPositionOnBoard.y -= 1;
                break;
            case Texts_1.TANK_DIRECTIONS.RIGHT:
                newPositionOnBoard.x += 1;
                break;
            case Texts_1.TANK_DIRECTIONS.DOWN:
                newPositionOnBoard.y += 1;
                break;
        }
        return newPositionOnBoard;
    };
    TankController.prototype.rotateTank = function (rotationKey) {
        var currentTankIndex = main_1.tanksModel.getCurrentTankIndex();
        var tankRotation = main_1.tanksModel.getTankRotation(rotationKey);
        main_1.root.gameBoard.tanks[currentTankIndex].setTankRotation(tankRotation, rotationKey);
    };
    TankController.prototype.getCurrentTank = function () {
        return main_1.root.gameBoard.tanks[main_1.tanksModel.getCurrentTankIndex()];
    };
    TankController.prototype.shootCannons = function () {
        var tank = this.getCurrentTank();
        var rotationKey = tank.getRotationKey();
        var tankPosition = tank.getTankPositionOnBoard();
        var newPosition = this.generateNewPositionOnBoard(tankPosition, rotationKey);
        var gameGrid = main_1.root.gameBoard.gameGrid;
        if (this.canBulletBeCreated(newPosition, gameGrid)) {
            this.generateBulletOnBoard(tank.getTankPositionOnBoard(), tank.getBulletData(), rotationKey);
        }
    };
    TankController.prototype.generateBulletOnBoard = function (tankPosition, bulletData, rotationKey) {
        bulletData.rotation = main_1.tanksModel.getTankRotation(rotationKey);
        var bullet = main_1.root.gameBoard.createBullet(tankPosition, bulletData);
        var bulletInterval = setInterval(this.moveBullet.bind(this), GameConfig_1.BULLET_SPEED, bullet, rotationKey, function () {
            clearInterval(bulletInterval);
        });
    };
    TankController.prototype.moveBullet = function (bullet, rotationKey, clearBulletInterval) {
        var oldPosition = bullet.getBulletPositionOnBoard();
        var newPosition = this.generateNewPositionOnBoard(oldPosition, rotationKey);
        var gameGrid = main_1.root.gameBoard.gameGrid;
        if (this.canBulletBeCreated(newPosition, gameGrid)) {
            bullet.makeVisible();
            this.moveBulletToNewPosition(bullet, gameGrid, newPosition, clearBulletInterval);
        }
        else {
            clearBulletInterval();
            bullet.erase();
        }
    };
    TankController.prototype.moveBulletToNewPosition = function (bullet, gameGrid, newPosition, clearBulletInterval) {
        if (this.isNewPositionDestructible(newPosition, gameGrid)) {
            var isAlive = true;
            var bulletsData = bullet.getBulletsData();
            var collisionResult = void 0;
            while (isAlive && bulletsData.length > 0) {
                collisionResult = gameGrid[newPosition.x][newPosition.y].dealDamage(bulletsData[bulletsData.length - 1]);
                isAlive = !collisionResult.isDestroyed;
                if (collisionResult.damageLeftInBullet === 0) {
                    bulletsData.pop();
                }
                else {
                    bulletsData[bulletsData.length - 1] = collisionResult.damageLeftInBullet;
                }
            }
            if (bulletsData.length > 0) {
                bullet.updateBulletsCondition(bulletsData);
                this.changeBulletPosition(newPosition, bullet, gameGrid);
            }
            else {
                clearBulletInterval();
                bullet.erase();
            }
        }
        else {
            this.changeBulletPosition(newPosition, bullet, gameGrid);
        }
    };
    TankController.prototype.changeBulletPosition = function (newPosition, bullet, gameGrid) {
        var position = gameGrid[newPosition.x][newPosition.y].position;
        bullet.setPosition(position);
        bullet.setBulletPositionOnBoard(newPosition);
    };
    TankController.prototype.canBulletBeCreated = function (newPosition, gameGrid) {
        return (this.isNewPositionInBounds(newPosition) &&
            (this.isNewPositionDestructible(newPosition, gameGrid) ||
                this.isNewPositionNotSolid(newPosition, gameGrid)));
    };
    TankController.prototype.changeTank = function () {
        main_1.tanksModel.switchCurrentTankIndex();
    };
    return TankController;
}());
exports["default"] = TankController;
