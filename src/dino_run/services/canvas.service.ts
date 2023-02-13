import { map, range } from "rxjs";
import { BaseSprite } from "../base/baseSprite";
import { Injectable } from "../core/loC/loC";
import { DrawerService } from "./drawer.service";
import { randInteger } from "../util/random";

type MapInfo = {
  width: number;
  height: number;
};

// 场景
@Injectable({
  providedIn: "root",
})
export class MapService {
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  currentObstacles: BaseSprite[] = [];
  // 障碍物数量
  maxObstacles = 117;
  // 地图滚动速度 px/frame
  speed = 1;
  // 地图偏移量
  offsetLeft = 0;

  constructor() {}

  initMap(mapInfo: MapInfo) {
   this.createMap(mapInfo);
   this.createObstacle();
  }

  createMap(mapInfo: MapInfo) {
    const canvas = document.createElement("canvas");
    canvas.innerHTML = "您的浏览器不支持canvas，请更换高级浏览器";
    canvas.width = mapInfo.width;
    canvas.height = mapInfo.height;
    document.body.appendChild(canvas);
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d")!;
  }

  // 创建障碍物
  createObstacle() {
    /**
     * 障碍物规则：
     * 两个障碍物之前相聚100 - 200px
     * 高度在30 - 60之间
     *  宽度在20 - 40之间
     */
    let distance = 50;
    const Obstacle = new Array(this.maxObstacles).fill("").map((_, index) => {
      const height = randInteger(30, 60);
      const randomDistance = randInteger(100, 200);
      const sprite = new BaseSprite({
        width: randInteger(20, 40),
        height,
        name: index + '',
        offsetPosition: {
          x: distance + randomDistance,
          y: this.canvas.height - height,
        },
      });
      distance += randomDistance;
      return sprite;
    });
    this.currentObstacles.push(...Obstacle)
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
