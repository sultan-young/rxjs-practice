import { GAME_DEFAULT_SETTING } from "../setting/game.setting";
import { SPRITES_ENUM, SPRITE_LOCATION } from "../setting/sprites-location.setting";
import { getImageData } from "../util/canvas";
import { loadImage } from "../util/load-assets";
import { GameRunner } from "./game-runner";
import imageURL from './sprite.png'

export class DinoGame extends GameRunner {
  spriteImage!: HTMLImageElement;
  spriteImageData!: ImageData;

  // 游戏配置
  gameSetting = GAME_DEFAULT_SETTING;

  // 游戏状态
  state = {
    groundX: 0,
    groundY: 0,
  }

  constructor() {
    super();
    this.initSpriteState();
  }
  
  initSpriteState() {
    // 将round sprite置于地图底端
    this.state.groundY = this.MapConfig.mapSize.height - SPRITE_LOCATION.Ground.h / 2;
  }

  override async preLoad(): Promise<void> {
    this.spriteImage = await loadImage(imageURL);
    this.spriteImageData = getImageData(this.spriteImage);
        // console.log('spriteImage: ', spriteImage);
  }
  draw(): void {
    this.drawBackGround();
    this.drawGround()
    this.drawClouds();
    this.drawDino();
    this.drawScore();
    // console.log('当前fps为', this.fps)
  }

  // 绘制背景
  drawBackGround() {
    this.ctx.fillStyle = '#f7f7f7'
    this.ctx.fillRect(0, 0, this.MapConfig.mapSize.width, this.MapConfig.mapSize.height)
  }

  // 绘制地面
  drawGround() {
    const { state, gameSetting } = this;
    this.paintSprite(SPRITES_ENUM.Ground, state.groundX, state.groundY);
    state.groundX -= gameSetting.bgSpeed;
    const groundImgWidth = SPRITE_LOCATION.Ground.w / 2

    // 实现地图无缝循环
    if (state.groundX <= -groundImgWidth + this.MapConfig.mapSize.width) {
      this.paintSprite(SPRITES_ENUM.Ground, state.groundX + groundImgWidth, state.groundY)

      if (state.groundX <= -groundImgWidth) {
        state.groundX = -gameSetting.bgSpeed
      }
    }
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
    const { h, w, x: sx, y: sy } = SPRITE_LOCATION[spriteEnum]

    // 图片 来源图片偏移xy 来源图片宽高 在画布上绘制的便宜xy 在画布上绘制的宽高wh
    this.ctx.drawImage(this.spriteImage, sx, sy, w, h, dx, dy, w / 2, h / 2)
  }
}
