import { CanvasService } from ".";
import { BaseBox } from "../base/box";
import { Injectable } from "../loC/loC";

@Injectable()
export class DrawerService {
    ctx!: CanvasRenderingContext2D
    constructor() {

    }
    draw(box: BaseBox) {
        this.ctx.save();
        
    }
}