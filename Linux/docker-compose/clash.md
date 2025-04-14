
### 作废（无法解析clash配置）
```yaml
services:
  clash-server:
    image: dreamacro/clash:v1.18.0
    container_name: clash
    ports:
      - "9090:9090"
      - "7890:7890"
      - "7891:7891"
    volumes:
      - /vol1/1000/DockerCompose/clash/config.yaml:/root/.config/clash/config.yaml
  clash-ui:
    image: haishanh/yacd:v0.3.8
    container_name: clash-ui
    ports:
      - 28890:80
```

### mihomo metacubexd

```yaml
services:
  clash-server:
    image: metacubex/mihomo:v1.19.4
    container_name: mihomo
    pid: host
    ipc: host
    network_mode: host
    cap_add:
      - ALL
    volumes:
      - /vol1/1000/DockerCompose/clash/:/root/.config/mihomo/
      - /dev/net/tun:/dev/net/tun
  clash-ui:
    image: mrxianyu/metacubexd-ui:v1.176.1
    container_name: clash-ui
    ports:
      - 28890:80
```


### 自动更新脚本

```shell
#!/bin/bash

# 下载配置文件
wget -O /vol1/1000/DockerCompose/clash/config.yaml "https://你的订阅链接&flag=clash"

# 检查下载是否成功
if [ $? -eq 0 ]; then

  sed -i "s/external-controller: '127.0.0.1:9090'/external-controller: '0.0.0.0:9090'/" "/vol1/1000/DockerCompose/clash/config.yaml"

  # 重新加载配置文件（参考官网API调用方法 https://clash.gitbook.io/doc/restful-api/config）：
  #curl --location --request PUT 'http://192.168.1.130:28890/configs' --header 'Content-Type: application/json' --data-raw '{"path": "/root/.config/clash/config.yaml"}'

  # 检查是否存在名为 'clash' 的容器
  if [ $(docker ps -q -f name=clash) ]; then
    # 停止容器
    echo "正在停止 clash 容器..."
    docker stop clash
    # 启动容器
    echo "正在启动 clash 容器..."
    docker start clash
    echo "Clash Docker 容器已成功重启。"
  else
    echo "未找到 clash 容器。"
  fi

else
  echo "配置文件下载失败!"
fi
```

### 设置代理
windows 网络 手动开启代理