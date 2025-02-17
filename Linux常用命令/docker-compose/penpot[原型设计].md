## 官方文档
https://help.penpot.app/technical-guide/getting-started/#install-with-docker

## 项目地址
https://github.com/penpot/penpot

## 修改compose

```yaml
version: "3.8"

networks:
  penpot:

volumes:
  penpot_postgres_v15:
  penpot_assets:


services:

  penpot-frontend:
    image: "penpotapp/frontend:latest"
    restart: always
    ports:
      - 9001:80

    volumes:
      - penpot_assets:/opt/data/assets

    depends_on:
      - penpot-backend
      - penpot-exporter

    networks:
      - penpot

    labels:
      - "traefik.enable=true"

    environment:
      - PENPOT_FLAGS=enable-registration enable-login-with-password disable-smtp

  penpot-backend:
    image: "penpotapp/backend:latest"
    restart: always

    volumes:
      - penpot_assets:/opt/data/assets

    depends_on:
      - penpot-postgres
      - penpot-redis

    networks:
      - penpot


    environment:
      - PENPOT_FLAGS=enable-registration disable-secure-session-cookies

      - PENPOT_PUBLIC_URI=http://0.0.0.0:9001

      - PENPOT_DATABASE_URI=postgresql://penpot-postgres/penpot
      - PENPOT_DATABASE_USERNAME=penpot
      - PENPOT_DATABASE_PASSWORD=penpot

      - PENPOT_REDIS_URI=redis://penpot-redis/0

      - PENPOT_ASSETS_STORAGE_BACKEND=assets-fs
      - PENPOT_STORAGE_ASSETS_FS_DIRECTORY=/opt/data/assets

      - PENPOT_TELEMETRY_ENABLED=true

    #   - PENPOT_SMTP_DEFAULT_FROM=naageo@163.com
    #   - PENPOT_SMTP_DEFAULT_REPLY_TO=naageo@163.com
    #   - PENPOT_SMTP_HOST=penpot-mailcatch
    #   - PENPOT_SMTP_PORT=1025
    #   - PENPOT_SMTP_USERNAME=naageo
    #   - PENPOT_SMTP_PASSWORD=shouquanma123456
    #   - PENPOT_SMTP_TLS=false
    #   - PENPOT_SMTP_SSL=false

  penpot-exporter:
    image: "penpotapp/exporter:latest"
    restart: always
    networks:
      - penpot

    environment:
      # Don't touch it; this uses internal docker network to
      # communicate with the frontend.
      - PENPOT_PUBLIC_URI=http://penpot-frontend

      ## Redis is used for the websockets notifications.
      - PENPOT_REDIS_URI=redis://penpot-redis/0

  penpot-postgres:
    image: "postgres:15"
    restart: always
    ports:
      - 55432:5432

    stop_signal: SIGINT

    volumes:
      - penpot_postgres_v15:/var/lib/postgresql/data

    networks:
      - penpot

    environment:
      - POSTGRES_INITDB_ARGS=--data-checksums
      - POSTGRES_DB=penpot
      - POSTGRES_USER=penpot
      - POSTGRES_PASSWORD=penpot

  penpot-redis:
    image: redis:7
    restart: always
    networks:
      - penpot


#   penpot-mailcatch:
#     image: sj26/mailcatcher:latest
#     restart: always
#     expose:
#       - '1025'
#     ports:
#       - "1080:1080"
#     networks:
#       - penpot

```

## 启动

## 注册

## 无法登录
dbeaver连接数据库,修改profile表,将is_active改为True  
刷新重新登陆

