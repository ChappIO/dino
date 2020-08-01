export interface GameObject {
  start(): void;

  destroy(): void;

  update(deltaT: number): void;

  draw(ctx: CanvasRenderingContext2D): void;
}
