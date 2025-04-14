
```yaml
services:
  wbo:
    container_name: wbo
    image: lovasoa/wbo:v1.20.1
    network_mode: bridge
    ports:
      - "28887:80"
    restart: unless-stopped
    volumes:
      - /vol1/1000/DockerCompose/wbo/data:/opt/app/server-data
```