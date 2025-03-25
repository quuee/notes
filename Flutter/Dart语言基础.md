## static final const
### const用在=左边
必须在声明变量时赋值，一旦赋值就不允许修改，而声明值一定要是编译时常数。
```dart
  const a = 1;
  const b = 'hello';
  const c = a;
```
声明类成员变量时，const变量必须同时被声明为static
### 什么是编译时常数
数值、字符串、表达式、集合或对象
### const用在等号右边
作用是 修饰值，它意味着对象的整个深度状态可以在编译时完全确定，并且对象将被冻结并且完全不可变。
```dart
var a = const [c,2,3];
```
### const修饰类的构造函数
当const修饰类的构造函数时，它要求该类的所有成员都必须是final的。

### final的要求就是 其声明的变量在赋值之后就不再改变

### static它的作用是 声明类的成员变量，使得多个相同类型的类对象共享同一个成员变量的实例。

## 泛型
### 函数泛型
```dart
T getInfo<T>(T param){
  T num = param;
  return num;
}
```
T(返回的类型) getInfo<T(使用时接受的类型，确定T到底是哪一种类型)>(T(传入参数的类型) param){
  T(定义变量时的类型) num = param;
  return num;
}
### 类泛型
```dart
class ApiResult<T> {

  int code;
  String msg;
  T data;

}
```

## extends with implements on
extends：继承，和其它语言的继承没什么区别。  
with：使用Mixin模式混入一个或者多个Mixin类。  
implements：实现一个或多个接口并实现每个接口定义的API。  
on：限制Mixin的使用范围  

## dart中list数组常用方法
### 添加方法
add 添加一个元素到数组末尾  
addAll 合并两个数组  
insert 在指定索引处插入一个值  
insertAll 在指定索引处插入一个数组  
### 删除方法
remove 删除指定元素  
removeAt 删除指定索引位置处的元素  
removeLast 删除数组的最后一个元素  
clear 清空数组  
removeWhere 根据指定条件删除元素  
removeRange 删除指定索引范围内的元素(含头不含尾)  
（如果数组中有该数据或者满足删除的条件，则删除，原数组发生改动。）  
### 修改数据
List [index] 修改指定索引位置元素的值  
fillRange 用相同的值替换指定索引范围内的所有元素(含头不含尾) 
replaceRange 用某一数组替换指定索引范围内的所有元素(含头不含尾)  
setRange 范围替换数组中的值(含头不含尾)  
setAll 从指定索引位置开始，使用第二个数组内的元素依次替换掉第一个数组中的元素  
### 查询数据
elementAt 获取指定索引位置处的元素  
contains 判断数组中是否含有指定元素  
indexOf 获取指定元素在数组中的索引  
lastIndexOf 从后向前查找指定元素在数组中的索引  
indexWhere 返回第一个满足条件的元素的索引  
lastIndexWhere 从后向前找，返回第一个满足条件的元素的索引  
where 根据指定条件，函数筛选每个元素，符合条件的元素组成一个新的 Iterable  
firstWhere 返回第一个满足条件的元素  
lastWhere 从后向前查找第一个满足条件的元素  
singleWhere 获取满足指定条件的唯一元素  
retainWhere 保留满足条件的元素(改变了原数组)  
any 判断数组中是否有满足指定条件的元素  
every 判断数组中是否每个元素都满足指定的条件  
take 从索引 0 位置处，取指定个数的元素  
takeWhile 从索引 0 位置处，查询满足指定条件的元素，直到出现第一个不符合条件的元素，然后返回前面符合条件的元素  
skip 跳过指定个数的元素，返回后面的元素 
skipWhile 根据指定条件，找到第一个不符合条件的元素，然后将该元素后面的所有元素返回   
sublist 从指定索引处截取数组  
getRange 截取指定索引范围内的元素  
whereType 从混合类型的数组中，筛选出指定类型的元素  

### 遍历
forEach 遍历数组中的元素  
map 遍历数组中的所有元素，可以对元素进行处理，并返回新的 Iterable  
toSet 将 List 转换为 Set，得到去重后的元素  
asMap 将 List 转换为 Map，key 为原数组的索引，value 为原数组的元素  
sort 数组排序(原数组发生改变)  
join 用指定字符连接数组中每个元素，返回 String  
cast 将一个数组的类型传递给未指定数据类型的数组  
List.generate 快速生产 Flutter 中的 Widget  
reduce 用指定的函数方式对数组中的所有元素做连续操作，并将结果返回  
fold 根据一个现有数组和一个初始参数值 initValue，指定参数条件操作现有数组的所有元素，并返回处理的结果  
expand 根据现有数组，指定一个处理方式，返回一个 Iterable  
shuffle 随机排列指定数组(修改了原数组)  

## 对象深度对比判断是否相同