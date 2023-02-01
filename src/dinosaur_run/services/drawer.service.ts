import { MapService } from "./canvas.service";
import { Injectable } from "../frame/loC/loC";
import { BaseSprite } from "../base/baseSprite";

@Injectable()
export class DrawerService {
    constructor() {

    }
    draw(sprite: BaseSprite, ctx: CanvasRenderingContext2D) {
        ctx.save();
        const { width, height } = sprite;
        const { x, y } = sprite.offsetPosition;
        ctx.save()
        ctx.fillStyle = 'red'
        ctx.font = '20px 微软雅黑'
        ctx.fillText(sprite.name, x, y)
        ctx.restore()
        ctx.fillRect(x, y, width, height);
    }
}