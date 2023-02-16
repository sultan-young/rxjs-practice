import { Input } from "../core/IoC/IoC";
import { GAME_DEFAULT_SETTING } from "../setting/game.setting";
import { SPRITES_ENUM } from "../setting/sprites.setting";
import { randInteger } from "../util/random";
import { Actor, IActorParams } from "./actors";

interface ICloudParams extends IActorParams {
    speed: number;
}

export class Cloud extends Actor {
    // 随机的速度系数
    public randomSpeedCoefficient = randInteger(6, 14) / 10;
    // 速度
    @Input() public speed = GAME_DEFAULT_SETTING.cloudSpeed;
    

    constructor() {
        super();
        this.sprite = SPRITES_ENUM.Cloud;
    }
    
    nextFrame(): void {
        this.offsetX -= this.speed * this.randomSpeedCoefficient;
    }
}