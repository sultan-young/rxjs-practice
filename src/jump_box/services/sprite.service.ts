import { BaseBox } from "../base/box";
import { BehaviorEnum } from "../behaviors";
import { JumpBehavior } from "../behaviors/jump.behavior";
import { Injectable } from "../loC/loC";

@Injectable()
export class SpriteService {
    createMainCharacter() {
        return new BaseBox({
            name: 'main',
            behaviors: {
                [BehaviorEnum.Jump]: new JumpBehavior()
            }
        })
    }
}