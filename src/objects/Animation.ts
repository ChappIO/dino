export class Animation {
  constructor(
    spriteDataUrls: string[],
    private readonly fps: number,
    public readonly width: number,
    public readonly height: number,
  ) {
    this.sprites = spriteDataUrls.map((url) => {
      const img = new Image();
      img.src = url;
      img.width = this.width;
      img.height = this.height;
      return img;
    });
  }

  private timer = 0;
  private currentSprite = 0;
  private readonly sprites: HTMLImageElement[];

  public start(): void {
    this.timer = window.setInterval((): void => {
      this.currentSprite = (this.currentSprite + 1) % this.sprites.length;
    }, 1000 / this.fps);
  }

  public getSprite(): HTMLImageElement {
    return this.sprites[this.currentSprite];
  }

  public stop(): void {
    clearInterval(this.timer);
  }
}
