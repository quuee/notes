## 介绍
有个闲置的usb摄像头，通过ffmpeg推流到nginx服务器，再打开nginx的页面查看画面。

### 项目路径
project/
├── Dockerfile
├── nginx.conf
├── index.html
├── start.sh
├── docker-compose.yaml

### dockerfile
```dockerfile
# 使用 Ubuntu 作为基础镜像
FROM ubuntu:22.04

# 安装依赖
RUN apt-get update && apt-get install -y \
    build-essential \
    libpcre3 \
    libpcre3-dev \
    libssl-dev \
    zlib1g-dev \
    wget \
    ffmpeg \
    v4l-utils \
    && rm -rf /var/lib/apt/lists/*

# 下载 Nginx 源码
RUN wget http://nginx.org/download/nginx-1.25.3.tar.gz && \
    tar -zxvf nginx-1.25.3.tar.gz && \
    rm nginx-1.25.3.tar.gz

# 下载 nginx-rtmp-module 源码
RUN wget https://github.com/arut/nginx-rtmp-module/archive/refs/tags/v1.2.2.tar.gz && \
    tar -zxvf v1.2.2.tar.gz && \
    rm v1.2.2.tar.gz

# 编译 Nginx 并添加 RTMP 模块
RUN cd nginx-1.25.3 && \
    ./configure --add-module=../nginx-rtmp-module-1.2.2 --with-http_ssl_module && \
    make && \
    make install

# 复制 Nginx 配置文件
COPY nginx.conf /usr/local/nginx/conf/nginx.conf

# 复制 Web 页面
COPY index.html /var/www/html/index.html

# 复制启动脚本
COPY start.sh /start.sh
RUN chmod +x /start.sh

# 暴露端口
EXPOSE 80 1935

# 设置 USB 摄像头设备
ENV CAMERA_DEVICE="/dev/video0"

# 启动脚本
CMD ["/start.sh"]
```
#### 如果github上不去，先开代理把nginx下载下来
```dockerfile
# 使用 Ubuntu 作为基础镜像
FROM ubuntu:22.04

# 安装依赖
RUN apt-get update && apt-get install -y \
    build-essential \
    libpcre3 \
    libpcre3-dev \
    libssl-dev \
    zlib1g-dev \
    ffmpeg \
    v4l-utils \
    && rm -rf /var/lib/apt/lists/*

COPY nginx-1.25.3.tar.gz nginx-rtmp-module-1.2.2.tar.gz /usr/local

WORKDIR /usr/local

# 下载 Nginx 源码
RUN tar -zxvf /usr/local/nginx-1.25.3.tar.gz  && \
    rm /usr/local/nginx-1.25.3.tar.gz

# 下载 nginx-rtmp-module 源码
RUN tar -zxvf /usr/local/nginx-rtmp-module-1.2.2.tar.gz && \
    rm /usr/local/nginx-rtmp-module-1.2.2.tar.gz

# 编译 Nginx 并添加 RTMP 模块
RUN cd /usr/local/nginx-1.25.3 && \
    ./configure --add-module=../nginx-rtmp-module-1.2.2 --with-http_ssl_module && \
    make && \
    make install

# 复制 Nginx 配置文件
COPY nginx.conf /usr/local/nginx/conf/nginx.conf

# 复制 Web 页面
COPY index.html /var/www/html/index.html

# 复制启动脚本
COPY start.sh /start.sh
RUN chmod +x /start.sh

# 暴露端口
EXPOSE 80 1935

# 设置 USB 摄像头设备
ENV CAMERA_DEVICE="/dev/video0"

# 启动脚本
CMD ["/start.sh"]
```

