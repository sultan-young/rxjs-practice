
import { concat, interval, map, merge, of, race, switchAll, switchMap, take } from "rxjs";

let stream1 = interval(400).pipe(take(3), map(i => [1,2,3][i]))
let stream2 = interval(200).pipe(take(3), map(i => ['a', 'b', 'c', 'd'][i]))
/**
 * SwitchAll 
 * 只会订阅最新的内部流并忽略(译者注: 忽略 = 取消订阅)前一个内部流。
 */
const switchStream = interval(1000).pipe(take(2), map(i => [stream1, stream2][i]));
switchStream.pipe(switchAll()).subscribe(value => {
    console.log(value)
})

// 等待1s 输出1 2后抛弃3， 转而输出 a b c（因为输出到3之前，stream2开始输出流了，所以switch会取消订阅stream1）



const switchMapStream = interval(1000).pipe(switchMap(i => [stream1, stream2][i]))
switchMapStream.subscribe(value => {
    console.log(value)
})
// 结果同上