计算属性computed和方法method的区别：computed是有缓存的，method每次都会执行。

watch：如果要对对象中的属性进行监听，需要加deep:true。

v-show和v-if区别：v-show只是修改dom的css:display:none，而且页面还会保留这个元素；而v-if是真的条件判断，如果为false不会去渲染，页面也没有这个元素。

v-for="(item,index) in person" :key="index" 用in

v-for="(item,index) of person" :key="index" 用of都可以

v-for可以变量对象中的属性

为什么v-for需要key：为了给vue一个提示，以便它能追踪每个节点的身份，从而重用和重新排列现有元素。

一个事件绑定多个处理函数，如@click="Amethod(),Bmethod()"，多个函数需要加"()""

v-on，简写用“@”；v-bind，简写用“:”；v-slot简写用“#”

route表示当前路由；route<mark>r</mark>表示全局路由组件。children使用场景：比如页面左侧显示菜单，右侧显示不同菜单下的内容，或者是嵌套内容。
