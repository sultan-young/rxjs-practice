import { ClientSize } from "../game/game-runner";
import { SpriteSetting } from "../setting/sprites.setting";

export function createCanvas(canvasSize: ClientSize) {
  const { width, height } = canvasSize;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  canvas.innerHTML = "您的浏览器不支持canvas，请更换高级浏览器";
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

// 获取图像的imageData
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

// 获取图像的透明度映射成二进制数组
export const setImageAlphaArrCurrying = (imageData: ImageData, spriteSetting: {[spriteName: string]: SpriteSetting}) => {
    const cache = new Map();
    return function getImageAlphaArr(key: string): number[][] {
      const sprite = spriteSetting[key];
      if (!sprite) {
        throw Error(`未找到key为${key}的sprite`)
      }
      if (cache.has(key)) {
        return cache.get(key);
      }
  
      // sprite的左上角起始点
      let initIVal = imageData.width * sprite.y * 4;
      let lines = [];
      for (
        let i = initIVal;
        i < initIVal + imageData.width * sprite.h * 4;
        i += imageData.width * 8
      ) {
        let line = [];
        let initJValue = i + sprite.x * 4;
        for (let j = initJValue; j < initJValue + sprite.w * 4; j += 8) {
          line.push(imageData.data[j + 3] === 0 ? 0 : 1);
        }
        lines.push(line);
      }
      cache.set(key, lines);
      return lines;
    };
  };
