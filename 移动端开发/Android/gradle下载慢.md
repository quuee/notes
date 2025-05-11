## 最直接
直接到maven repository下载jar包  
放到C:\Users\xxx\.gradle\caches\modules-2\files-2.1下，注意查找jar包的文件名如：org.jetbrains.kotlin:kotlin-gradle-plugin  


Windows 环境下执行  
./gradlew.bat --debug  

*unix/Mac 环境下执行  
./gradlew --debug
或
bash ./gradlew --debug

## 全局配置
用户目录下的 .gradle/ 文件夹下创建文件 init.gradle (这个文件默认是没有创建的，需手动创建)，添加以下配置信息即可
```
settingsEvaluated { settings ->
    println "aliyun pluginManagement"
    settings.pluginManagement {
        repositories {
            maven { url "https://maven.aliyun.com/repository/gradle-plugin" }
            maven { url "https://maven.aliyun.com/repository/spring-plugin" }
            gradlePluginPortal()
        }
    }
}
```