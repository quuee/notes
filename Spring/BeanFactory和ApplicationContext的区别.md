spring中默认是单例。

BeanFactory：

是Spring里面最底层的接口，提供了最简单的容器的功能，只提供了实例化对象和拿对象的功能；

ApplicationContext：

应用上下文，继承BeanFactory接口，它是Spring的一各更高级的容器，提供了更多的有用的功能；

1) 国际化（MessageSource）
2) 访问资源，如URL和文件（ResourceLoader）
3) 载入多个（有继承关系）上下文 ，使得每一个上下文都专注于一个特定的层次，比如应用的web层
4) 消息发送、响应机制（ApplicationEventPublisher）
5) AOP（拦截器）
两者装载bean的区别

BeanFactory：BeanFactory在启动的时候不会去实例化Bean，中有从容器中拿Bean的时候才会去实例化；

ApplicationContext：ApplicationContext在启动的时候就把所有的Bean全部实例化了。它还可以为Bean配置lazy-init=true来让Bean延迟实例化；

我们该用BeanFactory还是ApplicationContent

延迟实例化的优点：（BeanFactory）

应用启动的时候占用资源很少；对资源要求较高的应用，比较有优势；
不延迟实例化的优点： （ApplicationContext）

1. 所有的Bean在启动的时候都加载，系统运行的速度快；
2. 在启动的时候所有的Bean都加载了，我们就能在系统启动的时候，尽早的发现系统中的配置问题
3. 建议web应用，在启动的时候就把所有的Bean都加载了。（把费时的操作放到系统启动中完成）

(关系图)[https://blog.51cto.com/u_15069479/4186565#:~:text=BeanFactory%20%E4%BB%85%E6%8F%90%E4%BE%9B%E4%BA%86%E6%9C%80%E5%9F%BA%E6%9C%AC%E7%9A%84%E4%BE%9D%E8%B5%96%E6%B3%A8%E5%85%A5%E6%94%AF%E6%8C%81%EF%BC%8C%E8%80%8C,ApplicationContext%20%E5%88%99%E6%89%A9%E5%B1%95%E4%BA%86BeanFactory%2C%E6%8F%90%E4%BE%9B%E4%BA%86%E6%9B%B4%E5%A4%9A%E7%9A%84%E9%A2%9D%E5%A4%96%E5%8A%9F%E8%83%BD%E3%80%82]