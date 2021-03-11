import { emitter } from "../main";
import {MOVEMENT_SPEED} from "../model/GameConfig";
import {EMITTER_KEYS, TANK_DIRECTIONS} from "../model/Texts";

export default class KeyInputController {
  keyIsDown: boolean;
  emitInterval: NodeJS.Timeout;
  currentKeyDown: string;

  constructor() {
    this.keyIsDown = false;
    document.addEventListener("keydown", this.onKeyDown.bind(this));
    document.addEventListener("keyup", this.onKeyUp.bind(this));
  }

  onKeyDown(event) {
    if (this.keyIsDown) return;
    this.keyIsDown = true;
    switch (event.key) {
      case "ArrowLeft":
        this.currentKeyDown = event.key;
        this.emitKeyDown(EMITTER_KEYS.MOVE_OR_ROTATE_TANK, TANK_DIRECTIONS.LEFT);
        this.emitInterval = setInterval(this.emitKeyDown.bind(this), MOVEMENT_SPEED, EMITTER_KEYS.MOVE_OR_ROTATE_TANK, TANK_DIRECTIONS.LEFT)
        break;
      case "ArrowUp":
        this.currentKeyDown = event.key;
        this.emitKeyDown(EMITTER_KEYS.MOVE_OR_ROTATE_TANK, TANK_DIRECTIONS.UP);
        this.emitInterval = setInterval(this.emitKeyDown.bind(this), MOVEMENT_SPEED, EMITTER_KEYS.MOVE_OR_ROTATE_TANK, TANK_DIRECTIONS.UP);
        break;
      case "ArrowRight":
        this.currentKeyDown = event.key;
        this.emitKeyDown(EMITTER_KEYS.MOVE_OR_ROTATE_TANK, TANK_DIRECTIONS.RIGHT);
        this.emitInterval = setInterval(this.emitKeyDown.bind(this), MOVEMENT_SPEED, EMITTER_KEYS.MOVE_OR_ROTATE_TANK, TANK_DIRECTIONS.RIGHT);
        break;
      case "ArrowDown":
        this.currentKeyDown = event.key;
        this.emitKeyDown(EMITTER_KEYS.MOVE_OR_ROTATE_TANK, TANK_DIRECTIONS.DOWN);
        this.emitInterval = setInterval(this.emitKeyDown.bind(this), MOVEMENT_SPEED, EMITTER_KEYS.MOVE_OR_ROTATE_TANK, TANK_DIRECTIONS.DOWN);
        break;
      case "t":
        this.currentKeyDown = event.key;
        this.emitKeyDown(EMITTER_KEYS.CHANGE_TANK);
        break;
      case " ":
        this.currentKeyDown = event.key;
        this.emitKeyDown(EMITTER_KEYS.SHOOT_CANNONS);
        break;
      default:
        this.keyIsDown = false;
    }
  }

  onKeyUp(event) {
    if(event.key !== this.currentKeyDown) return;
    this.currentKeyDown = null;
    this.keyIsDown = false;
    clearInterval(this.emitInterval);
  }

  emitKeyDown(key: string, value?: string){
    emitter.emit(key, value);
  }
}
