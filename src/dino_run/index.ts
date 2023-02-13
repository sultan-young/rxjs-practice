import { Injectable, LocContainer } from "./core/loC/loC";
import { MapService } from "./services/canvas.service";
import { getTime } from "./util/time";
import { DrawerService } from "./services";
import { animationFrameScheduler, of, repeat, scheduled, tap, timer } from "rxjs";
import { DinoGame } from "./game/dino-game";

const game = LocContainer.get(DinoGame);
game.start();
game.invincible = true;