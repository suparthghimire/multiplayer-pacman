import { SCALE } from "./../utils/utils";
import p5Types from "p5";
export default class Wall {
  public static draw(p5: p5Types, position: p5Types.Vector) {
    p5.fill("white");
    p5.rect(position.x * SCALE, position.y * SCALE, SCALE, SCALE);
  }
}
