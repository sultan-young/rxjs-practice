import { GAME_DEFAULT_SETTING } from "../setting/game.setting";
import { SPRITES_ENUM } from "../setting/sprites.setting";
import { getImageAlphaArr } from "../util/canvas";
import { getRandomNumber } from "../util/random";
import { Actor } from "./actors";

export class Cloud extends Actor {
    // 随机的速度系数
    public randomSpeedCoefficient = getRandomNumber(6, 14) / 10;
    // 速度
    public speed = GAME_DEFAULT_SETTING.cloudSpeed;
    
    public readonly sprite = SPRITES_ENUM.Cloud;

    constructor(speed: number) {
        super();
        this.speed = speed;
        // this.appendActionHook('move', () => {

        // })
    }
    
    nextFrame(): void {
        this.x -= this.speed * this.randomSpeedCoefficient;
    }
}