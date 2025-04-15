

### V1 
```yaml
services:
  music-tag:
    image: xhongc/music_tag_web:latest
    container_name: music-tag-web
    network_mode: bridge
    ports:
      - "28885:8001"
    volumes:
      - /vol3/1000/MusicLibrary/常听:/app/media:rw
      - /vol1/1000/DockerCompose/musicTag/data:/app/data
    restart: unless-stopped
    command: /start
```

没效果，老失败

### V2 收费