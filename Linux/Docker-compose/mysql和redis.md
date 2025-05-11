```yaml
version: '3.9'
services:
  db:
    image: mysql:8.0.31
    container_name: mysql8
    environment:
      MYSQL_ROOT_PASSWORD: '123456'
      TZ: 'Asia/Shanghai'

    ports:
      - 33060:3306
    volumes:
      - ${HOME}/mysql:/var/lib/mysql
    command:
      - default-authentication-plugin=mysql_native_password
      - character-set-server=utf8mb4
      - collation-server=utf8mb4_bin
    networks:
      - myweb

  redis:
    image: redis:7.0.5
    container_name: redis7
    environment:
      TZ: 'Asia/Shanghai'
    ports:
      - 6379:6379
    volumes:
      - ${HOME}/redis:/var/lib/redis
    command:
      - requirepass=123456
      - appendonly=yes
    networks:
      - myweb

networks:
  myweb:
    driver: bridge
```

### 数据导入导出

```shell
docker exec -it [容器] mysqldump -uroot -p123456 [数据库名] > /opt/bak.sql
```

```shell
docker cp [容器]:/opt/bak.sql /home/sky/bak.sql    #从容器到linux宿主机
scp sky@192.168.2.13:/home/sky/bak.sql c:/Users/x    #从linux到win
scp c:/Users/x/bak.sql sky@192.168.2.12:/home/sky    #从win到linux
docker exec -it [容器] /bin/bash  #进入容器
mysql -uroot -p123456  # 登录mysql
show databases;
use [数据库];
source /home/bak.sql;
```
