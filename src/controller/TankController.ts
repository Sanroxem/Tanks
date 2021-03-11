import {root, emitter, tanksModel, boardModel} from "../main";
import {BULLET_SPEED} from "../model/GameConfig";
import {EMITTER_KEYS, TANK_DIRECTIONS} from "../model/Texts";
import {Position} from "../model/Position";

export default class TankController {
  constructor() {
    emitter.on(EMITTER_KEYS.MOVE_OR_ROTATE_TANK, this.moveOrRotateTank.bind(this));
    emitter.on(EMITTER_KEYS.SHOOT_CANNONS, this.shootCannons.bind(this));
    emitter.on(EMITTER_KEYS.CHANGE_TANK, this.changeTank.bind(this));
  }

  moveOrRotateTank(rotationKey: string) {
    let tank = this.getCurrentTank();
    if (tank.getRotation() === tanksModel.getTankRotation(rotationKey)) {
      this.tryMovingTank(rotationKey);
    } else {
      this.rotateTank(rotationKey);
    }
  }

  tryMovingTank(rotationKey: string) {
    let tank = this.getCurrentTank();
    let oldPosition = tank.getTankPositionOnBoard();
    let newPosition = this.generateNewPositionOnBoard(oldPosition, rotationKey);
    let gameGrid = root.gameBoard.gameGrid;

    if (this.isNewPositionInBounds(newPosition)) {
      if (this.isNewPositionNotSolid(newPosition, gameGrid)) {
        this.moveTank(tank, newPosition, oldPosition, gameGrid);
      }
    }
  }

  moveTank(tank, newPosition: Position, oldPosition: Position, gameGrid) {
    gameGrid[newPosition.x][newPosition.y].setAsTankGrid();
    gameGrid[oldPosition.x][oldPosition.y].setAsTankLeftGrid();
    tank.setTankPositionOnBoard(newPosition);
    tank.setPosition(gameGrid[newPosition.x][newPosition.y].position);
  }

  isNewPositionInBounds(newPosition: Position) {
    let bounds = boardModel.getBoardBounds();
    return (
      newPosition.x >= 0 &&
      newPosition.x <= bounds.x - 1 &&
      newPosition.y >= 0 &&
      newPosition.y <= bounds.y - 1
    );
  }

  isNewPositionNotSolid(newPosition: Position, gameGrid) {
    return !gameGrid[newPosition.x][newPosition.y].isSolid();
  }

  isNewPositionDestructible(newPosition: Position, gameGrid) {
    return gameGrid[newPosition.x][newPosition.y].isDestructible();
  }

  generateNewPositionOnBoard(tankPositionOnBoard: Position, rotationKey) {
    let newPositionOnBoard: Position = {
      x: tankPositionOnBoard.x,
      y: tankPositionOnBoard.y
    };

    switch (rotationKey) {
      case TANK_DIRECTIONS.LEFT:
        newPositionOnBoard.x -= 1;
        break;
      case TANK_DIRECTIONS.UP:
        newPositionOnBoard.y -= 1;
        break;
      case TANK_DIRECTIONS.RIGHT:
        newPositionOnBoard.x += 1;
        break;
      case TANK_DIRECTIONS.DOWN:
        newPositionOnBoard.y += 1;
        break;
    }
    return newPositionOnBoard;
  }

  rotateTank(rotationKey: string) {
    let currentTankIndex = tanksModel.getCurrentTankIndex();
    let tankRotation = tanksModel.getTankRotation(rotationKey);
    root.gameBoard.tanks[currentTankIndex].setTankRotation(
      tankRotation,
      rotationKey
    );
  }

  getCurrentTank() {
    return root.gameBoard.tanks[tanksModel.getCurrentTankIndex()];
  }

  shootCannons() {
    let tank = this.getCurrentTank();
    let rotationKey = tank.getRotationKey();
    let tankPosition = tank.getTankPositionOnBoard();
    let newPosition = this.generateNewPositionOnBoard(
      tankPosition,
      rotationKey
    );
    let gameGrid = root.gameBoard.gameGrid;
    if (this.canBulletBeCreated(newPosition, gameGrid)) {
      this.generateBulletOnBoard(tank.getTankPositionOnBoard(), tank.getBulletData(), rotationKey);
    }
  }

  generateBulletOnBoard(tankPosition, bulletData, rotationKey) {
    bulletData.rotation = tanksModel.getTankRotation(rotationKey);
    let bullet = root.gameBoard.createBullet(tankPosition, bulletData);
    let bulletInterval = setInterval(
      this.moveBullet.bind(this),
      BULLET_SPEED,
      bullet,
      rotationKey,
      function () {
        clearInterval(bulletInterval);
      }
    );
  }

  moveBullet(bullet, rotationKey: string, clearBulletInterval) {
    let oldPosition = bullet.getBulletPositionOnBoard();
    let newPosition = this.generateNewPositionOnBoard(oldPosition, rotationKey);
    let gameGrid = root.gameBoard.gameGrid;

    if (this.canBulletBeCreated(newPosition, gameGrid)) {
      bullet.makeVisible();
      this.moveBulletToNewPosition(
        bullet,
        gameGrid,
        newPosition,
        clearBulletInterval
      );
    } else {
      clearBulletInterval();
      bullet.erase();
    }
  }

  moveBulletToNewPosition(bullet, gameGrid, newPosition: Position, clearBulletInterval) {
    if (this.isNewPositionDestructible(newPosition, gameGrid)) {
      let isAlive: boolean = true;
      let bulletsData = bullet.getBulletsData();
      let collisionResult;

      while (isAlive && bulletsData.length > 0) {

        collisionResult = gameGrid[newPosition.x][newPosition.y].dealDamage(bulletsData[bulletsData.length - 1]);
        isAlive = !collisionResult.isDestroyed;
        if (collisionResult.damageLeftInBullet === 0) {
          bulletsData.pop();
        } else {
          bulletsData[bulletsData.length - 1] = collisionResult.damageLeftInBullet;
        }
      }

      if (bulletsData.length > 0) {
        bullet.updateBulletsCondition(bulletsData);
        this.changeBulletPosition(newPosition, bullet, gameGrid);
      } else {
        clearBulletInterval();
        bullet.erase();
      }
    } else {
      this.changeBulletPosition(newPosition, bullet, gameGrid);
    }
  }

  changeBulletPosition(newPosition: Position, bullet, gameGrid) {
    let position = gameGrid[newPosition.x][newPosition.y].position;
    bullet.setPosition(position);
    bullet.setBulletPositionOnBoard(newPosition);
  }

  canBulletBeCreated(newPosition: Position, gameGrid) {
    return (
      this.isNewPositionInBounds(newPosition) &&
      (this.isNewPositionDestructible(newPosition, gameGrid) ||
        this.isNewPositionNotSolid(newPosition, gameGrid))
    );
  }

  changeTank() {
    tanksModel.switchCurrentTankIndex();
  }
}
