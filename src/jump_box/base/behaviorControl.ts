import { filter, fromEvent } from "rxjs"
import { BaseBox } from "./box";

interface Behavior {
    jump: () => void
}

export class BehaviorControl implements Behavior{
    host!: BaseBox;
    keydown$ = fromEvent<KeyboardEvent>(document.documentElement, 'keydown')
    constructor() {
        this.subscribeBehavior();
    }
    subscribeBehavior() {
        this.keydown$.pipe(
            filter(event => ['ArrowUp', 'w'].includes(event.key))
        ).subscribe(event => {
            this.jump();
        })
    }
    jump() {
        this.host.offsetPosition.y - 100;
    }
}