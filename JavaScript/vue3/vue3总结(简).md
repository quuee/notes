### 计算属性computed和方法method的区别

computed是有缓存的，method每次都会执行。

### watch

如果要对对象中的属性进行监听，需要加deep:true,immediate:true

### v-show和v-if区别

v-show只是修改dom的css:display:none，而且页面还会保留这个元素；而v-if是真的条件判断，如果为false不会去渲染，页面也没有这个元素。

### v-for

v-for="(item,index) in person" :key="index" 用in

v-for="(item,index) of person" :key="index" 用of都可以

v-for可以变量对象中的属性

为什么v-for需要key：为了给vue一个提示，以便它能追踪每个节点的身份，从而重用和重新排列现有元素。

### v-model 和 v-bind 区别

v-model : 先解释双向绑定的概念：就是修改变量的值，标签值自动变化；反过来，修改标签的值，变量的值也跟着更新，这就是双向绑定。只在表单组件起作用，之外的不起作用。
v-bind : 单项绑定：修改变量的值，标签属性值自动更新。简写如：:title="title"

### 简写

一个事件绑定多个处理函数，如@click="Amethod(),Bmethod()"，多个函数需要加"()""

v-on，简写用“@”；v-bind，简写用“:”；v-slot简写用“#”

### 路由

`route`表示当前路由；<mark>router</mark>表示全局路由组件。children使用场景：比如页面左侧显示菜单，右侧显示不同菜单下的内容，或者是嵌套内容。

路由跳转当前页面（同名的路由），会地址栏路径变了，但是页面不变。解决方式：1、在重用的组件里调用 `beforeRouteUpdate` 守卫。

### Vue父子组件生命周期执行顺序

Vue父子组件生命周期执行顺序：父组件先创建，然后子组件创建；子组件先挂载，然后父组件挂载，即“父beforeCreate-> 父create -> 子beforeCreate-> 子created -> 子mounted -> 父mounted”。

### emits 
#### 1、子组件向父组件（向上）事件传递（以及传递参数）
```vue
// 父组件
<template>
 <Child  @success="success"></Child>
</template>
<script setup>
function success (e,param2) {
  console.log(e,param2)
}
</script>

//子组件
<template>
 <button @click="handleClick">点击按钮</button>
</template>
<script setup>
import { defineEmits } from "vue"
const emits = defineEmits(['success'])
function handleClick () {
  emits("success", "子组件向父组件传递数据","参数2")
}
</script>

```
#### 2、子组件修改父组件的props，需要父组件提供方法

```vue
// 子组件son.vue  
<button @click='emit("sonAdd")'>add</button>
<script setup lang='ts'>
    const emit = defineEmits(['sonAdd'])
</script>

// 父组件  
<script setup lang='ts'>
    import sonbutton from './son'
</script>
<template>
    <sonbutton @sonAdd='()=>{count++}'></sonbutton>
</template>
```

### defineProps - 组件之间传值
```vue
// 父组件
<template>
  <Child :val="val"></Child>
</template>

// 子组件
<script setup>
import { defineEmits } from "vue"
const props = defineProps({
  val: {
    type: String,
    default: ""
  }
})
</script>

```

### defineExpose - 子组件暴露自己的属性或方法
```vue
// 父组件
<template>
  <Child ref="RefChildExpose"></Child>
  <button @click="touchButton">点击使用子组件</button>
</template>
<script setup>
const RefChildExpose = ref(null)
function touchButton () {
  // 使用子组件方法
  RefChildExpose.value.show()
  // 输出子组件属性
  console.log(RefChildExpose.value.count)
}
</script>

// 子组件
<script setup>
import { defineExpose } from "vue"
function show () {
  console.log('显示')
}
defineExpose({
  show,
  count: 1
})
</script>

```