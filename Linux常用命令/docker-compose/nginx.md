
```yaml

services:
  nginx:
    image: nginx:latest
    container_name: nginx
    restart: always
    privileged: true
    environment:
      UID: ${TRIM_UID}
      GID: ${TRIM_GID}
      TZ: Asiz/Shanghai
    volumes:
      - /vol2/1000/Docker/nginx/html:/usr/share/nginx/html
      - /vol2/1000/Docker/nginx/conf:/etc/nginx
      - /vol2/1000/Docker/nginx/logs:/var/log/nginx
    network_mode: host
```


