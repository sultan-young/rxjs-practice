import { SPRITES_ENUM, SPRITE_LOCATION } from "../setting/sprites-location.setting";
import { getImageData } from "../util/canvas";
import { loadImage } from "../util/load-assets";
import { GameRunner } from "./game-runner";
import imageURL from './sprite.png'

export class DinoGame extends GameRunner {
  spriteImage!: HTMLImageElement;
  spriteImageData!: ImageData;

  constructor() {
    super();
  }
  override async preLoad(): Promise<void> {
    this.spriteImage = await loadImage(imageURL);
    this.spriteImageData = getImageData(this.spriteImage);
    console.log('this.spriteImageData: ', this.spriteImageData);
    // console.log('spriteImage: ', spriteImage);
    return new Promise((resolve) => {
      resolve()
    })
  }
  draw(): void {
    this.drawBackGround();
    this.drawGround()
    this.drawClouds();
    this.drawDino();
    this.drawScore();
    console.log('当前fps为', this.fps)
  }

  // 绘制背景
  drawBackGround() {
    this.ctx.fillStyle = '#f7f7f7'
    this.ctx.fillRect(0, 0, this.GameConfig.mapSize.width, this.GameConfig.mapSize.height)
  }

  // 绘制地面
  drawGround() {
    
  }

  // 绘制云朵
  drawClouds() {

  }

  // 绘制恐龙（主角）
  drawDino() {

  }

  // 绘制分数
  drawScore() {

  }

  // 绘制sprite
  paintSprite(spriteEnum: SPRITES_ENUM, dx: number, dy: number) {
    const { h, w, x, y } = SPRITE_LOCATION[spriteEnum]
    this.ctx.drawImage(this.spriteImage, x, y, w, h, dx, dy, w / 2, h / 2)
  }
}
