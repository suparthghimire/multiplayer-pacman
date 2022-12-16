import { SCALE } from "./../utils/utils";
import p5Types from "p5";
export default class Wall {
  constructor(private m_position: p5Types.Vector) {}
  public draw(p5: p5Types) {
    p5.fill("white");
    p5.noStroke();
    p5.rect(this.m_position.x, this.m_position.y, SCALE, SCALE);
  }
}
