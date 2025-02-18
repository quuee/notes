## 飞牛下的syncthing
安装在/vol2/@appdata/syncthing下

忘记密码，先关闭syncthing  
在/vol2/@appdata/syncthing/config.xml中删掉user password
重启syncthing访问
```xml
<gui enabled="true" tls="false" debugging="false">
   <address>127.0.0.1:8384</address>
   <user>syncguy</user>
   <password>$2a$10$s9wWHOQe...Cq7GPye69</password>
   <apikey>9RCKohqCAyrj5RjpyZdR2wXmQ9PyQFeN</apikey>
   <theme>default</theme>
</gui>
```
