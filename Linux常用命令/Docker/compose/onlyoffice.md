```yaml
services:
  onlyoffice:
    image: onlyoffice/documentserver:8.2
    container_name: onlyoffice
    restart: no
    ports:
      - 28870:80
      - 28871:443
    volumes:
      - /vol2/1000/Docker/onlyoffice/data:/var/www/onlyoffice/Data
      - /vol2/1000/Docker/onlyoffice/logs:/var/log/onlyoffice
      - /vol2/1000/Docker/onlyoffice/lib:/var/lib/onlyoffice
      - /vol2/1000/Docker/onlyoffice/postgresql:/var/lib/postgresql
      #- /vol2/1000/Docker/onlyoffice/documentserver:/etc/onlyoffice/documentserver  #需要先将配置文件cp出来后取消注释
    environment:
      - JWT_ENABLED=false # 不要验证
      - JWT_SECRET=admin123 #JWT_ENABLED=false,这条也要注释
      - JWT_HEADER=Authorization #JWT_ENABLED=false,这条也要注释
      - ONLYOFFICE_LOCALE=zh-CN #没用
    networks:
      - trim-default
networks:
  trim-default:
    external: true
```

/var/log/onlyoffice for ONLYOFFICE Docs logs
/var/www/onlyoffice/Data for certificates
/var/lib/onlyoffice for file cache
/var/lib/postgresql for database

-v /home/onlyoffice/documentServer/logs:/var/log/onlyoffice: 这将宿主机的 /home/onlyoffice/documentServer/logs 目录映射到容器内的 /var/log/onlyoffice 目录，用于存储日志文件,按需修改；
-v /home/onlyoffice/documentServer/data:/var/www/onlyoffice/Data: 这将宿主机的 /home/onlyoffice/documentServer/data 目录映射到容器内的 /var/www/onlyoffice/Data 目录，用于存储OnlyOffice Document Server的数据,按需修改；
-v /home/onlyoffice/documentServer/lib:/var/lib/onlyoffice: 这将宿主机的 /home/onlyoffice/documentServer/lib 目录映射到容器内的 /var/lib/onlyoffice 目录，用于存储OnlyOffice Document Server的库文件,按需修改；
-v /home/onlyoffice/documentServer/db:/var/lib/postgresql: 这将宿主机的 /home/onlyoffice/documentServer/db 目录映射到容器内的 /var/lib/postgresql 目录，用于存储PostgreSQL数据库数据,按需修改。

还需要在应用中集成onlyoffice,在alist网盘中开启预览

把这个页面放入nginx
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>OnlyOffice Viewer</title>
</head>
 
<body>
    <div id="placeholder"></div>
    <script type="text/javascript" src="http://主机IP:18081/web-apps/apps/api/documents/api.js"></script>
    <script>
        function getQueryParamValue(name) {
            const searchParams = new URLSearchParams(window.location.search);
            return searchParams.get(name);
        }
 
        const url = decodeURIComponent(getQueryParamValue("src"));
        const fileName = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('?') != -1 ? url.lastIndexOf('?') : url.length);
        const fileExtension = fileName.split('.').pop();
        const docEditor = new DocsAPI.DocEditor("placeholder", {
            "document": {
                "fileType": fileExtension,
                "permissions": {
                    "edit": false,
                    "comment": true,
                    "download": true,
                    "print": true,
                    "fillForms": true,
                },
                "title": fileName,
                "url": url,
            },
            "editorConfig": {
                "lang": "zh-CN",
                "mode": "view",
            },
            "height": "1080px",
            "type": "desktop",
        });
    </script>
</body>
</html>

```

在default.json文件中允许私有ip通过
```yaml
"request-filtering-agent" : {
      "allowPrivateIPAddress": true,
      "allowMetaIPAddress": true
},

```