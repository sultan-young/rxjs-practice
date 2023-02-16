import { GAME_DEFAULT_SETTING } from "../setting/game.setting";
import { SPRITES_ENUM, SPRITE_LOCATION } from "../setting/sprites.setting";
import { setImageAlphaArrCurrying, getImageData } from "../util/canvas";
import { loadFont, loadImage } from "../util/load-assets";
import { GameRunner } from "./game-runner";
import imageURL from "../assets/sprite.png";
import font from "../assets/PressStart2P-Regular.ttf";
import { Cloud } from "../actors/cloud";
import { Actor } from "../actors/actors";
import { randBoolean, randInteger } from "../util/random";
import { Dino } from "../actors/dino";
import { Injectable, IocContainer } from "../core/IoC/IoC";
import { KeyboardIoControl } from "../controls/keyboardIoControl";
import { Cactus } from "../actors/cactus";
import { Bird } from "../actors/bird";
import { DrawerService } from "../services";

@Injectable({
  providedIn: "root",
})
export class DinoGame extends GameRunner {
  spriteImage!: HTMLImageElement;
  spriteImageData!: ImageData;

  invincible = false; // 是否处于无敌

  // 游戏配置
  gameSetting = GAME_DEFAULT_SETTING;
  // 游戏分数
  score = 0;

  // 游戏状态
  state = {
    groundX: 0,
    groundY: 0,
  };

  // 当前的sprite集合
  sprites: {
    [props: string]: Actor[];
  } = {
    clouds: [], // 云朵
    dinos: [], // 恐龙
    birds: [], // 飞鸟
    cactus: [], // 仙人掌
  };

  constructor(
    private keyboardIoControl: KeyboardIoControl,
    private drawService: DrawerService
  ) {
    super();
    this.initSpriteState();
    this.registerInputEvent();
  }

  // 注册键盘监听器
  registerInputEvent() {
    this.keyboardIoControl.register({
      w: () => {
        this.sprites.dinos.forEach((dino) => {
          dino.actions$.next("jump");
        });
      },
      " ": () => {
        this.sprites.dinos.forEach((dino) => {
          dino.actions$.next("jump");
        });
      },
      s: {
        up: () => {
          this.sprites.dinos.forEach((dino) => {
            dino.actions$.next("stopDuck");
          });
        },
        down: () => {
          this.sprites.dinos.forEach((dino) => {
            dino.actions$.next("duck");
          });
        },
      },
      j: () => {
        this.sprites.dinos.forEach((dino) => {
          dino.actions$.next("attack");
        });
      },
    });
  }

  initSpriteState() {
    // 将round sprite置于地图底端
    this.state.groundY =
      this.MapConfig.mapSize.height - SPRITE_LOCATION.Ground.h / 2;
  }

  override async preLoad(): Promise<void> {
    this.spriteImage = await loadImage(imageURL);
    loadFont(font, "PressStart2P"),
      (this.spriteImageData = getImageData(this.spriteImage));

    // 加载出dino
    const dino = IocContainer.get(Dino, {
      spriteImageData: this.spriteImageData,
      baseY:
        this.MapConfig.mapSize.height - GAME_DEFAULT_SETTING.dinoGroundOffset,
      baseX: 50,
    });
    this.sprites.dinos.push(dino);
    // console.log('spriteImage: ', spriteImage);
  }
  draw(): void {
    this.drawBackGround();
    this.drawGround();
    this.drawClouds();
    this.drawDino();
    this.drawScore();

    // 绘制障碍物
    this.drawCactus();
    this.drawBirds();

    // 障碍物
    const { dinos, birds, cactus } = this.sprites;
    if (!this.invincible) {
      dinos.forEach((dino) => {
        if (dino.hits([birds[0], cactus[0]])) {
          this.pause();
        }
      });
    }
    // console.log('当前fps为', this.fps)
  }

  // 绘制背景
  drawBackGround() {
    this.ctx.fillStyle = "#f7f7f7";
    this.ctx.fillRect(
      0,
      0,
      this.MapConfig.mapSize.width,
      this.MapConfig.mapSize.height
    );
  }

