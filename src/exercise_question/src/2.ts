/* 
    页面中有两个按钮A和B， 一个输入框input。按钮A和B点击时候，都会发出一个请求，然后
    将请求结果的字符串显示在input中。要求点击了A之后再点击B，输入框的内容总是最后点击的
    按钮触发的请求结果。
    先点A，再点B，此时A的结果应该被丢弃
*/

import { Subject, switchMap } from "rxjs";

// 假设这是你的http请求函数
function httpGet(url: any): any {
    return new Promise(resolve =>
      setTimeout(() => resolve(`Result: ${url}`), 2000)
    );
  }
  
  class abortableFetch {
    search: Subject<any>;
    constructor() {
      this.search = new Subject();
      this.init();
    }
    init() {
      this.search
        .pipe((switchMap as any)((value: any): any => httpGet(value)))
        .subscribe(val => console.log(val));
    }
  
    trigger(value: any) {
      this.search.next(value);
    }
  }
  
  // 使用方式，非常简单，就一个trigger方法就可以了
  const switchFetch = new abortableFetch();
  
  switchFetch.trigger(123);
  setTimeout(() => {
    switchFetch.trigger(456);
  }, 1000);
  