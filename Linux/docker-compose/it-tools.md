
```yaml
services:
  it-tools:
    image: corentinth/it-tools
    container_name: itools
    network_mode: bridge
    volumes:
      - /vol1/1000/DockerCompose/itools/data:/data
    ports:
      - "28887:80"
    tty: true
    restart: unless-stopped
    environment:
      - TZ=Asia/Shanghai
```