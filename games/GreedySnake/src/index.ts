import {
  BehaviorSubject,
  distinctUntilChanged,
  filter,
  fromEvent,
  interval,
  map,
  scan,
  share,
  skip,
  tap,
  startWith,
  withLatestFrom,
  combineLatest,
  animationFrameScheduler,
  takeWhile,
  Observable,
  of,
  switchMap,
  first,
  delay,
  from,
  mergeMap,
} from "rxjs";
import { Key, Point2D, Scene } from "./type";
import {
  DIRECTIONS,
  FPS,
  POINTS_PER_APPLE,
  SNAKE_LENGTH,
  SPEED,
} from "./constants";
import {
  eat,
  generateApples,
  generateSnake,
  isGameOver,
  move,
  nextDirection,
} from "./utils/util";
import {
  createCanvasElement,
  renderGameOver,
  renderScene,
} from "./utils/canvas";

/**
 * Create canvas element and append it to the page
 */
let canvas = createCanvasElement();
let ctx = canvas.getContext("2d")!;
document.body.appendChild(canvas);

/**
 * Starting values
 */
const INITIAL_DIRECTION = DIRECTIONS[Key.RIGHT];

let ticks$ = interval(SPEED);

let click$ = fromEvent(document, "click");
let keydown$ = fromEvent<KeyboardEvent>(document, "keydown");

function createGame(fps$: Observable<number>): Observable<Scene> {
  let direction$ = keydown$.pipe(
    map((event) => DIRECTIONS[event.keyCode]),
    filter((direction) => !!direction),
    // 执行一个初始值
    startWith(INITIAL_DIRECTION),
    // 类似reduce
    scan(nextDirection),
    // 比较本次发出的值和上次是否相同，相同则进行忽略
    distinctUntilChanged()
  );

  let length$ = new BehaviorSubject<number>(SNAKE_LENGTH);

  let snakeLength$ = length$.pipe(
    scan((step, snakeLength) => snakeLength + step),
    // 将单播observable变为多播
    share()
  );

  let score$ = snakeLength$.pipe(
    startWith(0),
    scan((score, _) => score + POINTS_PER_APPLE)
  );

  let snake$: Observable<Array<Point2D>> = ticks$.pipe(
    withLatestFrom(direction$, snakeLength$, (_, direction, snakeLength) => [
      direction,
      snakeLength,
    ]),
    scan(move, generateSnake()),
    share()
  );

  let apples$ = snake$.pipe(
    scan(eat, generateApples()),
    distinctUntilChanged(),
    share()
  );

  let appleEaten$ = apples$
    .pipe(
      skip(1),
      tap(() => length$.next(POINTS_PER_APPLE))
    )
    .subscribe();

  let scene$: Observable<Scene> = combineLatest(
    snake$,
    apples$,
    score$,
    (snake, apples, score) => ({ snake, apples, score })
  );

  return fps$.pipe(withLatestFrom(scene$, (_, scene) => scene));
}

let game$ = of("Start Game").pipe(
  map(() => interval(1000 / FPS, animationFrameScheduler)),
  switchMap(createGame),
  // 只在满足条件时候继续执行next，不满足条件则执行complete
  takeWhile((scene) => !isGameOver(scene))
);

const startGame = () => {
  game$.subscribe({
    next: (scene) => {
        renderScene(ctx, scene);
    },
    complete: () => {
      renderGameOver(ctx);

      click$
        .pipe(
          // 只发出Observable的第一个值
          first()
        )
        .subscribe(startGame);
    },
  });
};

startGame();