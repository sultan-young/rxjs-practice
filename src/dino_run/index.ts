import { Injectable, LocContainer } from "./frame/loC/loC";
import { MapService } from "./services/canvas.service";
import { getTime } from "./util/time";
import { BehaviorControl } from "./controls/behaviorControl";
import { DrawerService, SpriteService } from "./services";
import { BaseBox } from "./base/box";
import { BaseSprite } from "./base/baseSprite";
import { animationFrameScheduler, of, repeat, scheduled, tap, timer } from "rxjs";
import { DinoGame } from "./game/dino-game";

// @Injectable()
// class Game {
//   spriteList: BaseSprite[] = [];

//   constructor(
//     private mapService: MapService,
//     private spriteService: SpriteService,
//     private drawerService: DrawerService
//   ) {}
//   start() {
//     this.mapService.initMap({
//         width: 800,
//         height: 100,
//     });
//     this.spriteList.push(this.spriteService.createMainCharacter());
//     this.spriteList.push(...this.mapService.currentObstacles);

//     /**
//      * How to create a game loop using RxJS
//      * See: https://stackoverflow.com/questions/41752159/how-to-create-a-game-loop-using-rxjs
//      */
//     // scheduled([null], animationFrameScheduler).pipe(
//     //   tap((a) => {
//     //     requestAnimationFrame(this.animate.bind(this))
//     //   }),
//     //   repeat()
//     // ).subscribe()
//     requestAnimationFrame(this.animate.bind(this))

//   }
//   last = 0;
//   animate(time: number) {
//     console.log('time: ', time - this.last);

//     this.last = time;
//     // console.log(1000 / (nowTime - lastAnimationTime))
//     this.updateGame();
//     // console.log(nowTime - lastAnimationTime)
//     // requestAnimationFrame(this.animate.bind(this, nowTime));
//     requestAnimationFrame(this.animate.bind(this))
//   }
//   updateGame() {
//     this.mapService.update()
//     this.spriteList.forEach(sprite => {
//         this.drawerService.draw(sprite, this.mapService.ctx)
//     });
//   }
// }

// const game = LocContainer.get(Game);
// game.start();

// new BehaviorControl();

new DinoGame().start()
