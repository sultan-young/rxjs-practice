/* 实现一个批量请求函数 multiRequest(urls, maxNum)，要求如下：
• 要求最大并发数 maxNum
• 每当有一个请求返回，就留下一个空位，可以增加新的请求
• 所有请求完成后，结果按照 urls 里面的顺序依次打出
*/

import { from, mergeMap } from "rxjs";

// 假设这是你的http请求函数
function httpGet(url: string) {
  return new Promise((resolve) =>
    setTimeout(() => resolve(`Result: ${url}`), 2000)
  );
}

function multiRequest(urls: string[], maxNum: number) {
    from(urls).pipe(
        mergeMap(httpGet, 2)
    ).subscribe(value => {
        console.log(value)
    })
}

const array = [
  "https://httpbin.org/ip",
  "https://httpbin.org/user-agent",
  "https://httpbin.org/delay/3",
  "https://httpbin.org/delay/4",
  "https://httpbin.org/delay/5",
];

multiRequest(array, 3)