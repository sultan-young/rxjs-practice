import { Input } from "../core/IoC/IoC";
import { DrawerService } from "../services";
import { GAME_DEFAULT_SETTING } from "../setting/game.setting";
import { SPRITES_ENUM } from "../setting/sprites.setting";
import { randInteger } from "../util/random";
import { Actor, IActorParams } from "./actors";

interface IBirdParams extends IActorParams {
    speed: number;
}

export class Bird extends Actor {
    // 随机的速度系数
    public randomSpeedCoefficient = randInteger(10, 14) / 10;
    // 速度
    @Input() public speed = GAME_DEFAULT_SETTING.birdSpeed;
    private birdWingsRate = GAME_DEFAULT_SETTING.birdWingsRate;
    private currentFrameCount = 0;
    
    constructor() {
        super();
        this.sprite = SPRITES_ENUM.BirdDown;
    }
    
    nextFrame(): void {
        this.currentFrameCount++;
        if (this.currentFrameCount % this.birdWingsRate === 0) {
            this.sprite = this.sprite === SPRITES_ENUM.BirdUp ? SPRITES_ENUM.BirdDown : SPRITES_ENUM.BirdUp;
        }
        this.offsetX -= this.speed * this.randomSpeedCoefficient;

        
    }
}