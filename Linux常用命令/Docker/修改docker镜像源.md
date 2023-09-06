## 修改源

sudo vim /etc/docker/daemon.json
```shell
{
    "registry-mirrors": [
        "https://docker.mirrors.ustc.edu.cn",
        "https://dockerproxy.com",
        "https://hub-mirror.c.163.com",
        "https://mirror.baidubce.com",
        "https://ccr.ccs.tencentyun.com"
    ]
}

sudo service docker restart 或 systemctl restart docker

```
查看
docker info
