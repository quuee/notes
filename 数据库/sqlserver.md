## sqlserver

```shell
docker run --name MSSQL_1433 -m 512m \
 -e 'ACCEPT_EULA=Y' \
 -e 'SA_PASSWORD=123456$%^!@#' \
 -v /var/opt/mssql/data:/var/opt/mssql/data \
 -p 1433:1433 \
 --net=host \
 -d microsoft/mssql-server-linux
```
(使用主机网络模式时将丢弃已发布的端口) --host=net -p就不用了
