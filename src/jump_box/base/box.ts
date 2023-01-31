import { Behavior, BehaviorEnum } from "../behaviors";
import { BehaviorControl } from "../controls/behaviorControl";
import { v4 as uuidV4 } from "uuid";

interface Point2D {
  x: number;
  y: number;
}

export class BaseBox {
  uuid: string = "";
  name: string = "未命名";
  color: string = "pink";
  size = 60;
  speed = 10;
  worldPosition: Point2D = {
    x: 0,
    y: 0,
  };
  offsetPosition: Point2D = {
    x: 0,
    y: 0,
  };
  // 具有的行为列表
  behaviors: { [props in BehaviorEnum]?: Behavior } = {};
  currentBehaviors: BehaviorEnum[] = [];
  constructor(box: Partial<BaseBox>) {
    this.uuid = uuidV4();
  }

  update() {}
}
