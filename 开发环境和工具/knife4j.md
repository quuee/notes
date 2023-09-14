
## 使用
```xml
        <dependency>
			<groupId>com.github.xiaoymin</groupId>
			<artifactId>knife4j-openapi3-jakarta-spring-boot-starter</artifactId>
			<version>${knife4j.version}</version>
		</dependency>
```
```yaml
springdoc:
  swagger-ui:
    path: /swagger-ui.html
    tags-sorter: alpha
    operations-sorter: alpha
  api-docs:
    path: /v3/api-docs
  group-configs:
    - group: 'xcx-admin'
      paths-to-match: '/**'
      packages-to-scan: com.xxx.xcx01 # 自己的路径
# knife4j的增强配置，不需要增强可以不配
knife4j:
  enable: true
  setting:
    language: zh_cn

```
```java
authorizeRequests.requestMatchers("/static/**","/doc.html","/doc.html#/**","/webjars/**","/favicon.ico","/v3/api-docs/**").permitAll();
```

## 设置token
在全局参数里添加header