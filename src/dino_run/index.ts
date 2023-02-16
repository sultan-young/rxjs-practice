import { Injectable, IocContainer } from "./core/IoC/IoC";
import { getTime } from "./util/time";
import { DrawerService } from "./services";
import { animationFrameScheduler, of, repeat, scheduled, tap, timer } from "rxjs";
import { DinoGame } from "./game/dino-game";

const game = IocContainer.get(DinoGame);
game.start();
// game.invincible = true;