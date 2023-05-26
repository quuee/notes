```shell
docker run \
--name mysql \
-p 3306:3306 \
-v ${HOME}/data:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=123456 \
-d \
mysql:8.0.31 \
--default-authentication-plugin=mysql_native_password \
--character-set-server=utf8mb4 \
--collation-server=utf8mb4_bin 
```
