//Game config for easier game setup and future extensibility
import {TANK_TYPES, TANK_DIRECTIONS} from "../model/Texts";

export interface GridDataInterface {
  destructible: boolean;
  solid: boolean;
  type: string;
  hasTank: boolean;
  hp?: number;
}

export interface GridTypeInterface {
  type: string;
  amount: number;
}

export interface TanksDataInterface {
  type: string;
  damage: number;
  numberOfBullets: number;
  rotationKey: string
}

export interface BoardDataInterface {
  columns: number;
  rows: number;
  gridTypes: Array<GridTypeInterface>;
}

interface gridSizeInterface {
  x: number;
  y: number;
}

export const BOARD_DATA: BoardDataInterface = {
  columns: 25,
  rows: 25,
  gridTypes: [
    {type: "hay", amount: 25},
    {type: "wall", amount: 50},
    {type: "tank", amount: 3}
  ]
}

export const GRID_TYPE_DATA = new Map();
GRID_TYPE_DATA.set("hay", {destructible: true, solid: true, type: "hay", hasTank: false, hp: 100});
GRID_TYPE_DATA.set("wall", {destructible: false, solid: true, type: "wall", hasTank: false});
GRID_TYPE_DATA.set("empty", {destructible: false, solid: false, type: "empty", hasTank: false});
GRID_TYPE_DATA.set("tank", {destructible: false, solid: true, type: "empty", hasTank: true});

export const TANKS_DATA: Array<TanksDataInterface> = [{
  type: TANK_TYPES.RED,
  damage: 10,
  numberOfBullets: 2,
  rotationKey: TANK_DIRECTIONS.UP
}, {
  type: TANK_TYPES.BLUE,
  damage: 20,
  numberOfBullets: 3,
  rotationKey: TANK_DIRECTIONS.UP
}, {
  type: TANK_TYPES.GREEN,
  damage: 25,
  numberOfBullets: 1,
  rotationKey: TANK_DIRECTIONS.UP

}];

export const BULLET_SPEED = 40;
export const MOVEMENT_SPEED = 130;
export const GRID_SIZE: gridSizeInterface = {x: 35, y: 35};


