
import { concat, interval, map, merge, of, race, take } from "rxjs";

let stream1 = interval(200).pipe(take(3), map(i => [1,2,3][i]))
let stream2 = interval(200).pipe(take(3), map(i => ['a', 'b', 'c', 'd'][i]))
/**
 * race 多个流竞争
 * 它本身并对流进行任何组合，而是选择第一个产生值的流。一旦第一个流发出值后，其他的流就会被取消订阅，完全忽略掉。
 */
race(stream1, stream2).subscribe(value => {
    console.log(value)
})
// 输出 1 2 3
