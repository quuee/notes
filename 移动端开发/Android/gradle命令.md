## gradle 任务查询命令
```
查看任务
./gradlew tasks
查看所有任务 包括缓存任务等
./gradlew tasks --all
对某个module [moduleName] 的某个任务[TaskName] 运行
./gradlew :moduleName:taskName
```

## 快速构建命令
```
查看构建版本
./gradlew -v
清除build文件夹
./gradlew clean
检查依赖并编译打包
./gradlew build
编译并安装debug包
./gradlew installDebug
编译并打印日志
./gradlew build --info
译并输出性能报告，性能报告一般在 构建工程根目录 build/reports/profile
./gradlew build --profile
调试模式构建并打印堆栈日志
./gradlew build --info --debug --stacktrace
强制更新最新依赖，清除构建并构建
./gradlew clean build --refresh-dependencies
```

[参考](https://juejin.cn/post/6974279704836571143)