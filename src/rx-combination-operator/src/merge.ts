// 文档地址： https://github.com/RxJS-CN/rxjs-articles-translation/blob/master/articles/Learn-To-Combine-RxJS-Sequences-With-Super-Intuitive-Interactive-Diagrams.md
import {
  concat,
  interval,
  map,
  merge,
  mergeAll,
  mergeMap,
  Observable,
  of,
  race,
  take,
} from "rxjs";

/**
 * merge 并发的合并多个流并输出
 * 此操作符可以组合若干个流，然后并发地发出每个输入流中的所有值。一旦输入流中产生了值，这些值会作为结果流的一部分而被发出。这种过程在文档中通常被称之为打平 ( flattening ) 。
 */
let stream1 = interval(200).pipe(
  take(3),
  map((i) => [1, 2, 3][i])
);
let stream2 = interval(200).pipe(
  take(3),
  map((i) => ["a", "b", "c", "d"][i])
);
merge(stream1, stream2).subscribe(value => {
    console.log(value)
});
// 输出 1 a 2 b 3 c

/**
 * mergeAll 高阶observables
 * 此操作符会合并所有内部流发出的值，合并方式就如同 merge 操作符，是并发的。
 */

// mergeStream是一个高阶observable。 它本身是一个流，其输出的内容也是流
const mergeStream = interval(1000).pipe(
  take(2),
  map((i) => [stream1, stream2][i])
);
mergeStream.pipe(mergeAll()).subscribe((value) => {
  console.log(value);
});
// 这种写法相当于
// mergeStream.subscribe((value: Observable<any>) => {
//     value.subscribe((v) => {
//         console.log('v: ', v);
//     })
// })

/**
 * mergeMap
 * 所有 *Map 的操作符实际上都是通过两个步骤来生成高阶 observables 的，先映射成高阶 observables ，再通过相对应的组合逻辑来处理高阶 observables 所生成的内部流。
 * mergeMap 相当于 merge 和 map操作符的组合
 */
const mergeMapStream = interval(1000).pipe(
  take(2),
  mergeMap((i) => [stream1, stream2][i])
);
mergeMapStream.subscribe((value) => {
  console.log(value);
});

// 总结，merge是一个静态操作符，其可以合并两个流并并发输出结果。
// mergeAll 是一个实例操作符，可以对高阶流做合并操作
// mergeMap 是一个实例操作符，可以将一个流map成高阶流，再通过merge操作符来处理流结果 (concat 和 switch同理)
