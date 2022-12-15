import { useEffect, useRef } from "react";
import CellFactory from "../model/Factory/CellFactory";
import Game from "../model/Game";
import { MAP_CELL } from "../model/utils/utils";
import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense

export default function Canvas({ game }: { game: Game }) {
  function setup(p5: p5Types, canvasParentRef: Element) {
    p5.createCanvas(game.width, game.height).parent(canvasParentRef);
    // ser canvas border
    p5.background("black");
  }
  function draw(p5: p5Types) {
    for (let i = 0; i < game.map.cellsInX; i++) {
      for (let j = 0; j < game.map.cellsInY; j++) {
        const cell = CellFactory.Create(
          i,
          j,
          game.map.cells[i][j],
          game.cell_size,
          game.width,
          game.height
        );
        cell.draw(game.map.cells, p5);
      }
    }
  }

  return <Sketch setup={setup} draw={draw} />;
}
