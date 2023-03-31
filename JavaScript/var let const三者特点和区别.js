// 一、var的特点
// 1 存在变量提升
console.log(a) //undefined
var a = 10

var a
console.log(a) // 又变成undefined
a = 10

// 2 一个变量可以多次声明，后面会覆盖前面
var a = 10
var a = 20
console.log(a) // 20

// 3 局部和全局
var a = 10
function change(){
    // 重新声明 这里还是局部变量
    var a = 20
}
change()
console.log(a) // 10

var a = 100
function change2(){
    // 没有重新声明直接使用该变量就是全局的
    a = 200
}
change()
console.log(a) // 200

// 二、let特点
// 1 不存在变量提升
console.log(b) //let未声明，该变量不能使用，会报错
let b = 10

// 2 作用域 代码块内有效
{
    let b = 10
}
console.log(b) // 报错 b 未定义

// 3 相同作用域不能重复声明

// 三、const特点
// 1 const声明只是一个只读变量，值不能改变。如果是对象这种引用类型，对象内部的值还是可以变的.
// 2 const必须初始化

// 四、使用
// let一般应用于基本数据类型；const 一般应用于引用数据类型，也就是函数对象等。