
```yaml
version: '3.8'
services:
  focalboard:
    image: mattermost/focalboard:latest
    container_name: focalboard
    restart: always
    ports:
      - 28880:8000
    volumes:
      - /vol2/1000/Docker/focalboard/data:/opt/focalboard/data #如果启动失败，因为没有默认数据。可以先启动一个容器把文件复制出来，再挂载
    networks:
      - trim-default
networks:
  trim-default:
    external: true
```

```yaml
services:
  focalboard:
    image: mattermost/focalboard:latest
    container_name: focalboard
    restart: unless-stopped
    network_mode: bridge
    ports:
      - 28883:8000
    volumes:
      - /vol1/1000/DockerCompose/focalboard/data:/opt/focalboard/data #如果启动失败，因为没有默认数
```