import * as PIXI from "pixi.js";
import {Position} from "~model/Position";

export interface TanksDataInterface {
  type: string;
  damage: number;
  numberOfBullets: number;
  rotationKey: string;
}

export interface BulletSDataInterface {
  numberOfBullets: number;
  damage: number;
  rotation?: number;
}

export default class Tank extends PIXI.Container {
  TYPE: string;
  BULLET_DATA: BulletSDataInterface;
  rotationKey: string;
  tankSprite: PIXI.Sprite;
  tankPositionOnBoard: Position;


  constructor(
    tankData: TanksDataInterface,
    tankPosition: Position,
    tankPositionOnBoard: Position
  ) {
    super();
    this.setupTankData(tankData);
    this.setupBulletData(tankData);
    this.setPosition(tankPosition);
    this.setTankPositionOnBoard(tankPositionOnBoard);
    this.tankSprite = this.createTankSprite();
  }

  setupBulletData(tankData: TanksDataInterface) {
    this.BULLET_DATA = {
      numberOfBullets: tankData.numberOfBullets,
      damage: tankData.damage
    }
  }

  setupTankData(tankData: TanksDataInterface) {
    this.TYPE = tankData.type;
    this.setRotationKey(tankData.rotationKey)
  }

  createTankSprite() {
    let tankSprite = PIXI.Sprite.from(`images/board/tank_${this.TYPE}.png`);
    tankSprite.anchor.set(0.5);
    return this.addChild(tankSprite);
  }

  setTankRotation(rotation, rotationKey) {
    this.setRotationKey(rotationKey);
    this.tankSprite.rotation = rotation;
  }

  setRotationKey(rotationKey: string) {
    this.rotationKey = rotationKey;
  }

  getRotationKey() {
    return this.rotationKey;
  }

  getRotation() {
    return this.tankSprite.rotation;
  }

  setTankPositionOnBoard(tankPositionOnBoard: Position) {
    this.tankPositionOnBoard = tankPositionOnBoard;
  }

  getTankPositionOnBoard() {
    return this.tankPositionOnBoard;
  }

  setPosition(tankPosition) {
    this.position = tankPosition;
  }

  getBulletData() {
    return this.BULLET_DATA;
  }

}
