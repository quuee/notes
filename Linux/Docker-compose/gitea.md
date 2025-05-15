```yaml
version: '3'

networks:
  gitea:
    external: false # 创建一个内部私有网络

services:
  server:
    image: gitea/gitea:1.23.8
    container_name: gitea
    environment:
      - USER_UID=1000
      - USER_GID=1000
      - GITEA__database__DB_TYPE=mysql
      - GITEA__database__HOST=db:3306
      - GITEA__database__NAME=gitea
      - GITEA__database__USER=gitea
      - GITEA__database__PASSWD=gitea233
    restart: unless-stopped
    networks:
      - gitea
    volumes:
      - /vol1/1000/DockerCompose/gitea/_data:/data
      - /etc/timezone:/etc/timezone:ro
      - /etc/localtime:/etc/localtime:ro
    ports:
      - '28896:3000'
      - '28897:22'
    depends_on:
      - db

  db:
    image: mysql:8.4.5-oraclelinux9
    container_name: gitea-mysql8
    restart: unless-stopped
    environment:
      - MYSQL_ROOT_PASSWORD=gitea_root
      - MYSQL_USER=gitea
      - MYSQL_PASSWORD=gitea233
      - MYSQL_DATABASE=gitea
    networks:
      - gitea
    volumes:
      - /vol1/1000/DockerCompose/gitea/_mysql:/var/lib/mysql
```

## 管理员

- 在第一次安装界面 可选设置 设置管理员。
- （没设置管理员）安装完后第一个注册的用户自动成为管理员
- 进入 docker 容器需修改管理员 `gitea admin user change-password --username AdminUserName --password NewAdminPwd --config /data/gitea/app.ini`
