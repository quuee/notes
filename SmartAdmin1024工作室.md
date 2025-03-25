### 去除验证码
#### java中需要注释
LoginService类 -> login 方法
```java
        // 校验 图形验证码
       ResponseDTO<String> checkCaptcha = captchaService.checkCaptcha(loginForm);
       if (!checkCaptcha.getOk()) {
           return ResponseDTO.error(UserErrorCode.PARAM_ERROR, checkCaptcha.getMsg());
       }
```
CaptchaForm类
```java
@NotBlank(message = "验证码不能为空")
```
#### vue中注释
/login3/login.vue中
```javascript
const rules = {
  loginName: [{ required: true, message: '用户名不能为空' }],
  password: [{ required: true, message: '密码不能为空' }],
  // captchaCode: [{ required: true, message: '验证码不能为空' }],
};
```

### 看板窗口问题
当高度用%设置时,如果容器内没有元素,高度不会被撑满.底部的横向滚动条(X轴)不会处于底部.
当被撑满,撑出时,底部的横向滚动条 会被挤到底部或更下面.
总之*底部的横向滚动条*随容器内元素改变  

当高度使用vh单位时,默认撑满当前窗口.
当容器内的元素撑满时,当前容器(div)会出现Y轴的滚动条,这个Y轴滚动条只作用当前撑满的容器

目标:X轴滚动条出现在底部(固定),看板每个状态的容器,在一个或多个容器被元素撑满时只出现*一个最右侧的Y轴滚动条*
