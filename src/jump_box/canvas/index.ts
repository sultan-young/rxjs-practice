import { Injectable } from "../loC/loC";
import { DrawerService } from "./drawer.service";

// 场景
@Injectable({
  providedIn: "root",
})
export class CanvasService {
  canvas !: HTMLCanvasElement;

  constructor(private DrawerService: DrawerService) {
    this.createMap();
  }
  createMap() {
    const canvas = document.createElement('canvas');
    canvas.innerHTML = '您的浏览器不支持canvas，请更换高级浏览器';
    canvas.width = document.documentElement.clientWidth;
    canvas.height = 200;
    canvas.style.background = 'pink'
    document.body.appendChild(canvas);
    this.canvas = canvas;
    const ctx = this.canvas.getContext('2d')!;
    // ctx.translate(100, 0)
    ctx?.fillRect(0, 200 - 60, 60, 60)
  }
}
