import * as PIXI from "pixi.js";
import Tank, {TanksDataInterface, BulletSDataInterface} from "./Tank";
import Bullet from "./Bullet";
import BoardGrid from "./BoardGrid";
import {GRID_SIZE} from "../model/GameConfig";
import {boardModel, tanksModel} from "../main";
import {Position} from "~model/Position";

export default class GameBoard extends PIXI.Container {
  environmentLayer: PIXI.Container;
  activeElementsLayer: PIXI.Container;
  gameGrid: Array<Array<BoardGrid>>;
  tanks: Array<Tank>;
  tanksPositions: Array<Position>;

  constructor() {
    super();
    this.environmentLayer = this.addChild(new PIXI.Container());
    this.activeElementsLayer = this.addChild(new PIXI.Container());
    this.gameGrid = this.createRandomGridSpace();
    this.tanks = this.createTanks();
  }

  createBullet(positionOnBoard: Position, bulletData: BulletSDataInterface) {
    let bulletPosition = this.gameGrid[positionOnBoard.x][positionOnBoard.y];
    let bullet = new Bullet(bulletPosition, positionOnBoard, bulletData);
    return this.activeElementsLayer.addChild(bullet);
  }

  createTanks() {
    let tanks: Array<Tank> = [];
    let tanksData = tanksModel.getTanksData();

    tanksData.forEach((data, i) => tanks.push(this.createTank(data, i)));
    return tanks;
  }

  createTank(data: TanksDataInterface, i: number) {
    let tankPosition = this.gameGrid[this.tanksPositions[i].x][
      this.tanksPositions[i].y
      ].position;
    let tank = new Tank(data, tankPosition, this.tanksPositions[i]);
    return this.activeElementsLayer.addChild(tank);
  }

  createRandomGridSpace() {
    let gridTypes = boardModel.getRandomBoardGridData();
    let boardBounds = boardModel.getBoardBounds();
    this.tanksPositions = [];

    let gridY = [];
    let gridData;
    for (let x = 0; x < boardBounds.x; x++) {
      let gridX = [];
      for (let y = 0; y < boardBounds.y; y++) {
        gridData = gridTypes.pop();
        gridX.push(this.createBoardGrid(x, y, gridData));
        if (gridData.hasTank) {
          this.tanksPositions.push({x, y});
        }
      }
      gridY.push(gridX);
    }
    return gridY;
  }

  createBoardGrid(x: number, y: number, gridData) {
    let boardGrid = new BoardGrid(gridData);
    boardGrid.position.set(x * GRID_SIZE.x, y * GRID_SIZE.y);
    return this.environmentLayer.addChild(boardGrid);
  }
}
