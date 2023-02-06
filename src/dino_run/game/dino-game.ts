import { GAME_DEFAULT_SETTING } from "../setting/game.setting";
import { SPRITES_ENUM, SPRITE_LOCATION } from "../setting/sprites.setting";
import { setImageAlphaArrCurrying, getImageData } from "../util/canvas";
import { loadImage } from "../util/load-assets";
import { GameRunner } from "./game-runner";
import imageURL from '../assets/sprite.png'
import { Cloud } from "../actors/cloud";
import { Actor } from "../actors/actors";
import { randBoolean, randInteger } from "../util/random";
import { Dino } from "../actors/dino";
import { Injectable } from "../frame/loC/loC";
import { KeyboardIoControl } from "../controls/keyboardIoControl";
import { Obstacle } from "../actors/obstacle";

@Injectable()
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

  // 当前的sprite集合
  sprites: {
    [props: string]: Actor[];
  } = {
    clouds: [], // 云朵
    dinos: [], // 恐龙
    obstacles: [] // 障碍物
  }

  constructor(
    private keyboardIoControl: KeyboardIoControl,
  ) {
    super();
    this.initSpriteState();
    this.registerInputEvent();
  }

  // 注册键盘监听器
  registerInputEvent() {
    this.keyboardIoControl.register({
      w: () => {
        this.sprites.dinos.forEach(dino => {
          dino.actions$.next('jump')
        })
      },
      s: {
        up: () => {
          this.sprites.dinos.forEach(dino => {
            dino.actions$.next('stopDuck')
          })
        },
        down: () => {
          this.sprites.dinos.forEach(dino => {
            dino.actions$.next('duck')
          })
        }
      }
    })
  }
  
  initSpriteState() {
    // 将round sprite置于地图底端
    this.state.groundY = this.MapConfig.mapSize.height - SPRITE_LOCATION.Ground.h / 2;
  }

  override async preLoad(): Promise<void> {
    this.spriteImage = await loadImage(imageURL);
    this.spriteImageData = getImageData(this.spriteImage);
    
    // 加载出dino
    const dino = new Dino({
      spriteImageData: this.spriteImageData,
      baseY: this.MapConfig.mapSize.height - GAME_DEFAULT_SETTING.dinoGroundOffset,
    });
    this.sprites.dinos.push(dino)

        // console.log('spriteImage: ', spriteImage);
  }
  draw(): void {
    this.drawBackGround();
    this.drawGround()
    this.drawClouds();
    this.drawDino();
    this.drawScore();

    // 绘制障碍物
    this.drawObstacle()
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
    const { clouds } = this.sprites;
    const { cloudSpawnRate } = this.gameSetting;

    this.clearInstances(clouds);
    if (this.frameCount % cloudSpawnRate === 0) {
      const newCloudSprite = new Cloud({
        spriteImageData: this.spriteImageData,
        speed: 3,
        baseY: randInteger(20, 80),
        // 当需要生成时候，将该sprite放在地图右侧
        baseX: this.MapConfig.mapSize.width,
      });
      clouds.push(newCloudSprite);
    }
    this.batchPaintSprites(clouds)
  }

  // 绘制恐龙（主角）
  drawDino() {
    const { dinos } = this.sprites;
    this.batchPaintSprites(dinos)
  }

  // 绘制分数
  drawScore() {

  }

  // 绘制障碍物
  drawObstacle() {
    const { obstacles } = this.sprites;
    const { obstacleSpawnRate } = this.gameSetting;
    this.clearInstances(obstacles);
    if (this.frameCount % obstacleSpawnRate === 0 && randBoolean()) {
        const obstacle = new Obstacle({
          spriteImageData: this.spriteImageData,
          baseX: this.MapConfig.mapSize.width,
          baseY: this.MapConfig.mapSize.height,
        });
        obstacles.push(obstacle);
    };
    this.batchPaintSprites(obstacles);
  }

  // 当sprite不可见时候进行清除
  clearInstances(actorInstances: Actor[]) {
    for (let i = actorInstances.length - 1; i >= 0; i-- ) {
      const instance = actorInstances[i];
      if (instance.rightX <= 0) {
        actorInstances.splice(i, 1);
      }
    }

  }

  // 批量绘制
  batchPaintSprites(spriteInstances: Actor[]) {
    spriteInstances.forEach(instance => {
      instance.nextFrame();
      this.paintSprite(instance.sprite, instance.x, instance.y);
    })
  }

  // 绘制sprite
  paintSprite(spriteEnum: SPRITES_ENUM, dx: number, dy: number) {
    const { h, w, x: sx, y: sy } = SPRITE_LOCATION[spriteEnum]

    // 图片 来源图片偏移xy 来源图片宽高 在画布上绘制的便宜xy 在画布上绘制的宽高wh
    this.ctx.drawImage(this.spriteImage, sx, sy, w, h, dx, dy, w / 2, h / 2)
  }
}
