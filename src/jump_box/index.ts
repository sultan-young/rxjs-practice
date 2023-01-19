import { Injectable, LocContainer } from "./loC/loC";
import { CanvasService } from "./canvas";
import { getTime } from "./util/time";
import { BehaviorControl } from "./base/behaviorControl";

@Injectable()
class Game {
    constructor(private canvasService: CanvasService) {

    }
    start() {
        this.animate(getTime())
    }
    animate(lastAnimationTime: number) {
        const nowTime = getTime();
        // console.log(nowTime - lastAnimationTime)
        requestAnimationFrame(this.animate.bind(this, nowTime));
    }
}

const game = LocContainer.get(Game);
game.start()
// .start();


new BehaviorControl()