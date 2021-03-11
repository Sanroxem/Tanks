import * as PIXI from "pixi.js";
import GameBoard from "./GameBoard";

export default class Root {
  app: PIXI.Application;
  stage: PIXI.Container;
  gameBoard: GameBoard;

  constructor() {
    this.app = this.createApplication();
    this.stage = this.app.stage;

    this.gameBoard = this.createGameBoard();
  }

  createApplication() {
    let app = new PIXI.Application(this.getApplicationSettings());
    app.view.id = "game-canvas";
    document.body.appendChild(app.view);
    return app;
  }

  getApplicationSettings() {
    return {
      autoResize: true,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  createGameBoard() {
    let gameBoard = new GameBoard();
    return this.stage.addChild(gameBoard);
  }

  resizeApp() {
    this.app.renderer.resize(window.innerWidth, window.innerHeight);
  }
}
