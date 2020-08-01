import { GameObject } from './GameObject';
import { Animation } from './Animation';
import { Dino } from './Dino';

const collisionMargin = 10;

export class Obstacle implements GameObject {
  public x = 0;
  public y = 0;
  public spawned = false;

  public constructor(
    private readonly dino: Dino,
    private readonly animation: Animation,
    private readonly getVX: () => number,
  ) {}

  start(): void {
    this.animation.start();
  }

  destroy(): void {
    this.animation.stop();
  }

  update(deltaT: number): void {
    if (!this.spawned) {
      return;
    }
    this.x -= this.getVX() * deltaT;

    if (this.x < -100) {
      this.spawned = false;
      return;
    }

    const hasReachedDinoFace = this.dino.x + this.dino.width - collisionMargin > this.x;
    if (!hasReachedDinoFace) {
      return;
    }
    const hasPassedDinoTail = this.dino.x + collisionMargin > this.x + this.animation.width;
    if (hasPassedDinoTail) {
      return;
    }
    const isBelowDino = this.dino.y + this.dino.height - collisionMargin < this.y;
    if (isBelowDino) {
      return;
    }
    const isAboveDino = this.dino.y + collisionMargin > this.y + this.animation.height;
    if (isAboveDino) {
      return;
    }
    this.dino.dead = true;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (!this.spawned) {
      return;
    }
    const sprite = this.animation.getSprite();
    ctx.drawImage(sprite, this.x, this.y, sprite.width, sprite.height);
  }
}
