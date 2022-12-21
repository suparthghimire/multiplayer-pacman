import p5Types from "p5";
import Helper from "../utils/helpers";
import { CELL_CONTENT, SCALE } from "../utils/utils";
import Cell from "./Cell";
export default class Pacman {
  private m_speed = {
    x: 0,
    y: 0,
  };
  constructor(private m_position: p5Types.Vector) {}

  public direction(position: p5Types.Vector) {
    this.m_speed.x = position.x;
    this.m_speed.y = position.y;
  }
  public draw(p5: p5Types) {
    p5.fill(255, 255, 0);
    p5.circle(
      this.m_position.x + SCALE / 2,
      this.m_position.y + SCALE / 2,
      SCALE
    );
  }
  public update(p5: p5Types, cells: Cell[][], foodCount: number) {
    const newPositionX = this.m_position.x + this.m_speed.x * SCALE;
    const newPositionY = this.m_position.y + this.m_speed.y * SCALE;

    const cellX = Math.floor(newPositionX / SCALE);
    const cellY = Math.floor(newPositionY / SCALE);

    const maxCellX = Math.floor(p5.width / SCALE) - 1;
    const maxCellY = Math.floor(p5.height / SCALE) - 1;
    const minCellX = 0;
    const minCellY = 0;

    if (
      cellX >= minCellX &&
      cellX <= maxCellX &&
      cellY >= minCellY &&
      cellY <= maxCellY
    ) {
      if (cells[cellX][cellY].content === CELL_CONTENT.WALL) {
        return;
      }
    }

    this.m_position.x += this.m_speed.x * SCALE;
    this.m_position.y += this.m_speed.y * SCALE;
    this.m_position.x = Helper.Mod(Math.floor(this.m_position.x), p5.width);
    this.m_position.y = Helper.Mod(Math.floor(this.m_position.y), p5.height);

    this.eat(cells, foodCount);
  }
  public eat(cells: Cell[][], foodCount: number) {
    const cellX = Math.floor(this.m_position.x / SCALE);
    const cellY = Math.floor(this.m_position.y / SCALE);
    if (cells[cellX][cellY].content === CELL_CONTENT.FOOD) {
      cells[cellX][cellY].content = CELL_CONTENT.EMPTY;
    }
  }
}
