
import { concat, concatAll, interval, map, merge, of, race, take } from "rxjs";

let stream1 = interval(200).pipe(take(3), map(i => [1,2,3][i]))
let stream2 = interval(200).pipe(take(3), map(i => ['a', 'b', 'c', 'd'][i]))
/**
 * concat 顺序输出多个流的值
 * 按照顺序订阅每个输入流并发出其中的所有值，同一时间只会存在一个订阅。只有当前输入流完成的情况下
 * 才会去订阅下一个输入流并将其值传递给结果流
 */
concat(stream1, stream2).subscribe(value => {
    console.log(value)
})
// 输出 1 2 3 a b c


const concatAllStream = interval(1000).pipe(map(i => [stream1, stream2][i]))
concatAllStream.pipe(concatAll()).subscribe(value => {
    console.log(value)
})
// 等待1s 输出 1 2 3 等待1s 输出 a b c