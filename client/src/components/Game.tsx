import Sketch from "react-p5";
import p5Types from "p5";
import { useState } from "react";
import Pacman from "../logic/Pacman";
import Map from "../logic/Map";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Game() {
  const [pacman, setPacman] = useState<Pacman>();
  const [pacmanWon, setPacmanWon] = useState<boolean>(false);
  const [mapState, setMapState] = useState<Map>();
  const { GetItem } = useLocalStorage();

  function setup(p5: p5Types, canvasParentRef: Element) {
    p5.createCanvas(700, 700).parent(canvasParentRef);
    p5.background("black");
    p5.frameRate(10);

    let loadMap: number[][] | undefined = undefined;
    const mapString = GetItem("map");
    if (mapString) loadMap = JSON.parse(mapString);

    const map = new Map(p5, loadMap);

    setMapState(map);
    setPacman(new Pacman(p5.createVector(map.pacmanPos.x, map.pacmanPos.y)));
  }

  function draw(p5: p5Types) {
    p5.background("black");
    p5.fill(255);
    if (pacman && mapState) {
      pacman.draw(p5);
      mapState.draw(p5);
      pacman.update(p5, mapState.cells, mapState.foodCount);

      if (mapState.foodCount === 0) {
        setPacmanWon(true);
        return;
      }
    }
  }
  function keyPressed(p5: p5Types) {
    if (pacmanWon) return;
    if (pacman) {
      const keyCode = p5.keyCode;
      switch (keyCode) {
        case p5.UP_ARROW:
          pacman.direction(p5.createVector(0, -1));
          break;
        case p5.DOWN_ARROW:
          pacman.direction(p5.createVector(0, 1));
          break;
        case p5.LEFT_ARROW:
          pacman.direction(p5.createVector(-1, 0));
          break;
        case p5.RIGHT_ARROW:
          pacman.direction(p5.createVector(1, 0));
          break;
        default:
          break;
      }
    }
  }

  return (
    <div>
      Status: {pacmanWon ? "Pacman won!" : "Playing"}
      <Sketch draw={draw} setup={setup} keyPressed={keyPressed} />
    </div>
  );
}
