## 应急
show processlist（查看连接session状态）
explain(分析查询计划)，show index from tableName（分析索引）
show status like ‘%lock%’; 查询锁状态
## 常规
开启慢查询日志，运行一天  
查看slowlog，分析slowlog，分析出查询慢的语句。  
按照一定优先级，进行一个一个的排查所有慢语句。  
分析top sql，进行explain调试，查看语句执行时间。  
调整索引或语句本身。  

## in exists
in 和 exists的区别: 如果子查询得出的结果集记录较少，主查询中的表较大且又有索引时应该用in, 反之如果外层的主查询记录较少，子查询中的表大，又有索引时使用exists。其实我们区分in和exists主要是造成了驱动顺序的改变(这是性能变化的关键)，如果是exists，那么以外层表为驱动表，先被访问，如果是IN，那么先执行子查询，所以我们会以驱动表的快速返回为目标，那么就会考虑到索引及结果集的关系了 ，另外IN时不对NULL进行处理。  
in 是把外表和内表作hash 连接，而exists是对外表作loop循环，每次loop循环再对内表进行查询。一直以来认为exists比in效率高的说法是不准确的。  
not in 和not exists  
如果查询语句使用了not in 那么内外表都进行全表扫描，没有用到索引；而not extsts 的子查询依然能用到表上的索引。所以无论那个表大，用not exists都比not in要快。  