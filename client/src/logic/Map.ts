import { CELL_CONTENT, SCALE } from "./../utils/utils";
import p5Types from "p5";
import Wall from "./Wall";
import Food from "./Food";
import Cell from "./Cell";

export default class Map {
  private m_cells: Cell[][] = [];
  private m_foods: Food[] = [];
  private m_pacmanPos = { x: 0, y: 0 };

  private m_walls: Wall[] = [];
  private m_width: number;
  private m_height: number;
  constructor(p5: p5Types, mapData?: number[][]) {
    this.initializeCell(p5);
    this.create(p5, mapData);
    this.m_width = p5.width / SCALE;
    this.m_height = p5.height / SCALE;
  }
  private initializeCell(p5: p5Types) {
    const XLEN = p5.width / SCALE;
    const YLEN = p5.height / SCALE;
    for (let i = 0; i < XLEN; i++) {
      const cells = [];
      for (let j = 0; j < YLEN; j++) {
        cells.push(new Cell(CELL_CONTENT.EMPTY, p5.createVector(i, j)));
      }
      this.m_cells.push(cells);
    }
  }
  private create(p5: p5Types, mapData?: number[][]) {
    if (!mapData) this.generateMap(p5);
    else this.loadMap(p5, mapData);
  }
  private loadMap(p5: p5Types, map: number[][]) {
    this.m_cells = [];

    const XLEN = p5.width / SCALE;
    const YLEN = p5.height / SCALE;

    for (let i = 0; i < XLEN; i++) {
      const cells = [];
      for (let j = 0; j < YLEN; j++) {
        if (map.length > 0) {
          if (map[i][j] === CELL_CONTENT.WALL) {
            cells.push(new Cell(CELL_CONTENT.WALL, p5.createVector(i, j)));
          } else {
            cells.push(new Cell(CELL_CONTENT.FOOD, p5.createVector(i, j)));
          }
        } else {
          cells.push(new Cell(CELL_CONTENT.EMPTY, p5.createVector(i, j)));
        }
      }
      this.m_cells.push(cells);
    }

    if (map.length > 0) {
      const pacmanPosition = p5.createVector(1040, 2000);
      this.m_pacmanPos = pacmanPosition;
    } else {
      const pacmanPosition = p5.createVector(0, 0);
      this.m_pacmanPos = pacmanPosition;
    }
  }
  private generateMap(p5: p5Types) {
    console.log("GENERATE");
    const XLEN = p5.width / SCALE;
    const YLEN = p5.height / SCALE;
    this.m_cells = [];
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

    console.log(this.m_cells);
    // get random position for pacman
    const pacmanPosition = p5.createVector(1040, 2000);
    this.m_pacmanPos = pacmanPosition;
  }

  public setWall(
    p5: p5Types,
    location: { x: number; y: number },
    addWall: boolean = true
  ) {
    if (addWall) {
      this.m_cells[location.x][location.y] = new Cell(
        CELL_CONTENT.WALL,
        p5.createVector(location.x, location.y)
      );
    } else
      this.m_cells[location.x][location.y] = new Cell(
        CELL_CONTENT.EMPTY,
        p5.createVector(location.x, location.y)
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
  get code() {
    this.cells.forEach((row, rIdx) => {
      row.forEach((cell, cIdx) => {
        const content = cell.content;
      });
    });
    return "";
  }
  get content() {
    return this.m_cells.map((row) => row.map((cell) => cell.content));
  }

  get pacmanPos() {
    return this.m_pacmanPos;
  }
}
