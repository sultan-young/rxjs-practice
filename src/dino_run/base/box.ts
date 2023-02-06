import { Behavior, BehaviorEnum } from "../behaviors";
import { BehaviorControl } from "../controls/keyboardIoControl";
import { v4 as uuidV4 } from "uuid";
import { BaseSprite } from "./baseSprite";

interface Point2D {
  x: number;
  y: number;
}

export class BaseBox extends BaseSprite{
  speed = 10;
  // 具有的行为列表
  behaviors: { [props in BehaviorEnum]?: Behavior } = {};
  currentBehaviors: BehaviorEnum[] = [];
  constructor(box: Partial<BaseBox>) {
    super(box);
    this.uuid = uuidV4();
  }
}
