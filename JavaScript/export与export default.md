1. export与export default均可用于导出常量、函数、文件、模块等

2. 在一个文件或模块中，export、import可以有多个，export default仅有一个

3. 通过export方式导出，在导入时要加{ }，export default则不需要，并可以起任意名称
- (1) 输出单个值，使用export default

- (2) 输出多个值，使用export
```typescript
export {
    xxx
}
```

- (3) export default与普通的export不要同时使用

### 总结
1.export与export default都可用于导出常量、函数、类、文件、模块等

2.通过import (常量,函数,文件,类,模块,)名的方式,还可以根据路径导入样式文件，导入

3.一个文件模块中,export和import可以有多个,但是export default只能有一个

4.export default 暴露的成员可以用任意变量来接收

5.一个文件模块中,可以同时使用export和export default向外暴露成员,只不过接收方式不一样

6.通过export方式导出,在导入时必须要使用大括号{}来接收,export default则不需要

7. 通过export方式导出,可以使用 as起别名进行导出

