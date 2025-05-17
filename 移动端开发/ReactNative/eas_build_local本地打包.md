## eas build --local 本地安装

### node 环境

1. 下载 node.tar.xz
   解压

```shell
sudo nano /etc/profile

export NODE_HOME=/home/vvv/node
export PATH=$PATH:$NODE_HOME/bin

```

nano 操作是 ctrl+[字母]

### jdk 环境(不知道要不要)

```shell
sudo nano /etc/profile

export JAVA_HOME=/home/vvv/jdk
export PATH=$PATH:$JAVA_HOME/bin

```

```shell
source /etc/profile # 还是重启好用
```

### android_sdk

1. 需要先到 android studio 官网下载 commandlinetools-linux
2. 创建 android_sdk 目录，将 commandlinetools-linux 解压到此
3. 进入 commandline-tools/bin 目录
4. `./sdkmanager --sdk_root=/opt/android-sdk/ --list`查看所有可下载工具，`--sdk_root=`指定要下载的目录

5. 安装"platforms;android-33" 、 "platform-tools" 、"build-tools;33.0.3"

6. 配置 android_home（也可以一开始配置）

- export ANDROID_HOME=/home/vvv/android_sdk
- export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$ANDROID_HOME/platform-tools

7. eas.json
   添加要"android":{"buildType":"apk"}
8. 打包 eas build --platform android --profile preview --local 第一次要很久
