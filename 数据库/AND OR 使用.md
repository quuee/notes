## 描述

比如我要找张三和李四，同时找两个人；写Sql的时候可能就是直译过来，可能就会写成

```sql
select * from user where name = '张三' AND name = '李四';
```

那么这样就错了。

两者是并且的关系，应该用OR。

正确的sql：

```sql

```


