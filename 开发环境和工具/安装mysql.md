
```shell
# 脚本1
docker run \
--name mysql \
-p 3306:3306 \
-v ${HOME}/mysql8/data:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=123456 \
-d \
mysql:8.0.37 \
--default-authentication-plugin=mysql_native_password \
--character-set-server=utf8mb4 \
--collation-server=utf8mb4_bin 

# 脚本2
docker run \
--name mysql8.4 \
-p 3306:3306 \
-v ${HOME}/mysql8/data:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=^password* \
-d \
mysql:8.4 \
--character-set-server=utf8mb4 \
--collation-server=utf8mb4_bin 
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


