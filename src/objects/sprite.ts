export function sprite(dataUrl: string, width?: number, height?: number): CanvasImageSource {
  const img = new Image(width, height);
  img.src = dataUrl;
  return img;
}
