servlet中有 inti service destory方法，每次业务请求都是service方法处理。
默认情况下是第一次请求进来创建servlet。
一般自己的servlet继承HttpServlet，直接重写doGet doPost方法就可以了。
servlet在tomcat中是单例的，线程是不安全的。