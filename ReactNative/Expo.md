### 创建项目
- `npx create-expo-app Music_demo1 --template tabs` 带tabs导航

### 清理
`npx expo prebuild -p [ios/android] --clean`

### gradle下载超时，换国内镜像
在android->gradle->wrapper->gradle-wrapper.properties修改distributionUrl=https\://mirrors.cloud.tencent.com/gradle/gradle-8.10.2-all.zip

### gradle maven国内镜像
好像没什么用
```gradle
        //国内镜像
        maven { url 'https://repo.huaweicloud.com/repository/maven/' }
        maven { url 'https://mirrors.tuna.tsinghua.edu.cn/repository/maven/' }
        maven { url 'https://mirrors.cloud.tencent.com/nexus/repository/maven-public/' }
        maven { url 'https://mirrors.ustc.edu.cn/maven/' }
        maven { url 'https://repo.jd.com/maven/' }
        maven { url 'https://mirrors.ustc.edu.cn/maven-central/' }
        maven { url 'https://maven.aliyun.com/repository/public/' }
```

### ninja: error: 
mkdir (/node_modules/react-native-reanimated): No such file or directory  
换一个短路径目录

### 如何debug