import Sketch from "react-p5";
import p5Types from "p5";
import { useState } from "react";
import Pacman from "./logic/Pacman";
import Map from "./logic/Map";
function App() {
  const [pacman, setPacman] = useState<Pacman>();
  const [map, setMap] = useState<Map>();

  function setup(p5: p5Types, canvasParentRef: Element) {
    p5.createCanvas(700, 700).parent(canvasParentRef);
    p5.background("black");
    p5.frameRate(24);
    setPacman(new Pacman(p5.createVector(0, 0)));
    setMap(new Map(p5));
  }

  function draw(p5: p5Types) {
    p5.background("black");
    p5.fill(255);
    if (pacman && map) {
      pacman.draw(p5);
      map.draw(p5);
      pacman.update(p5, map.cells);
    }
  }
  function keyPressed(p5: p5Types) {
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
  return <Sketch draw={draw} setup={setup} keyPressed={keyPressed} />;
}

export default App;
