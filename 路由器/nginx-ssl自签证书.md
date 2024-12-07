## 生成自签ssl证书

### 路由器安装nginx
系统->软件包  
直接安装nginx-full全编译版本

### ssh登录路由器
```shell
ssh root@192.168.1.1 # 登录命令
# 登录后
cd /etc/nginx
# 1 创建服务器证书密钥文件 server.key：
openssl genrsa -des3 -out server.key 1024
# 输入密码，确认密码，自己随便定义，但是要记住，后面会用到。
Enter PEM pass phrase:
Verifying - Enter PEM pass phrase:
# 2 创建服务器证书的申请文件 server.csr
openssl req -new -key server.key -out server.csr
# 这里要你填一些相关信息
Enter pass phrase for server.key: # 之前的密码
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [AU]:CN # 国家代号
State or Province Name (full name) [Some-State]:zhejiang # 省
Locality Name (eg, city) []:wenzhou # 市
Organization Name (eg, company) [Internet Widgits Pty Ltd]:MyCompany Corp # 公司名
Organizational Unit Name (eg, section) []: #可以不输入 
Common Name (e.g. server FQDN or YOUR name) []: #可以不输入 
Email Address []: #邮箱,随意

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []: #可以不输入 
An optional company name []: #可以不输入 

# 3备份一份服务器密钥文件
cp server.key server.key.bak
# 4去除文件口令
openssl rsa -in server.key.bak -out server.key
# 5生成证书文件server.crt 1825天
openssl x509 -req -days 1825 -in server.csr -signkey server.key -out server.crt

mkdir cert
mv server.key ./cert
mv server.crt ./cert
```

### 配置nginx.conf文件
先在win弄好再复制进去
```conf
#user  nobody;
worker_processes  1;
#worker_processes  auto;
#pid /run/nginx.pid;
 
events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;

    keepalive_timeout  65;
 
    gzip  on;

    ssl_certificate /etc/nginx/cert/server.crt;
    ssl_certificate_key /etc/nginx/cert/server.key;
    ssl_session_cache shared:SSL:32k;
    ssl_session_timeout 30m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_protocols TLSv1 TLSV1.1 TLSV1.2;
    ssl_prefer_server_ciphers on;
 
    server {
        # open-webui
        listen       [::]:28882 ssl;
        # listen       28882;
        # server_name openwrt2333ax6000.dynv6.net; #如果写了ip,server_name会失效;如果只写了端口,那么server_name会去匹配
        location / {
            proxy_pass http://192.168.1.142:28882;
        } 
    }

    server {
        # nas-navidrome
        listen       [::]:4533 ssl;
        location / {
            proxy_pass http://192.168.1.142:4533;
        } 
    }
 
    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;
 
    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}
 
 
    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;
 
    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;
 
    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;
 
    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;
 
    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}
 
}
```

### 拷贝进路由器

```shell
# scp -O [你的nginx.conf路径] root@192.168.1.1:/etc/nginx/
scp -O nginx.conf root@192.168.1.1:/etc/nginx/
```
-O是传统模式
也可以用winscp工具拷贝进去

### nginx加载nginx.conf文件
```shell
nginx -c /etc/nginx/nginx.conf
nginx -s reload
```

### 路由器配置
![](./端口转发.png)
![](./端口转发2.png)
之前在 网络->防火墙->通信规则 里创建的对应的端口规则可以弃用了