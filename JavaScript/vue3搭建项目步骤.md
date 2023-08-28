## 前端技术选型

vite构建工具

vue3 组合式api

ui库：element-plus

状态管理：pinia

npm install 和 npm i 是一样
--save 和 -S 是一样
--save-dev 和 -D 是一样

## 创建项目

### 一、设置npm源为腾讯云地址

```shell
npm config set registry http://mirrors.cloud.tencent.com/npm/
```

### 二、创建项目
```shell
npm create vite@latest my-video-app -- --template vue-ts
```

### 三、引入依赖

1、element-plus

```shell
npm install element-plus --save
```

2、按需导入（自动导入）

需要安装`unplugin-vue-components` 和 `unplugin-auto-import`这两款插件

```shell
npm install -D unplugin-vue-components unplugin-auto-import
```

##### Vite[#](https://element-plus.gitee.io/zh-CN/guide/quickstart.html#vite)

```typeScript
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
(其实按需引入有坑, 在main.ts文件里 import 'element-plus/dist/index.css')

el-icon也不能用

3、环境变量
创建.env.[mode]
加载的环境变量会通过 import.meta.env 以字符串形式暴露给客户端源码
在vite.config.ts中无法使用，需要loadEnv方法。
process.cwd() process 未定义则安装@types/node
```shell
npm i --save-dev @types/node
```
如下
```typeScript
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


// https://vitejs.dev/config/
export default (({ command, mode, ssrBuild }) => {
  const VITE_BASR_URL: string = loadEnv(mode, process.cwd(), "VITE_").VITE_BASR_URL
  console.log("VITE_BASR_URL",VITE_BASR_URL)
  return defineConfig({
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    server: {

      proxy: {
        '/api': {
          // target: 'http://192.168.2.11:8090',
          target: VITE_BASR_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
      port: 12121,
      host: "0.0.0.0",
      open: false
    }
  })
})
```


4、安装vue-router

```shell
npm install vue-router -S
```
路由配置

5、安装pipina
```shell
npm install pinia
```

6、scss
```shell
npm install sass sass-loader --save-dev
```

7、安装axios
```shell
npm install axios -S
```
axiosInstance.ts
```typeScript
import axios, { InternalAxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
import { useUserStore } from '../store/userStore'
// import { Message } from 'element-plus'

const axiosInstance: AxiosInstance = axios.create({
    //baseURL: import.meta.env.VITE_BASR_URL,
    //如果跨域 只需加/api
    baseURL:"/api"
    timeout: 30 * 1000,
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin-Type": '*'
    },

});

// 添加请求拦截器
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 在发送请求之前做些什么

        //添加请求头
        const userStore = useUserStore()
        config.headers.Authorization = `${userStore.getUserInfo.userInfo.token}`

        // 追加时间戳，防止GET请求缓存
		if (config.method?.toUpperCase() === 'GET') {
			config.params = { ...config.params, t: new Date().getTime() }
		}

        return config;
    },
    (error: any) => {

        // 处理请求错误
        return Promise.reject(error);
    },
);

// 添加响应拦截器
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        // 对响应数据做点什么
        return response;
    },
    (error: any) => {
        // 处理响应错误
        return Promise.reject(error);
    },
);

export default axiosInstance;

```
request.ts
```typeScript
import axiosInstance from "./axiosInstance";

export interface ApiResult<T> {
    code: number,
    message: string,
    data: T
}

export async function get<T>(url: string, params?: any): Promise<ApiResult<T>> {
    const response = await axiosInstance.get<ApiResult<T>>(url, { params });
    return response.data;
}

export async function post<T>(url: string, data?: any): Promise<ApiResult<T>> {
    const response = await axiosInstance.post<ApiResult<T>>(url, data);
    return response.data;
}

export async function put<T>(url: string, data?: any): Promise<ApiResult<T>> {
    const response = await axiosInstance.put<ApiResult<T>>(url, data);
    return response.data;
}

export async function del<T>(url: string, params?: any): Promise<ApiResult<T>> {
    const response = await axiosInstance.delete<ApiResult<T>>(url, { params });
    return response.data;
}

```
8、路径别名
```shell
npm i path -S
npm i @types/node -D
```
vite.config.ts 文件中添加
```typeScript
import path from "path"

return defineConfig({
  plugins:[vue()],
  resolve:{
    alias:{
      "@":path.resolve(__dirname,"./src")
    }
  }
})

```
tsconfig.json文件添加
```typeScript
{
  "compilerOptions": {
    /* 配置@ */
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}

```

9、封装crud通用hook
