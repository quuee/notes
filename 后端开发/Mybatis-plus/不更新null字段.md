### 全局设置

```yaml
mybatis-plus:
    global-config:
        db-config:
            ...
            field-strategy: ignored not_null not_empty default never
```

### 单独字段设置

```java
@TableField(updateStrategy = FiledStrategy.IGNORE)
```

### 构建wrapper时指定

```java
LambdaUpdateWrapper wrapper = new LambdaUpdateWrapper();
wrapper.set(xxx::getXxx , null)
```
