import {shuffleArray} from "../../utils/ArrayUtil";
import {BOARD_DATA, GRID_TYPE_DATA, GridTypeInterface, GridDataInterface} from "../GameConfig";


export default class BoardModel {
  ELEMENTS_AMOUNT: Array<GridTypeInterface>;

  constructor() {
    this.ELEMENTS_AMOUNT = this.createElementsAmountData();
  }

  createElementsAmountData() {
    let elementsAmount = [];
    BOARD_DATA.gridTypes.forEach((gridType) => elementsAmount.push(gridType))
    return elementsAmount;
  }

  getRandomBoardGridData() {
    return this.generateRandomBoardGridArray();
  }

  generateRandomBoardGridArray() {
    let randomBoardGridArray: Array<GridDataInterface> = [];
    let totalGrids = BOARD_DATA.columns * BOARD_DATA.rows;
    let emptySpaces: number;
    for (let i = 0; i < BOARD_DATA.gridTypes.length; i++) {
      for (let j = 0; j < BOARD_DATA.gridTypes[i].amount; j++) {
        randomBoardGridArray.push(this.getGridData(BOARD_DATA.gridTypes[i].type));
      }
    }

    emptySpaces = totalGrids - randomBoardGridArray.length
    for (let i = 0; i < emptySpaces; i++) {
      randomBoardGridArray.push(this.getGridData("empty"));
    }

    return shuffleArray(randomBoardGridArray);
  }

  getGridData(type): GridDataInterface {
    return GRID_TYPE_DATA.get(type);
  }

  getElementsAmount() {
    return this.ELEMENTS_AMOUNT;
  }

  getBoardBounds() {
    return {x: BOARD_DATA.columns, y: BOARD_DATA.rows};
  }

}
