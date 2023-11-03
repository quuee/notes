## 官方安装
[官方安装](https://docs.docker.com/engine/install/ubuntu/)

## 清华源安装（推荐）
[清华源安装](https://mirror.tuna.tsinghua.edu.cn/help/docker-ce/)

## docker 安装（脚本）

github 搜索 docker install

```shell
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

## 卸载

```shell
sudo apt-get purge docker-ce docker-ce-cli containerd.io

sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd
```

安装后用户权限

https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user

```shell
sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker 
# 验证
docker run hello-world
```
## 镜像源
/etc/docker/daemon.json
```json
{
  "registry-mirrors": [
    "https://docker.m.daocloud.io",
    "https://dockerproxy.com",
    "https://docker.mirrors.ustc.edu.cn",
    "https://docker.nju.edu.cn",
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com",
    "https://docker.nju.edu.cn",
    
  ],
  "max-concurrent-downloads": 10,
  "insecure-registries": [],
  "debug": true,
  "experimental": false,
  "features": {
    "buildkit": true
  }
}

```

## 安装docker管理工具 lazydocker

直接将文件解压到/usr/local/bin目录下
然后在终端执行 lazydocker  （sudo chmod +x）加下权限

## docker compose 安装

参考链接 https://docs.docker.com/compose/install/linux/

```shell
sudo curl -SL https://github.com/docker/compose/releases/download/v2.13.0/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose
```

启动

```shell
docker-compose -f docker-compose.yaml up -d
```
