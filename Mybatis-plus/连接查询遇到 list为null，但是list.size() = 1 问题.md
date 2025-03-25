## 描述
连表查询时，查询的结果都是null，但是list.size()=1，然后出现空指针。
因为对于查询者来说这条数据是空的，仅仅是因为要查询的字段是空的，但是其他字段不为空，所以mybatis没有把这条记录当做空数据，而是映射给我们的对象，导致list中多了一个空对象。
```java
list.parallelStream().filter(Objects::nonNull).collect(Collectors.toList)
```