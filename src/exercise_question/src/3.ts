/* 
    有页面A，当页面A处于激活状态时，每隔10秒，去调用一次API更新数据，但当离开页面A时，停止调用API，回到页面A时，重新执行以上操作。
    面试官当时提供了三个数据流，分别如下：
    数据流a: 每隔10秒发射一个数据的数据流；
    数据流b: focusin事件的数据流；
    数据流c: foucusout事件的数据流
*/

import { fromEvent, interval, switchMap, takeUntil, takeWhile, tap } from "rxjs";


const interval$ = interval(10000);
const blur$ = fromEvent(document.documentElement, "focusout");
const focus$ = fromEvent(document.documentElement, "focusin");

focus$.pipe(
  switchMap((_) =>
    interval$.pipe(
      tap(() => {
        console.log("发出请求");
      }),
      takeUntil(blur$)
    ),
  ),
);
