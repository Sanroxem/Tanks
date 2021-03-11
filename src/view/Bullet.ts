import * as PIXI from "pixi.js";
import {Position} from "~model/Position";
import {BulletSDataInterface} from "~view/Tank";

export default class Bullet extends PIXI.Container {
  bulletSprite: PIXI.Sprite;
  bulletPositionOnBoard: Position;
  bulletsData: Array<number>;

  constructor(bulletPosition: Position,
              bulletPositionOnBoard: Position,
              bulletData: BulletSDataInterface
  ) {
    super();
    this.setPosition(bulletPosition);
    this.setBulletPositionOnBoard(bulletPositionOnBoard);
    this.bulletsData = this.setBulletsData(bulletData);
    this.bulletSprite = this.createBulletSprite();
    this.bulletSprite.rotation = bulletData.rotation;
    this.visible = false;
  }

  setBulletsData(bulletData) {
    let bulletsData: Array<number> = [];
    for (let i = 0; i < bulletData.numberOfBullets; i++) {
      bulletsData.push(bulletData.damage);
    }

    return bulletsData;
  }

  createBulletSprite() {
    let bulletSprite = PIXI.Sprite.from(`images/board/bullet_${this.getBulletsData().length}.png`)
    bulletSprite.anchor.set(0.5);
    return this.addChild(bulletSprite);
  }

  updateBulletSprite() {
    this.bulletSprite.texture = PIXI.Texture.from(`images/board/bullet_${this.getBulletsData().length}.png`);
  }

  setBulletPositionOnBoard(bulletPositionOnBoard: Position) {
    this.bulletPositionOnBoard = bulletPositionOnBoard;
  }

  getBulletPositionOnBoard() {
    return this.bulletPositionOnBoard;
  }

  setPosition(tankPosition) {
    this.position = tankPosition;
  }

  getBulletsData() {
    return this.bulletsData;
  }

  updateBulletsCondition(bulletsData) {
    this.bulletsData = bulletsData;
    this.updateBulletSprite();
  }

  erase() {
    this.removeChildren();
    this.parent.removeChild(this);
  }

  makeVisible() {
    this.visible = true;
  }

}
