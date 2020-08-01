export class Animation {
  constructor(spriteDataUrls: string[], private readonly fps: number) {
    this.sprites = spriteDataUrls.map((url) => {
      const img = new Image();
      img.src = url;
      return img;
    });
  }

  private timer = 0;
  private currentSprite = 0;
  private readonly sprites: CanvasImageSource[];

  public start(): void {
    this.timer = window.setInterval((): void => {
      this.currentSprite = (this.currentSprite + 1) % this.sprites.length;
    }, 1000 / this.fps);
  }

  public getSprite(): CanvasImageSource {
    return this.sprites[this.currentSprite];
  }

  public stop(): void {
    clearInterval(this.timer);
  }
}
