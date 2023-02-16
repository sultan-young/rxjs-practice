import { CanvasService } from ".";
import { Injectable } from "../core/IoC/IoC";
import { createCanvas } from "../util/canvas";
import { v4 as uuid } from 'uuid'

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
  public uuid = uuid();

  public readonly canvasSize: MapConfig = {
    width: 600,
    height: 150,
  }

  constructor(
    private canvas1: CanvasService,
  ) {
  }

  createCanvas(
  ) {
    if (!this.canvas || !this.ctx) {
        const { canvas, ctx } = createCanvas(this.canvasSize);
        this.canvas = canvas;
        this.ctx = ctx;
    }
  }

  draw() {
    // TIPS: 频繁的ctx.save ctx.restore 会导致渲染卡顿
    // const { width, height } = sprite;
    // const { x, y } = sprite.offsetPosition;
    // ctx.fillStyle = "red";
    // ctx.font = "20px 微软雅黑";
    // ctx.fillText(sprite.name, x, y);
    // ctx.fillRect(x, y, width, height);
  }
}
