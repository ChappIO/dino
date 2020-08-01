import { GameObject } from './GameObject';
import cloud from '../sprites/1x-cloud.png';

const sprite = new Image();
sprite.src = cloud;

export class Cloud implements GameObject {
  private dY = (Math.random() + 1) / 100;

  constructor(private readonly y: number, private x: number) {}

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(sprite, this.x, this.y);
  }

  public update(deltaT: number): void {
    this.x -= this.dY * deltaT;

    if (this.x < -50) {
      this.x = 700;
      this.dY = (Math.random() + 1) / 100;
    }
  }

  public destroy(): void {
    // Nothing to do, cloud just is
  }

  public start(): void {
    // Nothing to do, cloud just is
  }
}
