import p5Types from "p5"; //Import this for typechecking and intellisense
import { MAP_CELL } from "../utils/utils";

export default class Cell {
  constructor(
    private m_x: number,
    private m_y: number,
    private m_content_type: MAP_CELL,
    private m_cell_size: number,
    private m_width: number,
    private m_height: number
  ) {}
  public draw(cells: number[][], p5: p5Types) {
    const x = this.m_x * this.m_cell_size;
    const y = this.m_y * this.m_cell_size;

    // p5.noFill();
    // p5.stroke("#2a2a2a");
    // p5.rect(x, y, this.m_cell_size, this.m_cell_size);

    const centerX = x + this.m_cell_size / 2;
    const centerY = y + this.m_cell_size / 2;

    if (this.m_content_type === MAP_CELL.WALL) {
      p5.stroke("white");
      // p5.noStroke();
      p5.strokeWeight(4);
      p5.fill("white");
      p5.strokeCap(p5.ROUND);
      p5.rect(x, y, this.m_cell_size, this.m_cell_size);
      // p5.circle(centerX, centerY, this.m_cell_size / 4);
      // this.drawWallNeighbours(cells, p5, centerX, centerY);
    } else if (this.m_content_type === MAP_CELL.FOOD) {
      // p5.fill("pink");
      // p5.noStroke();
      // p5.circle(centerX, centerY, this.m_cell_size / 8);
    } else if (this.m_content_type === MAP_CELL.PACMAN) {
      p5.fill("yellow");
      p5.noStroke();
      p5.circle(centerX, centerY, this.m_cell_size / 2);
    }
  }
  private m_getNeighbours() {
    type Location = {
      i: number;
      j: number;
    };
    let left: Location | null = {
      i: this.m_x - 1,
      j: this.m_y,
    };
    let right: Location | null = {
      i: this.m_x + 1,
      j: this.m_y,
    };
    let top: Location | null = {
      i: this.m_x,
      j: this.m_y - 1,
    };
    let bottom: Location | null = {
      i: this.m_x,
      j: this.m_y + 1,
    };

    //   check for out of bounds
    if (left.i < 0) left = null;
    if (right.i >= this.m_width) right = null;
    if (top.j < 0) top = null;
    if (bottom.j >= this.m_height) bottom = null;

    return {
      left,
      right,
      top,
      bottom,
    };
  }
  private drawWallNeighbours(
    cells: number[][],
    p5: p5Types,
    x: number,
    y: number
  ) {
    function draw(fx: number, fy: number, tx: number, ty: number) {
      p5.stroke("white");
      p5.strokeWeight(20);
      p5.strokeCap(p5.SQUARE);
      p5.line(fx, fy, tx, ty);
      p5.strokeWeight(1);
    }

    const neighbours = this.m_getNeighbours();
    const { left, top } = neighbours;
    if (left && cells[left.i][left.j] === MAP_CELL.WALL) {
      const leftCenterX = left.i * this.m_cell_size + this.m_cell_size / 2;
      const leftCenterY = left.j * this.m_cell_size + this.m_cell_size / 2;
      draw(x, y, leftCenterX, leftCenterY);
    }
    if (top && cells[top.i][top.j] === MAP_CELL.WALL) {
      const topCenterX = top.i * this.m_cell_size + this.m_cell_size / 2;
      const topCenterY = top.j * this.m_cell_size + this.m_cell_size / 2;
      draw(x, y, topCenterX, topCenterY);
    }
  }
}
