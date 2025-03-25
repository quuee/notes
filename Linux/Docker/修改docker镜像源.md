## 修改源

sudo vim /etc/docker/daemon.json
```shell
{
    "registry-mirrors": [
        "https://dockerproxy.com",
        "https://hub-mirror.c.163.com",
        "https://mirror.baidubce.com",
        "https://docker.mirrors.sjtug.sjtu.edu.cn",
        "https://docker.nju.edu.cn",
        "https://ccr.ccs.tencentyun.com",

        "https://registry.docker-cn.com",
        "https://docker.mirrors.ustc.edu.cn",

        "https://docker.m.daocloud.io", 
        "https://noohub.ru", 
        "https://huecker.io",
        "https://dockerhub.timeweb.cloud"

    ]
}

sudo service docker restart 或 systemctl restart docker

```
查看
docker info
