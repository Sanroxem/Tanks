import * as PIXI from "pixi.js";

export default class BoardGrid extends PIXI.Container {
  hasTank: boolean;
  gridImage: PIXI.Sprite;
  backgroundImage: PIXI.Sprite;

  SOLID: boolean;
  DESTRUCTIBLE: boolean;
  HP: number;

  constructor(gridData) {
    super();
    this.setupGrid(gridData);
  }

  setupGrid(gridData) {
    this.backgroundImage = this.createGridImage("empty")
    if (gridData.type !== "empty") {
      this.gridImage = this.createGridImage(gridData.type);
    }
    this.setHP(gridData.hp)
    this.setDestructible(gridData.destructible);
    this.setSolid(gridData.solid);
    this.setHasTank(gridData.hasTank);
  }

  setHasTank(hasTank) {
    this.hasTank = hasTank;
  }

  getHasTank() {
    return this.hasTank;
  }

  setAsEmptySpace() {
    this.removeChild(this.gridImage);
    this.gridImage = null;
    this.setSolid(false);
    this.setDestructible(false);
  }

  setAsTankGrid() {
    this.setHasTank(true);
    this.setSolid(true);
  }

  setAsTankLeftGrid() {
    this.setHasTank(false);
    this.setSolid(false);
  }

  isSolid() {
    return this.SOLID;
  }

  setSolid(isSolid) {
    return this.SOLID = isSolid;
  }

  isDestructible() {
    return this.DESTRUCTIBLE;
  }

  setDestructible(isDestructible) {
    return this.DESTRUCTIBLE = isDestructible;
  }

  createGridImage(type) {
    let gridImage = PIXI.Sprite.from(`images/board/${type}.png`);
    gridImage.anchor.set(0.5);
    return this.addChild(gridImage);
  }

  getHP() {
    return this.HP;
  }

  setHP(hp) {
    this.HP = hp;
  }

  dealDamage(damage) {
    this.setHP(this.getHP() - damage);

    let damageLeftInBullet = 0;
    let isDestroyed = this.getHP() <= 0;

    if (isDestroyed) {
      this.setAsEmptySpace();
      damageLeftInBullet = Math.abs(this.getHP());
    }
    //Console.log left for You for easier testing ;)
    console.log("HP left in Hay: ", this.getHP())
    return {isDestroyed: isDestroyed, damageLeftInBullet: damageLeftInBullet};
  }

}
