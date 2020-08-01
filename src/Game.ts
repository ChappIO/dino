import { GameObject } from './objects/GameObject';
import { Dino } from './objects/Dino';
import { Floor } from './objects/Floor';
import { Cloud } from './objects/Cloud';

export class Game {
  constructor(private readonly canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  private readonly objects: GameObject[] = [];
  private readonly ctx: CanvasRenderingContext2D;
  private updateTimer?: number;
  private drawTimer?: number;
  private lastUpdate = 0;

  public start(): void {
    console.log('starting game');
    this.objects.push(new Cloud(30, 10), new Cloud(100, 400), new Cloud(80, 600));
    const floor = new Floor();
    const dino = new Dino(floor);
    this.objects.push(floor, dino);

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
    const delta = Date.now() - this.lastUpdate;
    this.objects.forEach((o) => o.update(delta));
    this.lastUpdate = Date.now();
  }

  private draw(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.objects.forEach((o) => o.draw(this.ctx));
  }
}
