

```shell
# win 终端下 拷贝文件到linux
scp ./clash.zip x@192.168.1.7:/home/x/

```

```shell
# win 终端下 从linux拷贝文件到win
scp -P 22333 b233@192.168.1.142:/etc/docker/daemon.json /C:/Users/AX/Desktop/
```

```shell
# win 终端下 从win拷贝到linux
scp -P 22333 C:/Users/AX/Desktop/daemon.json  b233@192.168.1.142:/etc/docker/
```