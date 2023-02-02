import { createCanvas } from "../util/canvas";

export interface GameConfig {
  mapSize: ClientSize;
  mapContainer: HTMLElement;
}

export interface ClientSize {
  width: number;
  height: number;
}

// 通用game类
export abstract class GameRunner {
  public canvas!: HTMLCanvasElement;
  public ctx!: CanvasRenderingContext2D;

  // 游戏基础配置
  public readonly GameConfig: GameConfig = {
    mapSize: {
      width: 600,
      height: 150,
    },
    mapContainer: document.documentElement,
  };

  private gameState = {
    paused: false,
    fps: 0,
    lastFrameTime: 0,
  };

  constructor(gameDefaultConfig?: GameConfig) {
    this.gameLoop = this.gameLoop.bind(this);

    if (gameDefaultConfig) {
      Object.assign(this, gameDefaultConfig);
    }
  }

  // 预加载
  async preLoad(): Promise<void> {}
  // 游戏主绘制函数
  abstract draw(): void;

  // 开始游戏
  async start() {
    if (!this.canvas || !this.ctx) {
        const { canvas, ctx } = createCanvas(this.GameConfig.mapSize);
        this.canvas = canvas;
        this.ctx = ctx;
        this.GameConfig.mapContainer.appendChild(canvas);
    }
    await this.preLoad();
    this.gameState.paused = false;
    requestAnimationFrame(this.gameLoop);
  }

  // 暂停游戏
  pause() {}

  // 恢复暂停
  unPause() {}

  // 重置游戏
  reset() {}

  // 游戏主循环线程
  private gameLoop(timestamp: number) {
    const { lastFrameTime } = this.gameState;
    // 游戏是否暂停中
    if (this.gameState.paused) return;
    this.draw();
    this.gameState.fps = Math.round(1000 / (timestamp - lastFrameTime));
    this.gameState.lastFrameTime = timestamp;
    requestAnimationFrame(this.gameLoop);
  }

  get fps() {
    return this.gameState.fps;
  }
}
