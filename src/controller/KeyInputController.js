"use strict";
exports.__esModule = true;
var main_1 = require("../main");
var GameConfig_1 = require("../model/GameConfig");
var Texts_1 = require("../model/Texts");
var KeyInputController = /** @class */ (function () {
    function KeyInputController() {
        this.keyIsDown = false;
        document.addEventListener("keydown", this.onKeyDown.bind(this));
        document.addEventListener("keyup", this.onKeyUp.bind(this));
    }
    KeyInputController.prototype.onKeyDown = function (event) {
        if (this.keyIsDown)
            return;
        this.keyIsDown = true;
        switch (event.key) {
            case "ArrowLeft":
                this.currentKeyDown = event.key;
                this.emitKeyDown(Texts_1.EMITTER_KEYS.MOVE_OR_ROTATE_TANK, Texts_1.TANK_DIRECTIONS.LEFT);
                this.emitInterval = setInterval(this.emitKeyDown.bind(this), GameConfig_1.MOVEMENT_SPEED, Texts_1.EMITTER_KEYS.MOVE_OR_ROTATE_TANK, Texts_1.TANK_DIRECTIONS.LEFT);
                break;
            case "ArrowUp":
                this.currentKeyDown = event.key;
                this.emitKeyDown(Texts_1.EMITTER_KEYS.MOVE_OR_ROTATE_TANK, Texts_1.TANK_DIRECTIONS.UP);
                this.emitInterval = setInterval(this.emitKeyDown.bind(this), GameConfig_1.MOVEMENT_SPEED, Texts_1.EMITTER_KEYS.MOVE_OR_ROTATE_TANK, Texts_1.TANK_DIRECTIONS.UP);
                break;
            case "ArrowRight":
                this.currentKeyDown = event.key;
                this.emitKeyDown(Texts_1.EMITTER_KEYS.MOVE_OR_ROTATE_TANK, Texts_1.TANK_DIRECTIONS.RIGHT);
                this.emitInterval = setInterval(this.emitKeyDown.bind(this), GameConfig_1.MOVEMENT_SPEED, Texts_1.EMITTER_KEYS.MOVE_OR_ROTATE_TANK, Texts_1.TANK_DIRECTIONS.RIGHT);
                break;
            case "ArrowDown":
                this.currentKeyDown = event.key;
                this.emitKeyDown(Texts_1.EMITTER_KEYS.MOVE_OR_ROTATE_TANK, Texts_1.TANK_DIRECTIONS.DOWN);
                this.emitInterval = setInterval(this.emitKeyDown.bind(this), GameConfig_1.MOVEMENT_SPEED, Texts_1.EMITTER_KEYS.MOVE_OR_ROTATE_TANK, Texts_1.TANK_DIRECTIONS.DOWN);
                break;
            case "t":
                this.currentKeyDown = event.key;
                this.emitKeyDown(Texts_1.EMITTER_KEYS.CHANGE_TANK);
                break;
            case " ":
                this.currentKeyDown = event.key;
                this.emitKeyDown(Texts_1.EMITTER_KEYS.SHOOT_CANNONS);
                break;
            default:
                this.keyIsDown = false;
        }
    };
    KeyInputController.prototype.onKeyUp = function (event) {
        if (event.key !== this.currentKeyDown)
            return;
        this.currentKeyDown = null;
        this.keyIsDown = false;
        clearInterval(this.emitInterval);
    };
    KeyInputController.prototype.emitKeyDown = function (key, value) {
        main_1.emitter.emit(key, value);
    };
    return KeyInputController;
}());
exports["default"] = KeyInputController;
