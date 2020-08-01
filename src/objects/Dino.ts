import { GameObject } from './GameObject';
import run1 from '../sprites/run1.png';
import run2 from '../sprites/run2.png';
import { Animation } from './Animation';
import { Floor } from './Floor';

export class Dino implements GameObject {
  private readonly x = 50;
  private y = 50;
  private vY = 0;
  private readonly width = 50;
  private readonly height = 50;
  private readonly run = new Animation([run1, run2], 12);
  private walking = false;

  constructor(private readonly floor: Floor) {
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.jump = this.jump.bind(this);
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.run.getSprite(), this.x, this.y, this.width, this.height);
  }

  public update(deltaT: number): void {
    if (!this.walking) {
      this.vY = this.vY + 0.003 * deltaT; // gravity
      this.vY /= 1 + 0.2 / deltaT; // friction
      this.y += this.vY * deltaT; // move
    }

    // cap
    if (this.y + this.height > this.floor.y) {
      this.y = this.floor.y - this.height;
      this.vY = 0;
      this.walking = true;
    }
  }

  public destroy(): void {
    this.run.stop();
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('click', this.jump);
    window.removeEventListener('touchstart', this.jump);
  }

  private handleKeyDown(e: KeyboardEvent): void {
    if (e.code === 'Space') {
      this.jump();
    }
  }

  private jump(): void {
    if (this.walking) {
      this.vY = -1;
      this.walking = false;
    }
  }

  public start(): void {
    this.run.start();
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('click', this.jump);
    window.addEventListener('touchstart', this.jump);
  }
}
