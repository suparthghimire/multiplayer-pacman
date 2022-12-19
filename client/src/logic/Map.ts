import { CELL_CONTENT, SCALE } from "./../utils/utils";
import p5Types from "p5";
import Wall from "./Wall";
import Food from "./Food";
import Cell from "./Cell";

export default class Map {
  private m_cells: Cell[][] = [];
  private m_foods: Food[] = [];

  private m_walls: Wall[] = [];
  private m_width: number;
  private m_height: number;
  constructor(p5: p5Types) {
    this.create(p5);
    this.m_width = p5.width / SCALE;
    this.m_height = p5.height / SCALE;
  }
  private create(p5: p5Types) {
    this.generateMap(p5);
  }
  private generateMap(p5: p5Types) {
    const XLEN = p5.width / SCALE;
    const YLEN = p5.height / SCALE;
    for (let i = 0; i < XLEN; i++) {
      const cells = [];
      for (let j = 0; j < YLEN; j++) {
        if (Math.random() < 0.1) {
          cells.push(new Cell(CELL_CONTENT.WALL, p5.createVector(i, j)));
        } else {
          cells.push(new Cell(CELL_CONTENT.FOOD, p5.createVector(i, j)));
        }
      }
      this.m_cells.push(cells);
    }
    // get random position for pacman
    const pacmanPosition = p5.createVector(
      Math.floor(Math.random() * XLEN),
      Math.floor(Math.random() * YLEN)
    );
    // replace cell value in this.cells with pacman
    this.m_cells[pacmanPosition.x][pacmanPosition.y] = new Cell(
      CELL_CONTENT.PACMAN,
      pacmanPosition
    );
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
        this.m_cells[i][j].draw(p5);
      }
    }
  }

  // getters
  get cells() {
    return this.m_cells;
  }
}
