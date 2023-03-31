计算属性computed和方法method的区别：computed是有缓存的，method每次都会执行。

watch：如果要对对象中的属性进行监听，需要加deep:true。

v-show和v-if区别：v-show只是修改dom的css:display:none，而且页面还会保留这个元素；而v-if是真的条件判断，如果为false不会去渲染，页面也没有这个元素。

v-for="(item,index) in person" :key="index" 用in

v-for="(item,index) of person" :key="index" 用of都可以

v-for可以变量对象中的属性

为什么v-for需要key：为了给vue一个提示，以便它能追踪每个节点的身份，从而重用和重新排列现有元素。

一个事件绑定多个处理函数，如@click="Amethod(),Bmethod()"，多个函数需要加"()""


