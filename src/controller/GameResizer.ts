import {root} from "../main";

export default class GameResizer {
  constructor() {
    window.onresize = this.resizeRoot;
    this.resizeRoot();
  }

  resizeRoot() {
    let offset = 70;
    let scale = Math.min(window.innerWidth / (root.gameBoard.width + offset), window.innerHeight / (root.gameBoard.height + offset))
    root.resizeApp()
    root.stage.scale.set(scale)
    root.stage.x = window.innerWidth / 2 - (root.gameBoard.width / 2) * scale;
    root.stage.y = window.innerHeight  / 2 - (root.gameBoard.height / 2) * scale;
  }

}
