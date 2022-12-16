import { SCALE } from "./../utils/utils";
import p5Types from "p5";
import Wall from "./Wall";

export default class Map {
  private m_walls: Wall[] = [];
  constructor(p5: p5Types) {
    this.Generate(p5);
  }
  private Generate(p5: p5Types) {
    const XLEN = p5.width / SCALE;
    const YLEN = p5.height / SCALE;
    for (let i = 0; i < XLEN; i++) {
      for (let j = 0; j < YLEN; j++) {
        if (Math.random() < 0.1) {
          this.m_walls.push(
            new Wall(
              p5.createVector(Math.floor(i * SCALE), Math.floor(j * SCALE))
            )
          );
        }
      }
    }
  }

  public draw(p5: p5Types) {
    const XLEN = p5.width / SCALE;
    const YLEN = p5.height / SCALE;

    for (let i = 0; i < XLEN; i++) {
      for (let j = 0; j < YLEN; j++) {
        p5.stroke("#2a2a2a");
        p5.strokeWeight(1);
        p5.noFill();
        p5.rect(Math.floor(i * SCALE), Math.floor(j * SCALE), SCALE, SCALE);
      }
    }

    this.m_walls.forEach((wall) => {
      wall.draw(p5);
    });
  }
  get walls() {
    return this.m_walls;
  }
}
