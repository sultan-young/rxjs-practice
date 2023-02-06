import { filter, fromEvent, tap } from "rxjs"
import { Injectable } from "../frame/loC/loC";

interface Strategy {
    [key: string]: () => void
}

interface Control {
    register: (option: Strategy) => void
}

@Injectable()
export class KeyboardIoControl implements Control{
    private keydown$ = fromEvent<KeyboardEvent>(document.documentElement, 'keydown');
    private strategy: Strategy = {};

    constructor() {
        this.subscribeBehavior();
    }

    register(options: Strategy) {
        this.strategy = {
            ...this.strategy,
            ...options,
        }
    }

    private subscribeBehavior() {
        this.keydown$.pipe(
            filter(event => !!this.strategy[event.key]),
            tap((event) => {
                this.strategy[event.key]();
            })
        ).subscribe(event => {
        })
    }
    private jump() {
        console.log(111)
    }
}