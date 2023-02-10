import { Injectable, LocContainer } from "./frame/loC/loC";
import { MapService } from "./services/canvas.service";
import { getTime } from "./util/time";
import { DrawerService, SpriteService } from "./services";
import { BaseBox } from "./base/box";
import { BaseSprite } from "./base/baseSprite";
import { animationFrameScheduler, of, repeat, scheduled, tap, timer } from "rxjs";
import { DinoGame } from "./game/dino-game";

const game = LocContainer.get(DinoGame);
game.start();
// game.invincible = true;