  // 绘制地面
  drawGround() {
    const { state, gameSetting } = this;
    this.paintSprite(SPRITES_ENUM.Ground, state.groundX, state.groundY);
    state.groundX -= gameSetting.bgSpeed;
    const groundImgWidth = SPRITE_LOCATION.Ground.w / 2;

    // 实现地图无缝循环
    if (state.groundX <= -groundImgWidth + this.MapConfig.mapSize.width) {
      this.paintSprite(
        SPRITES_ENUM.Ground,
        state.groundX + groundImgWidth,
        state.groundY
      );

      if (state.groundX <= -groundImgWidth) {
        state.groundX = -gameSetting.bgSpeed;
      }
    }
  }

  // 绘制云朵
  drawClouds() {
    const { clouds } = this.sprites;
    const { cloudSpawnRate } = this.gameSetting;

    this.clearInstances(clouds);
    if (this.frameCount % cloudSpawnRate === 0) {
      const newCloudSprite = IocContainer.get(Cloud, {
        spriteImageData: this.spriteImageData,
        speed: 3,
        baseY: randInteger(20, 80),
        // 当需要生成时候，将该sprite放在地图右侧
        baseX: this.MapConfig.mapSize.width,
      });
      clouds.push(newCloudSprite);
    }
    this.batchPaintSprites(clouds);
  }

  // 绘制恐龙（主角）
  drawDino() {
    const { dinos } = this.sprites;
    this.batchPaintSprites(dinos);
  }

  // 绘制分数
  drawScore() {
    if (this.frameCount % GAME_DEFAULT_SETTING.scoreIncreaseRate === 0) {
      this.score++;
    }

    const fontSize = 12;
    this.ctx.fillStyle = "#f7f7f7";
    this.ctx.fillRect(
      this.MapConfig.mapSize.width - fontSize * 5,
      0,
      fontSize * 5,
      fontSize
    );

    this.paintText(
      (this.score + "").padStart(5, "0"),
      this.MapConfig.mapSize.width - 20,
      20,
      {
        font: "PressStart2P",
        size: `${fontSize}px`,
        align: "right",
        baseline: "top",
        color: "#535353",
      }
    );
  }

  // 绘制障碍物
  drawCactus() {
    const { cactus } = this.sprites;
    const { cactusSpawnRate } = this.gameSetting;
    this.clearInstances(cactus);
    if (this.frameCount % cactusSpawnRate === 0 && randBoolean()) {
      const newCactus = IocContainer.get(Cactus, {
        spriteImageData: this.spriteImageData,
        baseX: this.MapConfig.mapSize.width,
        baseY: this.MapConfig.mapSize.height,
      });
      cactus.push(newCactus);
    }
    this.batchPaintSprites(cactus);
  }

  // 绘制飞鸟
  drawBirds() {
    const { birds } = this.sprites;

    this.clearInstances(birds);
    if (this.frameCount % this.gameSetting.birdSpawnRate === 0) {
      const newBird = IocContainer.get(Bird, {
        spriteImageData: this.spriteImageData,
        speed: GAME_DEFAULT_SETTING.birdSpeed,
        baseX: this.MapConfig.mapSize.width,
      });
      birds.push(newBird);
    }
    this.batchPaintSprites(birds);
  }

  // 当sprite不可见时候进行清除
  clearInstances(actorInstances: Actor[]) {
    for (let i = actorInstances.length - 1; i >= 0; i--) {
      const instance = actorInstances[i];
      if (instance.rightX <= 0) {
        actorInstances.splice(i, 1);
      }
    }
  }

  // 批量绘制
  batchPaintSprites(spriteInstances: Actor[]) {
    spriteInstances.forEach((instance) => {
      instance.nextFrame();
      this.paintSprite(instance.sprite, instance.x, instance.y);
    });
  }

  // 绘制sprite
  paintSprite(spriteEnum: SPRITES_ENUM, dx: number, dy: number) {
    const { h, w, x: sx, y: sy } = SPRITE_LOCATION[spriteEnum];

    // 图片 来源图片偏移xy 来源图片宽高 在画布上绘制的便宜xy 在画布上绘制的宽高wh
    this.ctx.drawImage(this.spriteImage, sx, sy, w, h, dx, dy, w / 2, h / 2);
  }

  paintText(text: string, x: number, y: number, opts: any) {
    const { font = "serif", size = "12px" } = opts;
    const { ctx } = this;

    ctx.font = `${size} ${font}`;
    if (opts.align) ctx.textAlign = opts.align;
    if (opts.baseline) ctx.textBaseline = opts.baseline;
    if (opts.color) ctx.fillStyle = opts.color;
    ctx.fillText(text, x, y);
  }
}
