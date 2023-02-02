import { ClientSize } from "../game/game-runner";

export function createCanvas(canvasSize: ClientSize) {
  const { width, height } = canvasSize;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  const scale = window.devicePixelRatio;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  canvas.width = Math.floor(width);
  canvas.height = Math.floor(height);
  return {
    canvas,
    ctx,
  };
}

export function getImageData(image: HTMLImageElement) {
  const { width, height } = image;
  const tmpCanvas = document.createElement("canvas");
  const ctx = tmpCanvas.getContext("2d")!;
  let result;

  tmpCanvas.width = width;
  tmpCanvas.height = height;
  ctx.drawImage(image, 0, 0);

  result = ctx.getImageData(0, 0, width, height);
  tmpCanvas.remove();
  return result;
}
