import Sketch from "react-p5";
import p5Types from "p5";
import { useState } from "react";
import Pacman from "./logic/Pacman";
import Wall from "./logic/Wall";
import { SCALE } from "./utils/utils";
function App() {
  const [pacman, setPacman] = useState<Pacman>();
  const [walls, setWalls] = useState<Wall[]>([]);

  function setup(p5: p5Types, canvasParentRef: Element) {
    p5.createCanvas(700, 700).parent(canvasParentRef);
    p5.background("black");
    p5.frameRate(10);
    setPacman(new Pacman(p5.createVector(10, 10)));

    Array(10)
      .fill(null)
      .forEach((_, idx) => {
        const wall = new Wall(
          p5.createVector(idx * SCALE, Math.floor(p5.width / 2))
        );
        setWalls((walls) => [...walls, wall]);
      });
  }

  function draw(p5: p5Types) {
    p5.background("black");
    p5.fill(255);
    if (pacman) {
      pacman.draw(p5);
      pacman.update(p5);
    }
    walls.forEach((wall) => wall.draw(p5));
  }
  function keyPressed(p5: p5Types) {
    if (pacman) {
      console.log("PACMAN");
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
