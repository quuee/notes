### 查看docker各类型文件占用情况
docker system df

### 查看每个image、container占用情况
docker system df -v

### 清理磁盘，删除关闭的容器、无用的数据卷和网络，以及dangling镜像（即无tag的镜像）
docker system prune

docker system prune -a

### 删除所有关闭的容器：

docker ps -a | grep Exit | cut -d ' ' -f 1 | xargs docker rm

### 删除所有dangling镜像（即无tag的镜像）

docker rmi $(docker images | grep "^<none>" | awk "{print $3}")

### 删除所有dangling数据卷（即无用的Volume）
docker volume rm $(docker volume ls -qf dangling=true)

### 查看当前目录下各个文件及目录占用空间大小 及排序
du -sh * | sort -n

