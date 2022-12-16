import p5Types from "p5";
import { SCALE } from "../utils/utils";
import Wall from "./Wall";
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
  public update(p5: p5Types, walls: Wall[]) {
    const newPositionX = this.m_position.x + this.m_speed.x * SCALE;
    const newPositionY = this.m_position.y + this.m_speed.y * SCALE;

    // see if new position has a wall on it
    const wall = walls.find((wall) => {
      return (
        wall.position.x === newPositionX && wall.position.y === newPositionY
      );
    });

    if (wall) return;

    this.m_position.x += this.m_speed.x * SCALE;
    this.m_position.y += this.m_speed.y * SCALE;

    // constraint
    this.m_position.x = p5.constrain(this.m_position.x, 0, p5.width - SCALE);
    this.m_position.y = p5.constrain(this.m_position.y, 0, p5.height - SCALE);
  }
}
