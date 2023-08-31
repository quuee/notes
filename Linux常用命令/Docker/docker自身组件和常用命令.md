

## 基础镜像
### 环境基础镜像
| 镜像   | 大小 |     使用场景 |
| :----- | :--: | -------: |
| busybox |  1.15mb  | 临时测试（超级简化的linux） |
| distroless |  3.06mb  | 临时测试，几乎空白 |
| alpine |  4.41mb  | 临时测试，生产（基于busybox） |
| centos |  200mb  | 生产（追求稳定） |
| ubuntu |  81mb  | 生产，常用于AI |
| debian |  101mb  | 生产 |

### 编程语言基础镜像
python java nodejs

### 应用基础镜像
nginx tomcat jetty maven jenkins gitlab等

## docker --help 查看所有命令

## 构建镜像
[docker build](./docker%20build.md)
## dockerfile 
[dockerfile编写](./dockerfile编写.md)

## 拉取

docker pull getmeili/meilisearch:v1.3 

## RUN

### 环境参数

## 网络

## 卷

## 日志