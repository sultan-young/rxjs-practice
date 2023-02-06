import { BehaviorSubject } from "rxjs";
import { SPRITES_ENUM, SPRITE_LOCATION } from "../setting/sprites.setting";
import { setImageAlphaArrCurrying } from "../util/canvas";

let getSpriteAlphaMap!: (key: string)=> number[][];

export abstract class Actor {
    public height = 0;
    public width = 0;
    public x = 0;
    public y = 0;
    public speed = 0;
    public actions$ = new BehaviorSubject('123');

    // sprite不透明度数组，二维
    private alphaMap: number[][] = [];


    private _sprite!: SPRITES_ENUM;
    set sprite(name: SPRITES_ENUM) {
        this.height = SPRITE_LOCATION[name].h / 2;
        this.width = SPRITE_LOCATION[name].w / 2;
        this.alphaMap = getSpriteAlphaMap(name);
        
        this._sprite = name;
    }
    get sprite() {
        return this._sprite;
    }
    
    // sprite 右侧的值
    get rightX() {
        return this.width + this.x;
    }

    get bottomY() {
        return this.height + this.y;
    }


    constructor(spriteImageData: ImageData) {
        if (!getSpriteAlphaMap) {
            getSpriteAlphaMap = setImageAlphaArrCurrying(spriteImageData, SPRITE_LOCATION);
        }
    }

    // private actionHooks = {

    // }

    // appendActionHook(action: string, callBack: () => void) {

    // }

    // 下一帧调用的函数
    abstract nextFrame(): void;
}