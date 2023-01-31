
import { combineLatest, concat, concatAll, forkJoin, from, interval, map, merge, of, race, take, takeWhile, tap, withLatestFrom, zip } from "rxjs";


/**
 * CombineLatest
 * 它可以取多个输入流中的最新值，并将这些值转换成一个单个值传递给结果流。
 * RxJS 会缓存每个输入流中的最新值，只有当所有输入流都至少发出一个值后才会使用投射函数(从之前缓存中取出最新值)来计算出结果值，然后通过结果流将计算的结果值发出。
 * 
 * 当所有输入流完成时，结果流就会完成，如何任意输入流报错，那么结果流就会报错。如果某个输入流没有完成的话，那么结果流便不会完成。
 * 换句话说，如何任何输入流没发出值就完成了，那么结果流也将完成，并且在完成的同时不会发出任何值，因为无法从已完成的输入流中取值放入到结果流中。
 * 还有，如果某个输入流即不发出值，也不完成，那么 combineLatest 将永远不会发出值以及完成，原因同上，它将一直等待全部的输入流都发出值。
 */
let stream1 = interval(300).pipe(take(3), map(i => [1,2,3][i]))
let stream2 = interval(200).pipe(take(3), map(i => ['a', 'b', 'c', 'd'][i]))

// combineLatest([stream1, stream2]).subscribe(value => {
//     console.log(value)
// })

// [1, 'a'] [1, 'b'] [2, 'b'] [2, 'c'] [3, c]


/**
 * WithLatestFrom
 * 当有一个主线流，同时还需要其他流的最新值时，可以使用此操作符。
 * 如同 combineLatest ，withLatestFrom 会一直等待每个输入流都至少发出一个值，当主线流完成时，结果流有可能在完成时从未发出过值。如果主线流不完成的话，那么结果流永远不会完成，如果任意输入流报错的话，结果流也将报错。
 */
// stream1.pipe(withLatestFrom(stream2)).subscribe(value => {
//     console.log(value)
// })
// [1, a] [2, c] [3, c]


/**
 * Zip
 * 它将两个及两个以上的输入流中的对应值组合成一个元祖(两个输入流的情况下为一对)。它会等待所有的输入流中都发出相对应的值后，再使用投射函数来将其转变成单个值，然后在结果流中发出。只有从每个输入流中凑齐对应的新值时，结果流才会发出值，因此如果其中一个输入流比另一个的值发出地更快，那么结果值发出的速率将由两个输入流中的较慢的那个决定。
 */
// zip([stream1, stream2]).subscribe(value => {
//     console.log(value)
// })
// [1, a] [2, b] [3, c]

/**
 * forkJoin
 * 有时候，有一组流，但你只关心每个流中的最后一个值。通常这些流也只有一个值。举个例子，你想要发起多个网络请求，并只想当所有请求都返回结果后再执行操作。此操作符的功能与 Promise.all 类似。但是，如果流中的值多于一个的话，除了最后一个值，其他都将被忽略掉。
 * 只有当所有输入流都完成时，结果流才会发出唯一的一个值。如果任意输入流不完成的话，那么结果流便永远不会完成，如何任意输入流报错的话，结果流也将报错。
 */
forkJoin([stream1, stream2]).subscribe(value => {
    console.log(value)
})
