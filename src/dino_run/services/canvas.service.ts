import { map, range } from "rxjs";
import { Injectable } from "../core/IoC/IoC";
import { DrawerService } from "./drawer.service";
import { randInteger } from "../util/random";
import { createCanvas } from "../util/canvas";

type MapInfo = {
  width: number;
  height: number;
};

// 场景
@Injectable({
  providedIn: "root",
})
export class CanvasService {
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  // 障碍物数量
  maxObstacles = 117;
  // 地图滚动速度 px/frame
  speed = 1;
  // 地图偏移量
  offsetLeft = 0;

  constructor() {}

  initMap(mapInfo: MapInfo) {
   this.create(mapInfo);
  }

  create(mapInfo: MapInfo) {
    const { canvas, ctx } = createCanvas(mapInfo);
    this.canvas = canvas;
    this.ctx = ctx;
  }

  update() {
    this.ctx.clearRect(0, 0, this.canvas.width , this.canvas.height)
    this.ctx.save()
    this.offsetLeft += this.speed;
    // console.log(' this.offsetLeft: ',  this.offsetLeft);
    this.ctx.translate(this.offsetLeft, 0);
    this.ctx.restore()
  }
}
