## slf4j

slf4j是门面日志框架，logback 和 log4j 则对slf4j 进行了实现。

## spring里的配置

#### 简单使用

application.yaml 中设置 logging.file 或 logging.path 属性。二者不能同时使用，如若同时使用，则只有 logging.file 生效。

```yaml
logging:
    file: ./logs/ # 绝对路径或相对路径
    path: ./logs/ 
    level: 
        root: info # debug info warn error
        com.xxx.demo: warn 
    pattern:
        console: # 日志打印规则
```

## logback-spring.xml文件里的日志配置

```yaml
loggin:
    config: classpath:logging-spring.xml
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration debug="false">

    <!-- 指定日志输出路径 -->
    <property name="LOG_HOME" value="logs" />

    <!-- 彩色日志依赖的渲染类 -->
    <conversionRule conversionWord="clr" converterClass="org.springframework.boot.logging.logback.ColorConverter" />
    <conversionRule conversionWord="wex" converterClass="org.springframework.boot.logging.logback.WhitespaceThrowableProxyConverter" />
    <conversionRule conversionWord="wEx" converterClass="org.springframework.boot.logging.logback.ExtendedWhitespaceThrowableProxyConverter" />
    <!-- 彩色日志格式 -->
    <property name="CONSOLE_LOG_PATTERN" value="${CONSOLE_LOG_PATTERN:-%clr(%d{yyyy-MM-dd HH:mm:ss.SSS}){faint} %clr(${LOG_LEVEL_PATTERN:-%5p}) %clr(${PID:- }){magenta} %clr(---){faint} %clr([%15.15t]){faint} %clr(%-40.40logger{39}){cyan} %clr(:){faint} %m%n${LOG_EXCEPTION_CONVERSION_WORD:-%wEx}}"/>

    <!--输出到控制台-->
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <!--此日志appender是为开发使用，只配置最低级别，控制台输出的日志级别是大于或等于此级别的日志信息-->
<!--        <filter class="ch.qos.logback.classic.filter.ThresholdFilter">-->
<!--            <level>debug</level>-->
<!--        </filter>-->
        <encoder>
            <Pattern>${CONSOLE_LOG_PATTERN}</Pattern>
            <charset>UTF-8</charset>
        </encoder>
    </appender>

    <!--输出到文档-->
    <appender name="DEBUG_FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <!-- 正在记录的日志文档的路径及文档名 -->
        <file>${LOG_HOME}/debug.log</file>
        <!--日志文档输出格式-->
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
            <charset>UTF-8</charset>
        </encoder>
        <!-- 日志记录器的滚动策略，按日期，按大小记录 -->
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!-- 日志归档 -->
            <fileNamePattern>${LOG_HOME}/debug-%d{yyyy-MM-dd}.%i.log</fileNamePattern>
            <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <maxFileSize>100MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
            <!--日志文档保留天数-->
            <maxHistory>30</maxHistory>
        </rollingPolicy>
        <!-- 此日志文档只记录debug级别的 -->
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>DEBUG</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
    </appender>

    <appender name="INFO_FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${LOG_HOME}/info.log</file>
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
            <charset>UTF-8</charset>
        </encoder>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>${LOG_HOME}/info-%d{yyyy-MM-dd}.%i.log</fileNamePattern>
            <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <maxFileSize>100MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
            <maxHistory>30</maxHistory>
        </rollingPolicy>
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>INFO</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
    </appender>

    <appender name="WARN_FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${LOG_HOME}/warn.log</file>
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
            <charset>UTF-8</charset>
        </encoder>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>${LOG_HOME}/warn-%d{yyyy-MM-dd}.%i.log</fileNamePattern>
            <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <maxFileSize>100MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
            <maxHistory>30</maxHistory>
        </rollingPolicy>
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>warn</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
    </appender>

    <appender name="ERROR_FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${LOG_HOME}/error.log</file>
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
            <charset>UTF-8</charset>
        </encoder>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>${LOG_HOME}/error-%d{yyyy-MM-dd}.%i.log</fileNamePattern>
            <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <maxFileSize>100MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
            <maxHistory>30</maxHistory>
        </rollingPolicy>
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>ERROR</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
    </appender>

    <!-- 开发环境，控制台打印-->
    <springProfile name="test,dev">
        <!-- logger name="com.boot" 设置了level级别；没有设置addtivity，默认为true，将此loger的打印信息向上级传递 -->
        <!-- logger name="com.boot" 没有设置appender，此loger本身不打印任何信息-->
        <!-- 级别依次为【从高到低】：FATAL > ERROR > WARN > INFO > DEBUG > TRACE  -->
<!--        <logger name="com.xxx.xcx01" level="DEBUG" addtivity="false">-->
<!--            <!– 只输出com.xxx.xcx01包下 –>-->
<!--            <appender-ref ref="CONSOLE"/>-->
<!--            <appender-ref ref="DEBUG_FILE" />-->
<!--            <appender-ref ref="INFO_FILE" />-->
<!--            <appender-ref ref="WARN_FILE" />-->
<!--            <appender-ref ref="ERROR_FILE" />-->
<!--        </logger>-->

<!--        <logger name="com.baomidou.dynamic" level="debug" addtivity="false">-->
<!--            <appender-ref ref="CONSOLE"/>-->
<!--            <appender-ref ref="DEBUG_FILE" />-->
<!--            <appender-ref ref="INFO_FILE" />-->
<!--            <appender-ref ref="WARN_FILE" />-->
<!--            <appender-ref ref="ERROR_FILE" />-->
<!--        </logger>-->
<!--        <logger name="org.apache.ibatis.logging" level="debug" addtivity="false">-->
<!--            <appender-ref ref="CONSOLE"/>-->
<!--            <appender-ref ref="DEBUG_FILE" />-->
<!--        </logger>-->

        <!-- root接到下级传递的信息，交给已经配置好的名为“CONSOLE”的appender处理 -->
        <!-- root也是<logger>元素，但是它是根logger -->
        <root level="info">
            <appender-ref ref="CONSOLE"/>
        </root>
    </springProfile>

    <!-- 测试、生产环境，输出到文档 -->
    <springProfile name="prod">
        <root level="info">
            <appender-ref ref="INFO_FILE" />
            <appender-ref ref="WARN_FILE" />
            <appender-ref ref="ERROR_FILE" />
        </root>
    </springProfile>
</configuration>
```

## 配置详解

### 根节点：<configuration>

### Logger

### Appenders

### Layouts
