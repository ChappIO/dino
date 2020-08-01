import { GameObject } from './GameObject';
import floor1 from '../sprites/floor-1.png';

const floor = new Image();
floor.width = 1200;
floor.height = 12;
floor.src = floor1;

const scale = 1;

export class Floor implements GameObject {
  public readonly y = 180;
  private readonly vY = 0.3;
  private x = 0;

  public draw(ctx: CanvasRenderingContext2D): void {
    for (let i = 0; i < 2; i++) {
      ctx.drawImage(floor, (this.x + floor.width * i) * scale, this.y - 8, floor.width * scale, floor.height * scale);
    }
  }

  public update(deltaT: number): void {
    this.x = (this.x - this.vY * deltaT) % floor.width;
  }

  public destroy(): void {
    // nothing to unload
  }

  public start(): void {
    // nothing to load
  }
}
