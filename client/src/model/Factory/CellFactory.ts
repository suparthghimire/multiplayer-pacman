import { MAP_CELL } from "./../utils/utils";
import Cell from "../Cell/Cell";
import Map from "../Map/Map";

export default class CellFactory {
  public static Create(
    x: number,
    y: number,
    content: MAP_CELL,
    cellSize: number,
    width: number,
    height: number
  ) {
    return new Cell(x, y, content, cellSize, width, height);
  }
  public static Convert2DIdxTo1D(i: number, j: number, width: number) {
    return j * width + i;
  }
  public static Convert1DIdxTo2D(idx: number, width: number) {
    return {
      i: idx % width,
      j: Math.floor(idx / width),
    };
  }
  public static GetNeighbours(currIdx: number, width: number, height: number) {
    const left = CellFactory.Convert1DIdxTo2D(currIdx - 1, width);
    const right = CellFactory.Convert1DIdxTo2D(currIdx + 1, width);
    const top = CellFactory.Convert1DIdxTo2D(currIdx - width, width);
    const bottom = CellFactory.Convert1DIdxTo2D(currIdx + width, width);

    return {
      left,
      right,
      top,
      bottom,
    };
  }
}
