import {
  filter,
  from,
  fromEvent,
  map,
  of,
  switchMap,
  takeUntil,
  takeWhile,
  tap,
} from "rxjs";
import { createCards } from "./utils/create";

interface Position2d {
  x: number;
  y: number;
}

interface Info {
  el: HTMLElement;
  position: Position2d;
  sourceZIndex: string;
}

const cards = createCards(4);
const container = document.body;
container.append(...cards);

const containerUp$ = fromEvent(container, "mouseup");
const containerMove$ = fromEvent<MouseEvent>(container, "mousemove");
const containerDown$ = fromEvent<MouseEvent>(container, "mousedown").pipe(
  filter((event) => {
    const target = event.target as HTMLElement;
    if (!target) return false;
    const isBox = target.id.includes("box");
    return isBox;
  }),
  map((mousedownEvent): Info => {
    const target = mousedownEvent.target as HTMLElement;
    const [x = 0, y = 0] = target.style.transform
      .replace(/[^0-9\-,]/g, "")
      .split(",");
    return {
      el: target,
      position: {
        x: mousedownEvent.clientX - Number(x),
        y: mousedownEvent.clientY - Number(y),
      },
      sourceZIndex: target.style.zIndex,
    };
  }),
  tap(({ el }) => {
    el.style.zIndex = "1000";
  }),
  switchMap((info) =>
    containerMove$.pipe(
      takeUntil(containerUp$.pipe(
        tap(() => {
            info.el.style.zIndex = info.sourceZIndex
        })
      )),
      
      map(
        (moveEvent): Info => ({
          ...info,
          position: {
            x: moveEvent.clientX - info.position.x,
            y: moveEvent.clientY - info.position.y,
          },
        })
      )
    )
  ),
  tap((info) => {
    const { x, y } = info.position;
    info.el.style.transform = `translate(${x}px, ${y}px)`;
  })
);
containerDown$.subscribe((position) => {});
