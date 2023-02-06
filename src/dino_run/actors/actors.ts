import { BehaviorSubject, Subject } from "rxjs";
import { SPRITES_ENUM, SPRITE_LOCATION } from "../setting/sprites.setting";
import { setImageAlphaArrCurrying } from "../util/canvas";

export interface IActorParams {
    spriteImageData: ImageData,
    baseY?: number,
    baseX?: number,
}


let getSpriteAlphaMap!: (key: string)=> number[][];

export abstract class Actor {
    public height = 0;
    public width = 0;

    public baseX = 0;
    public offsetX = 0;
    public _x = 0;
    get x() {
        return this.baseX + this.offsetX;
    }

    private _y = 0;
    get y() {
        return this.baseY + this.offsetY
    }

    // sprite初始开始绘制的位置
    public baseY = 0;
    // sprite便宜量，用来实现飞行，跳跃等
    public offsetY = 0;

    

    public speed = 0;

    public actions$ = new Subject<string>();

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


    constructor(params: IActorParams) {
        Object.assign(this, params)
        if (!getSpriteAlphaMap) {
            getSpriteAlphaMap = setImageAlphaArrCurrying(params.spriteImageData, SPRITE_LOCATION);
        }
    }

    // private actionHooks = {

    // }

    // appendActionHook(action: string, callBack: () => void) {

    // }

    // 下一帧调用的函数
    abstract nextFrame(): void;
}