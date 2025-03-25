## 常用环境变量

```shell
#java
export JAVA_HOME=/opt/jdk-17.0.8
export PATH=$JAVA_HOME/bin:$PATH
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lob/tools.jar

#node
export NODE_PATH=/opt/node-v18.17.1
export PATH=$NODE_PATH/bin:$PATH

#maven
export MAVEN_HOME=/opt/maven-3.9.4
export PATH=$MAVEN_HOME/bin:$PATH

#flutter
export FLUTTER_HOME=/opt/flutter_3.13.4
export PATH=$FLUTTER_HOME/bin:$PATH
## flutter pub 换七牛云
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn

```

## 前后$PATH区别
<p>
PATH=$FLUTTER_HOME/bin:$PATH 将FLUTTER_HOME的可执行文件路径添加到环境变量PATH最`前面`，系统优先在该路径下查找。</p>
<p>
PATH=$FLUTTER_HOME/bin 将FLUTTER_HOME的可执行文件路径添加到环境变量PATH最`后面`，在其他路径找不到的情况下才到这里找。</p>