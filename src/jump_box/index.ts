import { Injectable, LocContainer } from "./frame/loC/loC";
import { MapService } from "./services/canvas.service";
import { getTime } from "./util/time";
import { BehaviorControl } from "./controls/behaviorControl";
import { DrawerService, SpriteService } from "./services";
import { BaseBox } from "./base/box";
import { BaseSprite } from "./base/baseSprite";

@Injectable()
class Game {
  spriteList: BaseSprite[] = [];

  constructor(
    private mapService: MapService,
    private spriteService: SpriteService,
    private drawerService: DrawerService
  ) {}
  start() {
    this.mapService.initMap({
        width: 800,
        height: 100,
    });
    this.spriteList.push(this.spriteService.createMainCharacter());
    this.spriteList.push(...this.mapService.currentObstacles)
    this.animate(getTime());
  }
  animate(lastAnimationTime: number) {
    const nowTime = getTime();
    this.updateGame();
    // console.log(nowTime - lastAnimationTime)
    requestAnimationFrame(this.animate.bind(this, nowTime));
  }
  updateGame() {
    this.mapService.update()
    this.spriteList.forEach(sprite => {
        this.drawerService.draw(sprite, this.mapService.ctx)
    });
  }
}

const game = LocContainer.get(Game);
game.start();

new BehaviorControl();
