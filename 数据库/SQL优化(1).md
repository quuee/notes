
## explain 分析SQL的执行计划
需要重点关注type、rows、filtered、extra。  

type由上至下，效率越来越高

### ALL 全表扫描  
index 索引全扫描  
range 索引范围扫描，常用语<,<=,>=,between,in等操作  
ref 使用非唯一索引扫描或唯一索引前缀扫描，返回单条记录，常出现在关联查询中  
eq_ref 类似ref，区别在于使用的是唯一索引，使用主键的关联查询  
const/system 单条记录，系统会把匹配行中的其他列作为常数处理，如主键或唯一索引查询  
null MySQL不访问任何表或索引，直接返回结果  
虽然上至下，效率越来越高，但是根据cost模型，假设有两个索引idx1(a, b, c),idx2(a, c)，SQL为"select * from t where a = 1 and b in (1, 2) order by c";如果走idx1，那么是type为range，如果走idx2，那么type是ref；当需要扫描的行数，使用idx2大约是idx1的5倍以上时，会用idx1，否则会用idx2  

### Extra

Using filesort：MySQL需要额外的一次传递，以找出如何按排序顺序检索行。通过根据联接类型浏览所有行并为所有匹配WHERE子句的行保存排序关键字和行的指针来完成排序。然后关键字被排序，并按排序顺序检索行。

Using temporary：使用了临时表保存中间结果，性能特别差，需要重点优化

Using index：表示相应的 select 操作中使用了覆盖索引（Coveing Index）,避免访问了表的数据行，效率不错！如果同时出现 using where，意味着无法直接通过索引查找来查询到符合条件的数据。

Using index condition：MySQL5.6之后新增的ICP，using index condtion就是使用了ICP（索引下推），在存储引擎层进行数据过滤，而不是在服务层过滤，利用索引现有的数据减少回表的数据。

### show profile 分析
了解SQL执行的线程的状态及消耗的时间。  
默认是关闭的，开启语句“set profiling = 1;”  
```sql
SHOW PROFILES ;
SHOW PROFILE FOR QUERY  #{id};
```
### trace
trace分析优化器如何选择执行计划，通过trace文件能够进一步了解为什么优惠券选择A执行计划而不选择B执行计划。
```sql
set optimizer_trace="enabled=on";
set optimizer_trace_max_mem_size=1000000;
select * from information_schema.optimizer_trace;
```

## 确定问题并采用相应的措施
优化索引  
优化SQL语句：修改SQL、IN 查询分段、时间查询分段、基于上一次数据过滤  
改用其他实现方式：ES、数仓等  

### 案例1、最左匹配

索引  
```sql
KEY `idx_shopid_orderno` (`shop_id`,`order_no`)
```
```sql
select * from _t where orderno=''
```
查询匹配从左往右匹配，要使用order_no走索引，必须查询条件携带shop_id或者索引(shop_id,order_no)调换前后顺序

### 案例2、隐式转换
索引
```sql
KEY `idx_mobile` (`mobile`)
```
```sql
select * from _user where mobile=12345678901
```
隐式转换相当于在索引上做运算，会让索引失效。mobile是字符类型，使用了数字，应该使用字符串匹配，否则MySQL会用到隐式替换，导致索引失效。  

### 案例3、大分页

索引
```sql
KEY `idx_a_b_c` (`a`, `b`, `c`)
```
SQL语句
```sql
select * from _t where a = 1 and b = 2 order by c desc limit 10000, 10;
```
对于大分页的场景，可以优先让产品优化需求，如果没有优化的，有如下两种优化方式，
一种是把上一次的最后一条数据，也即上面的c传过来，然后做“c < xxx”处理，但是这种一般需要改接口协议，并不一定可行。
另一种是采用延迟关联的方式进行处理，减少SQL回表，但是要记得索引需要完全覆盖才有效果，SQL改动如下
```sql
select t1.* from _t t1, (select id from _t where a = 1 and b = 2 order by c desc limit 10000, 10) t2 where t1.id = t2.id;
```

[后续](https://mp.weixin.qq.com/s/xTE6nKc1KrucN6wvBpAYWA)