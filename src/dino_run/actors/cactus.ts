import { GAME_DEFAULT_SETTING } from "../setting/game.setting";
import { SPRITES_ENUM } from "../setting/sprites.setting";
import { randInteger, randItem } from "../util/random";
import { Actor, IActorParams } from "./actors";

const VARIANTS = ['Cactus', 'CactusDouble', 'CactusDoubleB', 'CactusTriple']

export class Cactus extends Actor {
    // 速度
    public speed = GAME_DEFAULT_SETTING.bgSpeed;
    
    get y() {
        return this.baseY - this.height - 2
    }

    constructor() {
        super();
        this.sprite = randItem(VARIANTS)
    }
    
    nextFrame(): void {
        this.offsetX -= this.speed;
    }
}