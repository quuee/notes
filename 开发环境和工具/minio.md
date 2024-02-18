## 安装
[官方文档](https://min.io/docs/minio/container/index.html)

```shell

mkdir -p ~/minio/data
mkdir -p ~/minio/config

docker run -d \
  --name minio \
   -p 9000:9000 \
   -p 9090:9090 \
   -v ~/minio/data:/data \
   -v ~/minio/config:/root/.minio \
   -e "MINIO_ROOT_USER=wuhou" \
   -e "MINIO_ROOT_PASSWORD=wuhoumusic321" \
   quay.io/minio/minio server \
   /data --console-address ":9090"

```

## java sdk

## bug
上传新的图片，预览还是之前的图片。磁盘缓存？