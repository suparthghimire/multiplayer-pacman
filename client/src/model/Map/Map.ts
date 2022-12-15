import CellFactory from "../Factory/CellFactory";
import Helper from "../utils/helpers";
import { MAP_CELL } from "./../utils/utils";
export default class Map {
  private m_cells: MAP_CELL[][];
  private m_cellsInX: number;
  private m_cellsInY: number;
  constructor(
    private m_width: number,
    private m_height: number,
    private m_cellSize: number
  ) {
    this.m_cellsInX = Math.floor(this.m_width / this.m_cellSize);
    this.m_cellsInY = Math.floor(this.m_height / this.m_cellSize);
    this.m_cells = [];

    for (let i = 0; i < this.cellsInX; i++) {
      let cells = [];
      for (let j = 0; j < this.cellsInY; j++) {
        cells.push(MAP_CELL.EMPTY);
      }
      this.m_cells.push(cells);
    }
  }

  public GenerateRandomMap() {
    // see if map is saved in localstorage
    // if yes, load it
    // if no, generate a new one

    const mapInLocalStorage = localStorage.getItem("mult_pac_game");
    if (mapInLocalStorage) {
      const game = JSON.parse(mapInLocalStorage);
      this.m_cells = game.cells;
      const playerLoc = game.playerLoc;
      this.m_cells[playerLoc.i][playerLoc.j] = MAP_CELL.PACMAN;

      return this.m_cells;
    }

    // generate random walls
    for (let i = 0; i < this.cellsInX; i++) {
      for (let j = 0; j < this.cellsInY; j++) {
        const randomValue = Helper.RandomRange(0, 2);
        this.m_cells[i][j] = randomValue;
      }
    }

    this.m_cells.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell === MAP_CELL.EMPTY) {
          this.m_cells[i][j] = MAP_CELL.FOOD;
        }
      });
    });

    // generate random location for player
    const playerLoc = Helper.RandomRange(0, this.cellsInX);
    const { i, j } = CellFactory.Convert1DIdxTo2D(playerLoc, this.cellsInX);
    this.m_cells[i][j] = MAP_CELL.PACMAN;

    localStorage.setItem(
      "mult_pac_game",
      JSON.stringify({
        cells: this.m_cells,
        playerLoc: {
          i,
          j,
        },
      })
    );
    return this.m_cells;
  }

  // setters

  get cells() {
    return this.m_cells;
  }
  get width() {
    return this.m_width;
  }
  get height() {
    return this.m_height;
  }
  get cell_size() {
    return this.m_cellSize;
  }
  get cellsInX() {
    return this.m_cellsInX;
  }
  get cellsInY() {
    return this.m_cellsInY;
  }
}
