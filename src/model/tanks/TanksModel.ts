import {TanksDataInterface, TANKS_DATA} from "../GameConfig"
import {TANK_DIRECTIONS} from "../Texts";

export default class TanksModel {
  TANKS_DATA: Array<TanksDataInterface>;
  TANK_ROTATIONS: Map<string, number>;
  currentTankIndex: number;

  constructor() {
    this.TANK_ROTATIONS = this.createTanksRotationData();
    this.currentTankIndex = 0;
  }

  createTanksRotationData() {
    let tankRotations = new Map();
    tankRotations.set(TANK_DIRECTIONS.UP, 0);
    tankRotations.set(TANK_DIRECTIONS.LEFT, 4.71);
    tankRotations.set(TANK_DIRECTIONS.RIGHT, 1.57);
    tankRotations.set(TANK_DIRECTIONS.DOWN, 3.14);
    return tankRotations;
  }

  getCurrentTankIndex() {
    return this.currentTankIndex;
  }

  switchCurrentTankIndex() {
    if (this.currentTankIndex === TANKS_DATA.length - 1) {
      this.currentTankIndex = 0;
    } else {
      this.currentTankIndex++;
    }
  }

  getTanksData() {
    return TANKS_DATA;
  }

  getTankRotation(key) {
    return this.TANK_ROTATIONS.get(key);
  }
}
