import { filter, fromEvent, tap } from "rxjs";
import { Injectable } from "../frame/loC/loC";

type fnc = () => void;
interface Strategy {
  [key: string]: fnc | Keyboard;
}

interface Keyboard {
  up?: fnc;
  down?: fnc;
}

interface Control {
  register: (option: Strategy) => void;
}

@Injectable()
export class KeyboardIoControl implements Control {
  private keydown$ = fromEvent<KeyboardEvent>(
    document.documentElement,
    "keydown"
  );
  private keyUp$ = fromEvent<KeyboardEvent>(document.documentElement, "keyup");
  private strategy: Strategy = {};

  constructor() {
    this.subscribeBehavior();
  }

  register(options: Strategy) {
    this.strategy = {
      ...this.strategy,
      ...options,
    };
  }

  private subscribeBehavior() {
    // 监听按下事件
    this.keydown$
      .pipe(
        tap((event) => {
          console.log('event: ', event);
          const callBack = this.strategy[event.key];
          if (typeof callBack === "function") {
            callBack();
          }
          if (typeof callBack === "object" && callBack.down) {
            callBack.down();
          }
        })
      )
      .subscribe((event) => {});

    // 监听按键抬起事件
    this.keyUp$
      .pipe(
        filter((event) => !!this.strategy[event.key]),
        tap((event) => {
          const callBack = this.strategy[event.key];
          if (typeof callBack === "object" && callBack.up) {
            callBack.up();
          }
        })
      )
      .subscribe((event) => {});
  }
  private jump() {
    console.log(111);
  }
}
