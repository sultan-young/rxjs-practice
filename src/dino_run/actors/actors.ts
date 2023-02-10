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

    // 碰撞检测
    hits(actors: Actor[]) {
        return actors.some(actor => {
            if (!actor) return false;

            if (this.x >= actor.rightX || this.rightX <= actor.x) {
                return false;
            }

            if (this.y >= actor.bottomY || this.bottomY <= actor.y) {
                return false;
            }

            if (this.alphaMap && actor.alphaMap) {
                const startY = Math.round(Math.max(this.y, actor.y))
                const endY = Math.round(Math.min(this.bottomY, actor.bottomY))
                const startX = Math.round(Math.max(this.x, actor.x))
                const endX = Math.round(Math.min(this.rightX, actor.rightX))
                const thisY = Math.round(this.y)
                const actorY = Math.round(actor.y)
                const thisX = Math.round(this.x)
                const actorX = Math.round(actor.x)
        
                for (let y = startY; y < endY; y++) {
                  for (let x = startX; x < endX; x++) {
                    // 判断两个sprite的不透明数组是否有重合的地方
                    if (this.alphaMap[y - thisY][x - thisX] === 0) continue
                    if (actor.alphaMap[y - actorY][x - actorX] === 0) continue
        
                    return true
                  }
                }
        
                return false
              }
        
            return true;
        })
    }
}