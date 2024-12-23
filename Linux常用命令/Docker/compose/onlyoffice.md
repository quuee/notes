```yaml
services:
  onlyoffice:
    image: onlyoffice/documentserver:8.2
    container_name: onlyoffice
    restart: no
    ports:
      - 28870:80
      - 28871:443
    volumes:
      - /vol2/1000/Docker/onlyoffice/data:/var/www/onlyoffice/Data
      - /vol2/1000/Docker/onlyoffice/logs:/var/log/onlyoffice
      - /vol2/1000/Docker/onlyoffice/sdkjs-plugins:/var/www/onlyoffice/documentserver/sdkjs-plugins/plugin
    environment:
      - JWT_ENABLED=true
      - JWT_SECRET=admin123
      - ONLYOFFICE_LOCALE=zh-CN
    networks:
      - trim-default
networks:
  trim-default:
    external: true
```

/var/log/onlyoffice for ONLYOFFICE Docs logs
/var/www/onlyoffice/Data for certificates
/var/lib/onlyoffice for file cache
/var/lib/postgresql for database

-v /home/onlyoffice/documentServer/logs:/var/log/onlyoffice: 这将宿主机的 /home/onlyoffice/documentServer/logs 目录映射到容器内的 /var/log/onlyoffice 目录，用于存储日志文件,按需修改；
-v /home/onlyoffice/documentServer/data:/var/www/onlyoffice/Data: 这将宿主机的 /home/onlyoffice/documentServer/data 目录映射到容器内的 /var/www/onlyoffice/Data 目录，用于存储OnlyOffice Document Server的数据,按需修改；
-v /home/onlyoffice/documentServer/lib:/var/lib/onlyoffice: 这将宿主机的 /home/onlyoffice/documentServer/lib 目录映射到容器内的 /var/lib/onlyoffice 目录，用于存储OnlyOffice Document Server的库文件,按需修改；
-v /home/onlyoffice/documentServer/db:/var/lib/postgresql: 这将宿主机的 /home/onlyoffice/documentServer/db 目录映射到容器内的 /var/lib/postgresql 目录，用于存储PostgreSQL数据库数据,按需修改。

还需要在应用中集成onlyoffice