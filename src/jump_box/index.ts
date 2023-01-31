import { Injectable, LocContainer } from "./loC/loC";
import { CanvasService } from "./services/canvas.service";
import { getTime } from "./util/time";
import { BehaviorControl } from "./controls/behaviorControl";
import { SpriteService } from "./services";
import { BaseBox } from "./base/box";

@Injectable()
class Game {
  spriteList: BaseBox[] = [];

  constructor(
    private canvasService: CanvasService,
    private spriteService: SpriteService
  ) {}
  start() {
    this.spriteList.push(this.spriteService.createMainCharacter());
    this.animate(getTime());
  }
  animate(lastAnimationTime: number) {
    const nowTime = getTime();
    // console.log(nowTime - lastAnimationTime)
    requestAnimationFrame(this.animate.bind(this, nowTime));
  }
}

const game = LocContainer.get(Game);
game.start();
// .start();

new BehaviorControl();
