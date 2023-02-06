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
    public speed = GAME_DEFAULT_SETTING.cloudSpeed;
    

    constructor(params: ICloudParams ) {
        super({
            spriteImageData: params.spriteImageData,
            baseY: params.baseY,
            baseX: params.baseX,
        });
        this.sprite = SPRITES_ENUM.Cloud;
        this.speed = params.speed;

    }
    
    nextFrame(): void {
        this.offsetX -= this.speed * this.randomSpeedCoefficient;
    }
}