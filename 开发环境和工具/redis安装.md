```shell
# 拉取
docker pull redis:7.2.4

mkdir -p $PWD/redis/data
touch $PWD/redis/redis.conf

# 启动命令如下
docker run \
-p 6379:6379 \
--name redis \
-v $PWD/redis/redis.conf:/etc/redis/redis.conf \
-v $PWD/redis/data:/data \
-d redis:7.2.4 redis-server /etc/redis/redis.conf \
--appendonly yes \
--requirepass '123456'

docker exec -it redis bash #【进入容器】
redis-cli #【连接】
auth 123456 #【登录】
set hello world
get hello
```

```shell
docker run \
-p 6379:6379 \
--name redis \
-v ${HOME}/redis/redis.conf:/etc/redis/redis.conf \
-v ${HOME}/redis/data:/data \
-d redis:7.2.4 redis-server /etc/redis/redis.conf \
--appendonly yes \
--requirepass '123456'
```