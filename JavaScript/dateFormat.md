### toLocalString （原生方法）

```javascript
let date = new Date()
console.log(date.toLocalString()) //日期+时间
console.log(date.toLocalDateString()) //日期
console.log(date.toLocalTimerString()) //时间
```

### 封装

#### 字符串填充

`padStart`从原字符串左侧开始填充

`padEnd`从原字符串右侧开始填充

字符串拼接

```javascript
time = "5"
timeString = '0'*(2-len(time))+time
```

```javascript
const dateFormat = (dateTime: string) => {
    let time = new Date(dateTime);
    const year = time.getFullYear()
    const month = time.getMonth() + 1 // 由于月份从0开始，因此需加1
    const day = time.getDate()
    const hour = time.getHours()
    const minute = time.getMinutes()
    const second = time.getSeconds()
    return `${padString(year, 4)}-${padString(month)}-${padString(day)} ${padString(hour)}:${padString(minute)}:${padString(second)}`
}
const padString = (time: number, length: number = 2) => {
    return time.toString().padStart(length, '0')
}

export {
    dateFormat
}
```

### 第三方库

Moment.js

### 倒计时

```javascript
const countDown = (time) => {
    let dateNow = +new Date(); // 获取当前时间的毫秒数
    let dateOver = +new Date(time); // 获取目标时间的毫秒数
    let gapTime = (dateOver - dateNow) / 1000 // 由毫秒得到秒
    let s = padString(parseInt(gapTime % 60)); // 秒数
    let m = padString(parseInt(gapTime / 60 % 60)); // 分钟数
    let h = padString(parseInt(gapTime / 60 / 60 % 24)); // 小时数
    let d = pad(parseInt(cha / 60 / 60 / 24)); // 天数
    return d + '天' + h + '小时' + m + '分钟' + s + '秒';
}
```
