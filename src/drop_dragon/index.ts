import {
  from,
  fromEvent,
  interval,
  map,
  mergeAll,
  mergeMap,
  startWith,
  switchMap,
  take,
  takeUntil,
  tap,
  timer,
  withLatestFrom,
  zip,
} from "rxjs";
import { createDragons } from "./utils/create";

interface Position2d {
  x: number;
  y: number;
}

const dragonNumber = 10;

const dragons = createDragons(dragonNumber);
document.body.append(...dragons);
const dragonLeader = dragons[0];

const dragons$ = from(dragons);
// const delayDragons$ = zip(
//   dragons$,
//   interval(100).pipe(startWith(0)),
//   (dragon, time) => dragon
// ).pipe(take(dragonNumber));

const delayDragons$ = timer(0, 100).pipe(
    map(i => dragons[i]),
    take(dragonNumber),
)

const mouseUp$ = fromEvent(document, "mouseup");
const mouseMove$ = fromEvent<MouseEvent>(document, "mousemove").pipe(
  map((event) => event),
  // 接受一个observable，当这个observable发出值时候，停止输出源输出值
  takeUntil(mouseUp$)
);
const mouseDown$ = fromEvent<MouseEvent>(dragonLeader, "mousedown").pipe(
  map((mousedownEvent) => {
    const [x = 0, y = 0] = dragonLeader.style.transform
      .replace(/[^0-9\-,]/g, "")
      .split(",");
    return {
        x: mousedownEvent.clientX - Number(x),
        y: mousedownEvent.clientY - Number(y),
      }
  }),
  mergeMap((initialPosition) =>
    mouseMove$.pipe(
      map((moveEvent) => ({
        x: moveEvent.clientX - initialPosition.x,
        y: moveEvent.clientY - initialPosition.y,
      }))
    )
  ),
  mergeMap((position) => {
    return delayDragons$.pipe(
      map((dragon) => [dragon, position] as [HTMLDivElement, Position2d])
    );
  })
);

mouseDown$.subscribe(([dragon, position]) => {
//   console.log("position: ", dragon, position);
  const { x, y } = position;
  dragon.style.transform = `translate(${x}px, ${y}px)`;
  //   console.log("event: ", event);
});
