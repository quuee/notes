### 计算属性computed和方法method的区别

computed是有缓存的，method每次都会执行。

### watch

如果要对对象中的属性进行监听，需要加deep:true。

### v-show和v-if区别

v-show只是修改dom的css:display:none，而且页面还会保留这个元素；而v-if是真的条件判断，如果为false不会去渲染，页面也没有这个元素。

### v-for

v-for="(item,index) in person" :key="index" 用in

v-for="(item,index) of person" :key="index" 用of都可以

v-for可以变量对象中的属性

为什么v-for需要key：为了给vue一个提示，以便它能追踪每个节点的身份，从而重用和重新排列现有元素。

### 简写

一个事件绑定多个处理函数，如@click="Amethod(),Bmethod()"，多个函数需要加"()""

v-on，简写用“@”；v-bind，简写用“:”；v-slot简写用“#”

### 路由

route表示当前路由；route<mark>r</mark>表示全局路由组件。children使用场景：比如页面左侧显示菜单，右侧显示不同菜单下的内容，或者是嵌套内容。

路由跳转当前页面（同名的路由），会地址栏路径变了，但是页面不变。解决方式：1、在重用的组件里调用 `beforeRouteUpdate` 守卫。

### toRef toRefs toRaw

toRef toRefs 主要用于对响应式对象的结构

toRaw 传入一个响应式对象，返回该响应式对象对应的普通对象

### Vue父子组件生命周期执行顺序

Vue父子组件生命周期执行顺序：父组件先创建，然后子组件创建；子组件先挂载，然后父组件挂载，即“父beforeCreate-> 父create -> 子beforeCreate-> 子created -> 子mounted -> 父mounted”。

### emits，将子组件的方法暴露给父组件使用

子组件son.vue

```html
<button @click=''>add</button>
<script setup lang='ts'>
    const emit = defineEmits(['sonAdd'])
</script>
```

父组件

```html
<script setup lang='ts'>
    import sonbutton from './son'
</script>
<template>
    <sonbutton @sonAdd='()=>{count++}'></sonbutton>
</template>

```
