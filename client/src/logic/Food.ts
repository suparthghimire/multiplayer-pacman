import p5Types from "p5";
import { SCALE } from "../utils/utils";
export default class Food {
  constructor(private m_position: p5Types.Vector) {}
  public static draw(p5: p5Types, position: p5Types.Vector) {
    p5.fill("yellow");
    p5.noStroke();
    const centerX = position.x * SCALE + SCALE / 2;
    const centerY = position.y * SCALE + SCALE / 2;
    p5.circle(centerX, centerY, SCALE / 4);
  }
  get position() {
    return this.m_position;
  }
}
