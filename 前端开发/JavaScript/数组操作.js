//一、数组操作
let arr = [11, 22, 33]
arr.push(44, 55) // 可多个参数。在数组后面加入元素
arr.unshift(66, 77) // 可多个参数。在数组前面加入元素

// splice 拼接数组（删除、插入、替换）(index, howmany, item1, ....., itemX)：可以用于添加/删除数组中的元素。
arr.splice(1, 0, '我是插班生') // 第一个参数是要插入的位置，第二个参数是要删除的个数，第三个参数是要插入的元素（多个可逗号隔开）
arr.splice(2, 0) // 删除数组，从第几个位置开始，要删几个(不传则删除后面所有)
arr.splice(1, 1, '我是插班生') //替换，删一个插入一个

arr.pop() //删除数组末尾的元素，并且返回
arr.shift() //删除数组首个元素，并且其他元素下标索引向前移
const arr2 = ['张三', '李四']
const arr3 = ['王五']
let newArr1 = arr.concat(arr2, arr3) //合并数组，可多个
let newArr2 = arr.concat(['a', 'b', 'c']) //合并数组，可多个
//裁剪数组
let newArr3 = arr.slice(1)
let newArr4 = arr.slice(1, 2)

//二、数组排序
//sort()

//三、数组迭代
//Array.forEach()
//Array.map()
//Array.filter()
//Array.reduce()
//Array.reduceRight()
//Array.every()
//Array.some()
//Array.indexOf()
//Array.lastIndexOf()
//Array.find()
//Array.findIndex()

//四、数组转字符串 join()

// 替换数组
// filter concat slice不会修改旧数组，总是返回新的数组

// 扩展写法（语法糖）
