import Root from "./view/Root";
import TankController from "./controller/TankController";
import BoardModel from "./model/board/BoardModel";
import TanksModel from "./model/tanks/TanksModel";
import GameResizer from "./controller/GameResizer";
import KeyInputController from "./controller/KeyInputController";
import {EventEmitter} from "@pixi/utils";

export let emitter = new EventEmitter();
export let boardModel = new BoardModel();
export let tanksModel = new TanksModel();

export let root = new Root();

startUp();

function startUp() {
  new GameResizer();
  new TankController();
  new KeyInputController();
}
