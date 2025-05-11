## 前言
我们知道 js 执行的时候，一次只能执行一个任务，它会阻塞其他任务。由于这个缺陷导致 js 的所有网络操作，浏览器事件，都必须是异步执行。异步执行可以使用回调函数执行。
对于 ajax 网络请求就没有这么简单了，可能有多个网络请求是关联的，先执行某个请求返回结果后，第一个返回结果作为第二个请求的参数，调用第二个网络请求。如此，如果业务复杂，网络请求太多时，回调也很多，容易出现回调地狱。所以 Promise 出现了，专门解决异步回调地狱问题。
Promise 翻译成中文：承诺、保证。
通俗地讲，Promise 就像一个容器，里面存放着未来才会结束，返回结果的容器，返回的结果只需要在出口处接收就好了。从语法上讲，Promise 是一个对象，从它可以获取异步操作的消息。


## promise
Promise其实是一个构造函数，它有resolve，reject，race等静态方法;它的原型（prototype）上有then，catch方法，因此只要作为Promise的实例，都可以共享并调用Promise.prototype上面的方法(then,catch).
promise主要是为了解决js中多个异步回调难以维护和控制的问题.

## resolve和reject的具体用法
pending: 初始状态，成功或失败状态。
fulfilled: 意味着操作成功完成。
rejected: 意味着操作失败。

### resolve

```javascript

var p = new Promise(function (resolve, reject) {
            var timer = setTimeout(function () {
                console.log('执行操作1');
                resolve('这是数据1');
            }, 1000);
        });
        p.then(function (data) {
            console.log(data);
            console.log('这是成功操作');
        });
```
### reject
看了上面的实例，我相信应该也很容易理解reject方法了，就是调用reject方法后，Promise状态变为rejected，即操作失败状态
```javascript
var p = new Promise(function (resolve, reject) {
          var flag = false;
          if(flag){
            resolve('这是数据2');
          }else{
            reject('这是数据2');
          }
        });
        p.then(function(data){//状态为fulfilled时执行
            console.log(data);
            console.log('这是成功操作');
        },function(reason){ //状态为rejected时执行
            console.log(reason);
            console.log('这是失败的操作');
        });
```
## catch

```javascript
var p = new Promise(function (resolve, reject) {
            var flag = false;
            if(flag){
              resolve('这是数据2');
            }else{
              reject('这是数据2');
            }
          });
          p.then(function(data){
              console.log(data);
              console.log('这是成功操作');
          }).catch(function(reason){
              console.log(reason);
              console.log('这是失败的操作');
          });
```

### then await
Promise 的语法是 then/catch，而 async/await 的语法是 async/await 关键字。Promise 的 then 方法返回一个新的 Promise 对象，而 async/await 是直接使用 await 关键字等待异步结果