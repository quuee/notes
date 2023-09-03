sql1

```sql
select 
    * 
from 
    tableA a 
left join tableB b on a.id=b.a_id and b.condition=true 
left join tableC c on a.id=c.a_id and c.condition=true
```

sql2

```sql
select 
    * 
from 
    tableA a 
left join tableB b on a.id=b.a_id 
where b.condition=true and c.condition=true
```

## 区别

两者的区别在于 `where b.condition and c.condition 被当作公共的属性参与条件过滤` ，(tableA 、tableB 和 tableC)的关系是and。

而在left join on 关联是过滤和其他表没有直接关联，(tableA 、tableB) 和(tableA 、tableC)的关系是 or。
