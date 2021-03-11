"use strict";
exports.__esModule = true;
exports.GRID_SIZE = exports.MOVEMENT_SPEED = exports.BULLET_SPEED = exports.TANKS_DATA = exports.GRID_TYPE_DATA = exports.BOARD_DATA = void 0;
//Game config for easier game setup and future extensibility
var Texts_1 = require("../model/Texts");
exports.BOARD_DATA = {
    columns: 50,
    rows: 50,
    gridTypes: [
        { type: "hay", amount: 25 },
        { type: "wall", amount: 50 },
        { type: "tank", amount: 3 }
    ]
};
exports.GRID_TYPE_DATA = new Map();
exports.GRID_TYPE_DATA.set("hay", { destructible: true, solid: true, type: "hay", hasTank: false, hp: 100 });
exports.GRID_TYPE_DATA.set("wall", { destructible: false, solid: true, type: "wall", hasTank: false });
exports.GRID_TYPE_DATA.set("empty", { destructible: false, solid: false, type: "empty", hasTank: false });
exports.GRID_TYPE_DATA.set("tank", { destructible: false, solid: true, type: "empty", hasTank: true });
exports.TANKS_DATA = [{
        type: Texts_1.TANK_TYPES.RED,
        damage: 10,
        numberOfBullets: 2
    }, {
        type: Texts_1.TANK_TYPES.BLUE,
        damage: 20,
        numberOfBullets: 3
    }, {
        type: Texts_1.TANK_TYPES.GREEN,
        damage: 25,
        numberOfBullets: 1
    }];
exports.BULLET_SPEED = 40;
exports.MOVEMENT_SPEED = 130;
exports.GRID_SIZE = { x: 35, y: 35 };
