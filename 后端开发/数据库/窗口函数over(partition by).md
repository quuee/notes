```sql
row_number() over(partition by 分组列 order by 排序列 desc) as rowno

rank() over(partition by 分组列 order by 排序列 desc) as rowno

dense_rank() over(partition by 分组列 order by 排序列 desc) as rowno

```