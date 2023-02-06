import { GAME_DEFAULT_SETTING } from "../setting/game.setting";
import { SPRITES_ENUM } from "../setting/sprites.setting";
import { getRandomNumber } from "../util/random";
import { Actor } from "./actors";

export class Cloud extends Actor {
    // 随机的速度系数
    public randomSpeedCoefficient = getRandomNumber(6, 14) / 10;
    // 速度
    public speed = GAME_DEFAULT_SETTING.cloudSpeed;
    

    constructor(spriteImageData: ImageData, speed: number) {
        super(spriteImageData);
        this.sprite = SPRITES_ENUM.Cloud;
        this.speed = speed;

    }
    
    nextFrame(): void {
        this.x -= this.speed * this.randomSpeedCoefficient;
    }
}