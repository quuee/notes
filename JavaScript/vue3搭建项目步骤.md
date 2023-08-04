## 前端技术选型

vite构建工具

vue3 组合式api

ui库：element-plus

状态管理：pinia

## 创建项目

### 一、设置npm源为腾讯云地址

```text
npm config set registry http://mirrors.cloud.tencent.com/npm/
```

### 二、创建项目

npm create vite@latest my-video-app -- --template vue-ts

### 三、引入依赖

1、element-plus

```
npm install element-plus --save
```

2、按需导入（自动导入）

需要安装`unplugin-vue-components` 和 `unplugin-auto-import`这两款插件

```
npm install -D unplugin-vue-components unplugin-auto-import
```

##### Vite[#](https://element-plus.gitee.io/zh-CN/guide/quickstart.html#vite)

```
// vite.config.ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
```

3、安装vue-router

`npm install vue-router -S`

4、安装axios

npm install axios -S

定义请求工具

5、封装crud通用hook
