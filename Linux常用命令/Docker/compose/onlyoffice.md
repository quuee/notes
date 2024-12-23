```yaml
services:
  onlyoffice:
    image: onlyoffice/documentserver:8.2
    container_name: onlyoffice
    restart: always
    ports:
      - 28870:80
      - 28871:443
    volumes:
      - /vol2/1000/Docker/onlyoffice/data:/var/www/onlyoffice/Data
      - /vol2/1000/Docker/onlyoffice/logs:/var/log/onlyoffice
    networks:
     - trim-default
networks:
  trim-default:
    external: true
```