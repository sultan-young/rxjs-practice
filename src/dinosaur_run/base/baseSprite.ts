import { Behavior, BehaviorEnum } from "../behaviors";
import { v4 as uuidV4 } from "uuid";

interface Point2D {
  x: number;
  y: number;
}

export class BaseSprite {
  uuid: string = "";
  name: string = "未命名";
  color: string = "pink";
  width = 60;
  height = 60;
  worldPosition: Point2D = {
    x: 0,
    y: 0,
  };
  offsetPosition: Point2D = {
    x: 0,
    y: 0,
  };
  constructor(box: Partial<BaseSprite>) {
    this.uuid = uuidV4();
    Object.assign(this, box);
  }
}
