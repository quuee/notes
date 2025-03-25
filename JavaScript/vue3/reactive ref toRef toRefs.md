## reactive ref

### reactive

reactive方法 根据传入的对象 ，创建返回一个深度响应式对象。响应式对象看起来和传入的对象一样，但是，响应式对象属性值改动，不管层级有多深，都会触发响应式。新增和删除属性也会触发响应式。
reactive 只能 给对象添加响应式，对于值类型，比如String，Number，Boolean，Symbol无能为力。
赋值： form.username = username

### ref

上面我们提到 reactive 只能给对象，数组 添加响应式，如果想给值类型(String，Number，Boolean，Symbol)添加响应式，就要用到ref。

## toRef toRefs

### toRef

针对一个响应式对象（reactive 封装）的 prop（属性）创建一个ref，且保持响应式
两者 保持引用关系

### toRefs

toRefs是一种用于破坏响应式对象并将其所有属性转换为 ref 的实用方法
将响应式对象（reactive封装）转成普通对象
对象的每个属性(Prop)都是对应的ref
两者保持引用关系

### toRaw

toRaw 传入一个响应式对象，返回该响应式对象对应的普通对象
