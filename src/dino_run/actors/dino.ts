import { filter } from "rxjs";
import { GAME_DEFAULT_SETTING } from "../setting/game.setting";
import { SPRITES_ENUM } from "../setting/sprites.setting";
import { getRandomNumber } from "../util/random";
import { Actor } from "./actors";

export class Dino extends Actor {
  // 随机的速度系数
  public randomSpeedCoefficient = getRandomNumber(6, 14) / 10;
  // 速度
  public speed = GAME_DEFAULT_SETTING.bgSpeed;
  public legFrames = 0;
  public legShow: "Left" | "Right" = "Left";
  private isJumping = false;
  private isDucking = false;

  // 允许的行为
  actions = {
    jump: this.jump.bind(this),
    duck: this.duck.bind(this),
    stopDuck: this.stopDuck.bind(this),
  };

  constructor(spriteImageData: ImageData) {
    super(spriteImageData);
    this.actions$
      .pipe(filter((action) => !!this.actions[action as never]))
      .subscribe((action) => {
        // @ts-ignore
        this.actions[action]();
      });

    this.reset();
  }

  reset() {
    this.sprite = SPRITES_ENUM.Dino;
  }

  nextFrame(): void {
    this.legFrames++;
    if (this.legFrames >= this.speed) {
      this.legShow = this.legShow === "Left" ? "Right" : "Left";
      this.legFrames = 0;
    }
    // this.x -= this.speed * this.randomSpeedCoefficient;

    if (this.isDucking) {
      // @ts-ignore
      this.sprite = `DinoDuck${this.legShow}Leg`;
    } else {
      // @ts-ignore
      this.sprite = `Dino${this.legShow}Leg`;
    }

    // this.sprite = SPRITES_ENUM.Dino;
    // console.log(this.sprite, 11)
  }

  // 跳
  jump() {
    this.isJumping = true;
  }

  // 蹲下
  duck() {
    this.isDucking = true;
  }

  // 停止蹲下
  stopDuck() {
    this.isDucking = false;
  }
}
