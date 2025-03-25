

```yaml
services:
  mysql:
    image: mysql:8.4.3
    container_name: mysql
    restart: no
    privileged: true
    environment:
      MYSQL_ROOT_PASSWORD: rootpass
      TZ: Asia/Shanghai
      # 可选
      MYSQL_DATABASE: mydb
      MYSQL_USER: myuser
      MYSQL_PASSWORD: mypass
    ports:
      - "28860:3306"
    volumes:
      - /vol2/1000/Docker/mysql/data:/var/lib/mysql
      - /vol2/1000/Docker/mysql/config:/etc/mysql/conf.d/
      - /vol2/1000/Docker/mysql/log:/var/log/mysql
    command:
      --max_connections=1000
      --character-set-server=utf8mb4
      --collation-server=utf8mb4_general_ci
      # --default-authentication-plugin=mysql_native_password # 8.4配置这条启动不了
    # 容器日志大小配置
    logging:
      driver: 'json-file'
      options:
        max-size: '1g'
    networks:
      - trim-default
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "127.0.0.1", "--silent"]
      interval: 10s
      retries: 3
      timeout: 10s
      start_period: 60s
# 连接外部网络
networks:
  trim-default:
    external: true
```
 1. 如果在/etc/mysql/conf.d/下创建my.cnf文件,不会覆盖/etc/my.cnf的配置.
 2. mysqld: Can't read dir of '/etc/mysql/conf.d/ 权限不足 chmod 777 /vol2/1000/Docker/mysql/config

