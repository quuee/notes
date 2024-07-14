## mybatis字段映射失败
```
Caused by: java.sql.SQLDataException: Cannot convert string 'http://192.168.2.185:8080/static/images/tom2.jpg' to java.sql.Timestamp value
```
因为使用了@Builer注解，会按全参构造顺序填入数据。加个@NoArgsConstructor无参构造