import Map from "./Map/Map";

export default class Game {
  private m_map: Map;
  constructor(
    private m_width: number,
    private m_height: number,
    private m_pacman_count: number,
    private m_ghost_count: number,
    private m_cell_size: number
  ) {
    this.m_map = new Map(m_width, m_height, m_cell_size);
  }
  // setters
  set width(value: number) {
    this.m_width = value;
  }
  set height(value: number) {
    this.m_height = value;
  }

  set ghost_count(value: number) {
    this.m_ghost_count = value;
  }

  set pacman_count(value: number) {
    this.m_pacman_count = value;
  }
  set cell_size(value: number) {
    this.m_cell_size = value;
  }
  // getters
  get width() {
    return this.m_width;
  }
  get height() {
    return this.m_height;
  }

  get pacman_count() {
    return this.m_pacman_count;
  }

  get ghost_count() {
    return this.m_ghost_count;
  }
  get map() {
    return this.m_map;
  }
  get cell_size() {
    return this.m_cell_size;
  }
}