### 在 nginx.conf 中配置 RTMP 服务器和 HLS 支持。
```nginx
#user  nobody;
worker_processes auto;
rtmp_auto_push on;
events { }

rtmp {
    server {
        listen 1935;
        chunk_size 4096;

        application live {
            live on;
            allow publish all;
            allow play all;

            # 启用 HLS
            hls on;
            hls_path /var/www/html/stream/hls;

            ## 直播模式
            ## copy的配置
            wait_key on; #对视频切片进行保护，这样就不会产生马赛克了。
            hls_fragment 10s; #每个视频切片的时长。
            hls_playlist_length 30s; #总共可以回看的事件，这里设置的是1分钟。
            hls_continuous on; #连续模式。
            hls_cleanup on; #对多余的切片进行删除。
            hls_nested on; #嵌套模式。

            ## 录制模式
            #record all;
            #record_path /home/bucket;
            #record_unique on;
            #record_suffix _%Z_%Y%m%d_%H%M%S.flv; 

        }
    }
}

# HTTP 配置
http {
    server {
        listen 80;

        location / {
            root /var/www/html;
            index index.html;
        }

        location /hls {
            types {
                application/vnd.apple.mpegurl m3u8;
                video/mp2t ts;
            }
            root /var/www/html/stream;
            expires -1;
            add_header Cache-Control no-cache;
            #防止跨域问题
            add_header Access-Control-Allow-Origin *;
            add_header Access-Control-Allow-Headers X-Requested-With;
            add_header Access-Control-Allow-Methods GET,POST,OPTIONS;
        }
    }
}
```

### html
暂时播放不了
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Live Stream</title>
    <link href="https://vjs.zencdn.net/7.15.4/video-js.css" rel="stylesheet">
</head>
<body>
    <h1>Live Stream</h1>
    <video id="live-stream" class="video-js vjs-default-skin" controls preload="auto" width="640" height="480">
        <source src="http://192.168.1.142:28850/hls/usbcamera/index.m3u8" type="application/x-mpegURL">
        Your browser does not support the video tag.
    </video>

    <script src="https://vjs.zencdn.net/7.15.4/video.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/videojs-contrib-hls@5.15.0/dist/videojs-contrib-hls.min.js"></script>
    <script>
        var player = videojs('live-stream');
        player.play();
    </script>
</body>
</html>
```

### 启动脚本
```shell
#!/bin/bash

# 创建 HLS 目录
mkdir -p /var/www/html/stream/hls
chmod -R 755 /var/www/html
chmod -R 755 /var/www/html/stream

# 启动 ffmpeg 推流  rtmp://127.0.0.1:1935/live/usbcamera  rtmp://127.0.0.1/live/usbcamera 后面这个"usbcamera"随便填，但是要对得上
ffmpeg -f v4l2 -i $CAMERA_DEVICE -c:v libx264 -preset ultrafast -tune zerolatency -f flv rtmp://127.0.0.1/live/usbcamera &

# ffmpeg -re -i /dev/video0 -b:v 1500k -f flv rtmp://127.0.0.1/live/usbcamera &

# 启动 nginx
/usr/local/nginx/sbin/nginx -g "daemon off;"
```


### 查看自己的usb摄像头设备
我插上显示2个设备，拔掉2个都没，测试/dev/video0可以用
```shell
ls /dev/video*
```

### 构建镜像
```shell
docker build -t ffmpeg-nginx-camera .
```

### 运行docker容器
```shell
docker run --device=/dev/video0 -p 28850:80 -p 28851:1935 -d ffmpeg-nginx-camera
```

### compose
```yaml
services:
  ffmpeg-nginx-camera:
    image: ffmpeg-nginx-camera:latest
    container_name: ffmpeg-nginx-camera
    restart: always
    privileged: true
    ports:
      - 28850:80
      - 28851:1935
    devices:
      - "/dev/video0:/dev/video0"
```

### 一些问题
- [x] /var/www/html居然没有权限导致页面打不开 chmod -R 755 /var/www/html 解决
- [x] 因为我设备和nginx在同一台机子上，1935端口用处不大
- [ ] 需要等1-2分钟生成视频文件，不是实时。和rtmp这个模块生成切片文件有关
- [x] 目前只能用vlc播放(媒体->流->网络->页面的http://m3u8地址)
- [ ] 页面无法播放，不知是不是要转码才能播放
- [ ] 录制存储功能

