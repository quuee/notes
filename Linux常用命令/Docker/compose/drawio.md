
```yaml
version: '3.8'
services:
  photopea:
    image: jgraph/drawio:24.7.17
    container_name: drawio
    restart: always
    privileged: true
    environment:
      UID: ${TRIM_UID}
      GID: ${TRIM_GID}
      TZ: Asiz/Shanghai
    ports:
      - "28888:8080"
    networks:
      - trim-default
networks:
  trim-default:
    external: true
```
#volumes:
      # -v /vol1/1000/Docker/drawio/drawiojs:/usr/local/tomcat/webapps/draw/js/