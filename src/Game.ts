import { GameObject } from './objects/GameObject';
import { Dino } from './objects/Dino';
import { Floor } from './objects/Floor';
import { Cloud } from './objects/Cloud';
import { Obstacles } from './objects/Obstacles';

export class Game {
  constructor(private readonly canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  private readonly ctx: CanvasRenderingContext2D;
  private updateTimer?: number;
  private drawTimer?: number;
  private lastUpdate = 0;

  private objects: GameObject[] = [];
  private dino?: Dino;

  public start(): void {
    console.log('starting game');
    const floor = new Floor();
    this.dino = new Dino(floor, () => {
      this.destroy();
      this.start();
    });

    this.objects = [
      new Cloud(30, 10),
      new Cloud(100, 400),
      new Cloud(80, 600),
      floor,
      new Obstacles(this.dino, floor),
      this.dino,
    ];

    this.objects.forEach((o) => o.start());

    this.lastUpdate = Date.now();
    this.updateTimer = window.setInterval(() => this.update(), 1000 / 120);
    this.drawTimer = window.setInterval(() => this.draw(), 1000 / 60);
  }

  public destroy(): void {
    console.log('destroying game');
    clearInterval(this.updateTimer);
    clearInterval(this.drawTimer);
    this.objects.forEach((o) => o.destroy());
  }

  private update(): void {
    if (!this.dino?.dead) {
      const delta = Date.now() - this.lastUpdate;
      this.objects.forEach((o) => o.update(delta));
      this.lastUpdate = Date.now();
    }
  }

  private draw(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.objects.forEach((o) => o.draw(this.ctx));
  }
}
