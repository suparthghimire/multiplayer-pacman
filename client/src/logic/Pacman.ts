import p5Types from "p5";
import { SCALE } from "../utils/utils";
export default class Pacman {
  private m_speed = {
    x: 0,
    y: 0,
  };
  private m_position;
  constructor(p5: p5Types) {
    this.m_position = p5.createVector(0, 0);
  }

  public direction(position: p5Types.Vector) {
    this.m_speed.x = position.x;
    this.m_speed.y = position.y;
  }
  public draw(p5: p5Types) {
    p5.fill(255, 255, 0);
    p5.ellipse(this.m_position.x, this.m_position.y, SCALE, SCALE);
  }
  public update(p5: p5Types) {
    this.m_position.x += this.m_speed.x * SCALE;
    this.m_position.y += this.m_speed.y * SCALE;

    if (this.m_position.x < 0) {
      this.m_position.x = p5.width - SCALE;
    } else if (this.m_position.x > p5.width - SCALE) {
      this.m_position.x = 0;
    } else {
      this.m_position.x = this.m_position.x;
    }

    if (this.m_position.y < 0) {
      this.m_position.y = p5.height - SCALE;
    } else if (this.m_position.y > p5.height - SCALE) {
      this.m_position.y = 0;
    } else {
      this.m_position.y = this.m_position.y;
    }
  }
}
