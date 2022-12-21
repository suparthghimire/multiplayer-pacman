import Sketch from "react-p5";
import p5Types from "p5";
import { useEffect, useState } from "react";
import Pacman from "../logic/Pacman";
import Map from "../logic/Map";
import { CELL_CONTENT, SCALE } from "../utils/utils";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Editor() {
  const [map, setMap] = useState<Map>();
  const [pressedKey, setPressedKey] = useState<number>(0);

  const { GetItem, SetItem } = useLocalStorage();

  function setup(p5: p5Types, canvasParentRef: Element) {
    p5.createCanvas(700, 700).parent(canvasParentRef);
    p5.background("black");
    p5.frameRate(24);

    setMap(new Map(p5, []));
  }

  function draw(p5: p5Types) {
    p5.background("black");
    p5.fill(255);
    if (map) {
      map.draw(p5);
    }
  }

  function mouseClicked(p5: p5Types) {
    const x = Math.floor(p5.mouseX / SCALE);
    const y = Math.floor(p5.mouseY / SCALE);
    const MIN_X = 0;
    const MAX_X = Math.floor(p5.width / SCALE);
    const MIN_Y = 0;
    const MAX_Y = Math.floor(p5.height / SCALE);

    if (!(x >= MIN_X && x < MAX_X && y >= MIN_Y && y < MAX_Y)) return;
    if (map) {
      if (pressedKey !== p5.SHIFT) map.setWall(p5, { x, y }, true);
      else map.setWall(p5, { x, y }, false);
      // map.cellCo/de;
    }
  }

  return (
    <div>
      <button
        onClick={() => {
          if (map) {
            SetItem("map", map.content);
          }
        }}
      >
        Save Map
      </button>
      <Sketch
        draw={draw}
        setup={setup}
        mouseDragged={mouseClicked}
        mouseClicked={mouseClicked}
        keyReleased={() => setPressedKey(0)}
      />
    </div>
  );
}
