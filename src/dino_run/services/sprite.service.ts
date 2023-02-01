import { BaseBox } from "../base/box";
import { BehaviorEnum } from "../behaviors";
import { JumpBehavior } from "../behaviors/jump.behavior";
import { Injectable } from "../frame/loC/loC";

@Injectable()
export class SpriteService {
    createMainCharacter() {
        return new BaseBox({
            width: 20,
            height: 40,
            offsetPosition: {
                x: 0,
                y: 100 - 40,
            },
            name: 'main',
            behaviors: {
                [BehaviorEnum.Jump]: new JumpBehavior()
            }
        })
    }
}