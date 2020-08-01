import { GameObject } from './GameObject';
import run1 from '../sprites/run1.png';
import run2 from '../sprites/run2.png';
import dead from '../sprites/death.png';
import jump from '../sprites/jump.png';
import { Animation } from './Animation';
import { Floor } from './Floor';
import { sprite } from './sprite';

export class Dino implements GameObject {
  public readonly x = 50;
  public readonly width = 44;
  public readonly height = 47;
  public y = 50;
  private vY = 0;
  private readonly run = new Animation([run1, run2], 12, this.width, this.height);
  private readonly death = sprite(dead, 50, 50);
  private readonly jumping = sprite(jump, 50, 50);
  private walking = false;
  public dead = false;

  constructor(private readonly floor: Floor) {
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.jump = this.jump.bind(this);
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    let sprite;
    if (this.dead) {
      sprite = this.death;
    } else if (!this.walking) {
      sprite = this.jumping;
    } else {
      sprite = this.run.getSprite();
    }
    ctx.drawImage(sprite, this.x, this.y, this.width, this.height);
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

  public start(): void {
    this.run.start();
    this.dead = false;
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('mousedown', this.jump);
    window.addEventListener('touchstart', this.jump);
  }

  public destroy(): void {
    this.run.stop();
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('mousedown', this.jump);
    window.removeEventListener('touchstart', this.jump);
  }

  private handleKeyDown(e: KeyboardEvent): void {
    if (e.code === 'Space' && !e.repeat) {
      this.jump();
    }
  }

  private jump(): void {
    if (this.walking) {
      this.vY = -1;
      this.walking = false;
    }
  }
}
