## Spring 七种事务传播行为

默认 Propagation.REQUIRED

### Propagation.REQUIRED

表示如果当前存在一个事务，则加入该事务，否则将新建一个事务；这个是Spring事务默认传播行为

### Propagation.SUPPORTS

如果当前存在事务，则加入该事务；如果当前不存在事务，则以非事务的方式继续运行。

### Propagation.MANDATORY

如果当前存在事务，则加入该事务；如果当前不存在事务，则抛出异常。

### Propagation.REQUIRES_NEW

重新创建一个新的事务，如果当前存在事务，延缓当前的事务。

### Propagation.NOT_SUPPORTED

以非事务的方式运行，如果当前存在事务，暂停当前的事务。

### Propagation.NEVER

以非事务的方式运行，如果当前存在事务，则抛出异常。

### Propagation.NESTED

如果没有，就新建一个事务；如果有，就在当前事务中嵌套其他事务。