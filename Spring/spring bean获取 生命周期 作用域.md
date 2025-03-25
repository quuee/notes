spring中bean默认是单例模式,singlton。多例模式要改为prototype，IOC容器每次都创建一个新的bean返回。



## 获取bean对象



## 生命周期



## 作用域

request 仅针对HTTP请求，每次HTTP请求都会创建一个新的bean，适用WebApplicationContext环境。
session 同个session共享一个bean实例
global-session 所有session共享一个bean实例
