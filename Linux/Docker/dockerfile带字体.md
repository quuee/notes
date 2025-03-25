
### 带字体的dockerfile
```dockerfile
FROM font-base:1.0
WORKDIR /home
ADD ./mall-front/target/mall-front-1.0-SNAPSHOT.jar mall-front.jar
COPY ./mall-front/msyh.ttf /usr/share/fonts/ttf-dejavu/msyh.ttf
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
EXPOSE 10002
ENTRYPOINT ["java","-XX:+UnlockExperimentalVMOptions","-XX:+UseCGroupMemoryLimitForHeap","-Djava.security.egd=file:/dev/./urandom","-Dspring.profiles.active=prod","-jar","mall-front.jar"]
```