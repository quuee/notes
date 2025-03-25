## 基础镜像

### 环境基础镜像

| 镜像         | 大小     | 使用场景               |
|:---------- |:------:| ------------------:|
| busybox    | 1.15mb | 临时测试（超级简化的linux）   |
| distroless | 3.06mb | 临时测试，几乎空白          |
| alpine     | 4.41mb | 临时测试，生产（基于busybox） |
| centos     | 200mb  | 生产（追求稳定）           |
| ubuntu     | 81mb   | 生产，常用于AI           |
| debian     | 101mb  | 生产                 |

### 编程语言基础镜像

python java nodejs

### 应用基础镜像

nginx tomcat jetty maven jenkins gitlab等

## docker --help 查看所有命令

### build

[docker build](./docker%20build.md)

### dockerfile

[dockerfile编写](./dockerfile编写.md)

### pull

docker pull getmeili/meilisearch:v1.3 

### save
docker save 保存的是镜像（image）

### export
docker export 保存的是容器（container）

### load import
docker load 用来载入镜像包，docker import 用来载入容器包，但两者都会恢复为镜像

## RUN 语法

docker run [选项] image

### 选项

-i, 分配一个终端

-t, 进入容器，一般-it一起使用（纯操作系统的镜像，没有守护进程的，需要加-it，否则启动后自动退出容器）

-d, 让容器后台运行

--privileged=true, 开启特权

--name, 取个名字

--rm, 退出容器后，删除容器（一般测试用）

--hostname, 设置容器里面的主机名字

--restart, 容器退出时重启，[1、no，默认，退出不重启]、[2、on-failure，容器非正常退出时重启。on-failure:3 ，重试3次]、[3、always，容器退出时总是重启]、[4、unless-stopped，容器退出时重启；如果时正常stopped，然后系统或服务重启，容器不会被restart]、 [更改容器重启策略：docker update --restart=awayls test]

--network, [bridge 默认docker0网卡]、[host 使用宿主机网络]、[使用其他容器网络]、[使用自己定义的网络]

--link, 通过容器名访问

--cpus=1 -m 512m, 指定cpu 内存上限

-v, 挂载，挂载时设置读写权限[ro:只读][rw:读写] [-v /opt/nginx:/opt/test:ro]

-w, 指定容器工作目录

-p, 端口映射

-e,--env, 声明环境变量，在容器内部可以使用export查看

--device, 添加一个宿主机设备，让容器拥有访问这个设备的权限

--shm-size, 共享内存

--dns 114.114.114.114, 指定容器内部dns

--add-host www.abc.com:1.1.1.1, 手动往容器的/etc/host 文件注入主机名到ip地址映射



## 网络

## 卷

## 日志

## 其他命令

### 查看容器信息
docker inspect [容器]
### 时间同步
1、
```
docker run -v /etc/localtime:/etc/localtime:ro 
```
2、
```dockerfile
ENV TimeZone=Asia/Shanghai 
RUN ln -snf /usr/share/zoneinfo/$TimeZone /etc/localtime && echo $TimeZone > /etc/timezone 

# CentOS
RUN echo "Asia/shanghai" > /etc/timezone
# Ubuntu
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```
3、docker compose
```docker-compose
environment:
  TZ: Asia/Shanghai
```
4、
```shell
docker cp /etc/localtime 【容器ID或者NAME】:/etc/localtime
docker cp -L /usr/share/zoneinfo/Asia/Shanghai 【容器ID或者NAME】:/etc/localtime
```

### restart参数
Docker容器的重启策略如下：
- no，默认策略，在容器退出时不重启容器
- on-failure，在容器非正常退出时（退出状态非0），才会重启容器
- on-failure:3，在容器非正常退出时重启容器，最多重启3次
- always，在容器退出时总是重启容器
- unless-stopped，在容器退出时总是重启容器，但是不考虑在Docker守护进程启动时就已经停止了的容器
