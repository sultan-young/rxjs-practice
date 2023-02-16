import { filter } from "rxjs";
import { GAME_DEFAULT_SETTING } from "../setting/game.setting";
import { SPRITES_ENUM } from "../setting/sprites.setting";
import { randInteger } from "../util/random";
import { Actor, IActorParams } from "./actors";
import { Sprite } from "../core/IoC/IoC";
import { DrawerService } from "../services";

@Sprite()
export class Dino extends Actor {
  // 随机的速度系数
  public randomSpeedCoefficient = randInteger(6, 14) / 10;
  // 速度
  public speed = GAME_DEFAULT_SETTING.bgSpeed;
  public legFrames = 0;
  public legShow: "Left" | "Right" = "Left";
  private isDucking = false;

  // 跳起来的速度
  private lift = GAME_DEFAULT_SETTING.dinoLift;

  // 垂直方向速度
  private vVelocity: number | null = 0;
  // 重力
  private gravity =  GAME_DEFAULT_SETTING.dinoGravity;

  get y() {
    return this.baseY - this.height  + this.offsetY
}
  constructor(
    private drawService: DrawerService,
  ) {
    super();
    this.actions$
      .pipe(filter((action) => !!(this as any)[action]))
      .subscribe((action) => {
        // @ts-ignore
        this[action]();
      });
    this.reset();
  }

  reset() {
    this.sprite = SPRITES_ENUM.Dino;
  }

  nextFrame(): void {
    this.legFrames++;

    if (this.vVelocity !== null) {
        this.vVelocity += this.gravity;
        this.offsetY += this.vVelocity;
    }

    if (this.offsetY > 0) {
        this.vVelocity = null;
        this.offsetY = 0;
    }

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
    if (this.offsetY === 0) {
        this.vVelocity = -this.lift;
        return true;
    }
    return false;
  }

  // 蹲下
  duck() {
    this.isDucking = true;
  }

  // 停止蹲下
  stopDuck() {
    this.isDucking = false;
  }

  attack() {
    console.log('a')
  }
}
