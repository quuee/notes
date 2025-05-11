### 按月查询

```sql
SELECT 
    DATE_FORMAT(ti.publish_date, '%Y-%m') as 月, 
COUNT(1) 数量 
FROM t_items ti 
group by DATE_FORMAT(ti.publish_date, '%Y-%m') 
order by DATE_FORMAT(ti.publish_date, '%Y-%m') asc
```

### 将查询结果插入到另外一张表

字段可以自己列出想要的字段

```sql
INSERT INTO 目标表 SELECT  col1,col2,... FROM 来源表 ;
```

指定字段

```sql

```
