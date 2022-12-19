import p5Types from "p5";
import { CELL_CONTENT } from "../utils/utils";
import Wall from "./Wall";
import Food from "./Food";

export default class Cell {
  constructor(
    private m_content: CELL_CONTENT,
    private m_location: p5Types.Vector
  ) {}
  public draw(p5: p5Types) {
    switch (this.m_content) {
      case CELL_CONTENT.FOOD:
        Food.draw(p5, this.m_location);
        break;
      case CELL_CONTENT.WALL:
        Wall.draw(p5, this.m_location);
        break;
      case CELL_CONTENT.PACMAN:
        // p5.fill(255, 255, 0);
        // p5.circle(this.m_location.x + 10, this.m_location.y + 10, 20);
        break;
    }
  }
  get content() {
    return this.m_content;
  }
}
