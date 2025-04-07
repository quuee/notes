
```yaml

services:
    # reader 在线阅读
    # 手动更新方式 : docker-compose pull && docker-compose up -d
    reader:
        image: hectorqin/reader:3.2.13
        #image: hectorqin/reader:openj9-latest #docker镜像，arm64架构或小内存机器优先使用此镜像.启用需删除上一行
        container_name: reader 
        restart: unless-stopped
        ports:
            - 28885:8080 
        network_mode: bridge
        volumes:
            - /vol1/1000/DockerCompose/reader/logs:/logs #log映射目录 
            - /vol1/1000/DockerCompose/reader/storage:/storage #数据映射目录
        environment:
            - TZ=Asia/Shanghai
            - SPRING_PROFILES_ACTIVE=prod
            - READER_APP_USERLIMIT=50 #用户上限,默认50
            - READER_APP_USERBOOKLIMIT=999 #用户书籍上限,默认200
            - READER_APP_CACHECHAPTERCONTENT=true #开启缓存章节内容 V2.0
            # 下面都是多用户模式配置
            - READER_APP_SECURE=true #开启登录鉴权，开启后将支持多用户模式
            - READER_APP_SECUREKEY=MyPWD_adminreader  #管理员密码  建议修改
            - READER_APP_INVITECODE=111222333 #注册邀请码 建议修改,如不需要可注释或删除
            # 如果启用远程webview，需要取消注释下面的 remote-webview 服务
            # - READER_APP_REMOTEWEBVIEWAPI=http://remote-webview:8050 #开启远程webview
            # remote-webview:
            #   image: hectorqin/remote-webview
            #   container_name: remote-webview #容器名 可自行修改
            #   restart: always
            #   ports:
            #     - 8050:8050
            #   networks:
            #     - share_net


```