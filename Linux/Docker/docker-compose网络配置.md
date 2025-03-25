在 Docker Compose 中，网络配置是通过 docker-compose.yml 文件中的 networks 部分来实现的。默认情况下，Compose 会为应用设置一个单一的网络，所有服务的容器都会加入这个默认网络，并且可以通过服务名称相互发现和通信。

## 默认网络和服务发现

例如，如果你有一个名为 myapp 的应用，其 docker-compose.yml 文件可能如下所示：
```yaml
version: "3"
services:
  web:
    build:
      ports:
        - "8000:8000"
    db:
      image: postgres
      ports:
        - "8001:5432"
```
当你运行 docker compose up 时，会创建一个名为 myapp_default 的网络。web 和 db 服务的容器将加入这个网络，并且可以通过服务名称 web 或 db 相互访问。例如，web 服务可以通过 postgres://db:5432 连接到 PostgreSQL 数据库。

## 自定义网络

你也可以通过顶级的 networks 键来指定自己的网络，这允许你创建更复杂的拓扑结构，并指定自定义的网络驱动和选项。每个服务可以通过服务级别的 networks 键来指定要连接的网络。

以下示例展示了一个定义了两个自定义网络的 docker-compose.yml 文件。proxy 服务与 db 服务是隔离的，因为它们没有共同的网络。只有 app 可以同时与两者通信：
```yaml
version: "3"
services:
  proxy:
    build: ./proxy
    networks:
      - frontend
  app:
    build: ./app
    networks:
      - frontend
      - backend
  db:
    image: postgres
    networks:
      - backend

networks:
  frontend:
    driver: custom-driver-1
  backend:
    driver: custom-driver-2
    driver_opts:
      foo: "1"
      bar: "2"
```

## 使用预先存在的网络

如果你希望你的容器加入一个已经存在的网络，可以使用 external 选项：
```yaml
networks:
  default:
    external:
      name: my-pre-existing-network
```
Compose 将不会尝试创建名为 [projectname]_default 的网络，而是寻找一个名为 my-pre-existing-network 的网络，并将应用的容器连接到它。

## 配置默认网络

你可以通过定义一个名为 default 的条目来更改应用范围内默认网络的设置：
```yaml
version: "3"
services:
  web:
    build:
    ports:
      - "8000:8000"
  db:
    image: postgres

networks:
  default:
    driver: custom-driver-1
```
## 静态 IP 地址配置

你还可以为连接到网络的服务配置静态 IP 地址，通过在服务的 networks 配置中设置 ipv4_address 或 ipv6_address：
```yaml
version: "3.8"
services:
  app:
    image: nginx:alpine
    networks:
      app_net:
        ipv4_address: 172.16.238.10
        ipv6_address: 2001:3984:3989::10

networks:
  app_net:
    ipam:
      config:
        - subnet: "172.16.238.0/24"
        - subnet: "2001:3984:3989::/64"
```
在这个例子中，服务 app 被分配了一个静态的 IPv4 和 IPv6 地址。

## 使用默认的bridge网络
```yaml
version: "3.2"
services:
  ABC:
    image: ABC/ABC:latest
    container_name: ABC
    ports:
      - "8088:80"
    restart: always
    network_mode: bridge
```
如果不配置任何网络，docker默认会以docker-compose.yml所在文件夹名称_default为名自动创建一个网络，所以必须指定network_mode: bridge。  

总的来说，Docker Compose 的网络配置提供了灵活性，允许你根据需要创建隔离的网络环境，或者将服务连接到预先存在的网络。通过合理使用 docker-compose.yml 文件中的相关字段，你可以满足大多数网络配置需求。