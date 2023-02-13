import { MapService } from "./canvas.service";
import { Injectable } from "../core/loC/loC";
import { BaseSprite } from "../base/baseSprite";
import { createCanvas } from "../util/canvas";

interface MapConfig {
    width: number,
    height: number,
}

@Injectable({
    providedIn: 'root'
})
export class DrawerService {
  public canvas!: HTMLCanvasElement;
  public ctx!: CanvasRenderingContext2D;

  public readonly canvasSize: MapConfig = {
    width: 600,
    height: 150,
  }

  constructor() {}

  createCanvas() {
    if (!this.canvas || !this.ctx) {
        const { canvas, ctx } = createCanvas(this.canvasSize);
        this.canvas = canvas;
        this.ctx = ctx;
    }
  }

  draw(sprite: BaseSprite, ctx: CanvasRenderingContext2D) {
    // TIPS: 频繁的ctx.save ctx.restore 会导致渲染卡顿
    const { width, height } = sprite;
    const { x, y } = sprite.offsetPosition;
    ctx.fillStyle = "red";
    ctx.font = "20px 微软雅黑";
    ctx.fillText(sprite.name, x, y);
    ctx.fillRect(x, y, width, height);
  }
}
