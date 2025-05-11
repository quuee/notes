
## react native封装
### 基础封装-定义类型
```ts
// 基础响应类型
export interface IResponseData<T = any> {
  code: number;
  message: string;
  data: T;
}

// 列表数据响应类型
export interface IListData<T = any> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

// 扩展 Axios 配置类型
declare module 'axios' {
  export interface AxiosRequestConfig {
    // 是否显示加载提示
    showLoading?: boolean;
    // 是否显示错误提示
    showError?: boolean;
    // 重试次数
    retry?: number;
    // 内部使用的重试计数
    __retryCount?: number;
    // 是否跳过 token
    skipAuth?: boolean;
  }
}

// 请求方法类型
export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// 请求配置
export interface IRequestConfig extends AxiosRequestConfig {
  method?: RequestMethod;
}
```
### 基础封装
```ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios';
import { Platform } from 'react-native';
import { IResponseData, IRequestConfig } from './types/http';
import { getToken, removeToken } from './auth';

class HttpRequest {
  private readonly baseURL: string;
  private readonly timeout: number;
  private pendingRequests: Map<string, CancelTokenSource>;
  
  constructor() {
    this.baseURL = Platform.OS === 'android' 
      ? 'http://10.0.2.2:3000/api' 
      : 'http://localhost:3000/api';
    this.timeout = 10000;
    this.pendingRequests = new Map();
  }

  // 获取axios实例
  public getInstance(): AxiosInstance {
    const instance = axios.create({
      baseURL: this.baseURL,
      timeout: this.timeout,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    });

    this.setInterceptors(instance);
    return instance;
  }

  // 设置拦截器
  private setInterceptors(instance: AxiosInstance): void {
    // 请求拦截器
    instance.interceptors.request.use(
      async (config: IRequestConfig) => {
        // 取消重复请求
        this.removePendingRequest(config);
        this.addPendingRequest(config);

        // 添加token
        if (!config.skipAuth) {
          const token = await getToken();
          if (token) {
            config.headers = {
              ...config.headers,
              Authorization: `Bearer ${token}`
            };
          }
        }

        // 可以在这里添加加载提示
        if (config.showLoading) {
          // showLoading();
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    instance.interceptors.response.use(
      (response: AxiosResponse<IResponseData>) => {
        // 移除pending请求
        this.removePendingRequest(response.config);

        // 隐藏加载提示
        if (response.config.showLoading) {
          // hideLoading();
        }

        // 处理响应数据
        if (response.data.code === 200) {
          return response.data.data;
        } else {
          // 处理业务错误
          if (response.config.showError) {
            // showToast(response.data.message);
          }
          return Promise.reject(response.data);
        }
      },
      async (error) => {
        // 移除pending请求
        this.removePendingRequest(error.config || {});

        // 隐藏加载提示
        if (error.config?.showLoading) {
          // hideLoading();
        }

        // 处理HTTP错误
        if (error.response) {
          switch (error.response.status) {
            case 401:
              await removeToken();
              // 跳转到登录页
              // navigation.navigate('Login');
              break;
            case 403:
              // 无权限处理
              break;
            case 404:
              // 资源不存在
              break;
            case 500:
              // 服务器错误
              break;
            default:
              break;
          }

          if (error.config?.showError) {
            // showToast(error.response.data?.message || '请求失败');
          }
        }

        // 重试逻辑
        const config = error.config as IRequestConfig;
        if (config?.retry) {
          config.__retryCount = config.__retryCount || 0;
          if (config.__retryCount < config.retry) {
            config.__retryCount += 1;
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve(this.getInstance().request(config));
              }, 1000 * config.__retryCount);
            });
          }
        }

        return Promise.reject(error);
      }
    );
  }

  // 添加pending请求
  private addPendingRequest(config: IRequestConfig): void {
    const requestKey = this.getRequestKey(config);
    if (!this.pendingRequests.has(requestKey)) {
      const source = axios.CancelToken.source();
      config.cancelToken = source.token;
      this.pendingRequests.set(requestKey, source);
    }
  }

  // 移除pending请求
  private removePendingRequest(config: IRequestConfig): void {
    const requestKey = this.getRequestKey(config);
    if (this.pendingRequests.has(requestKey)) {
      const source = this.pendingRequests.get(requestKey);
      source?.cancel('重复请求被取消');
      this.pendingRequests.delete(requestKey);
    }
  }

  // 生成请求key
  private getRequestKey(config: IRequestConfig): string {
    return `${config.url}&${config.method}`;
  }
}

export default new HttpRequest().getInstance();
```

### 请求方法封装
```ts
import http, { IRequestConfig, IResponseData } from './http';
import { IListData } from './types/http';

class Request {
  // GET请求
  public async get<T = any>(url: string, params?: any, config?: IRequestConfig): Promise<T> {
    return http.get(url, { params, ...config });
  }

  // POST请求
  public async post<T = any>(url: string, data?: any, config?: IRequestConfig): Promise<T> {
    return http.post(url, data, config);
  }

  // PUT请求
  public async put<T = any>(url: string, data?: any, config?: IRequestConfig): Promise<T> {
    return http.put(url, data, config);
  }

  // DELETE请求
  public async delete<T = any>(url: string, params?: any, config?: IRequestConfig): Promise<T> {
    return http.delete(url, { params, ...config });
  }

  // PATCH请求
  public async patch<T = any>(url: string, data?: any, config?: IRequestConfig): Promise<T> {
    return http.patch(url, data, config);
  }

  // 上传文件
  public async upload<T = any>(url: string, file: any, config?: IRequestConfig): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);

    return http.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      ...config
    });
  }

  // 下载文件
  public async download(url: string, params?: any, config?: IRequestConfig): Promise<Blob> {
    return http.get(url, {
      params,
      responseType: 'blob',
      ...config
    });
  }

  // 获取列表数据
  public async getList<T = any>(
    url: string, 
    params?: any, 
    config?: IRequestConfig
  ): Promise<IListData<T>> {
    return this.get<IListData<T>>(url, params, config);
  }
}

export default new Request();
```

### API模块化封装
```ts
import request from './request';
import { IListData } from './types/http';

// 用户相关API
export const userApi = {
  login: (data: { username: string; password: string }) => {
    return request.post<{ token: string }>('/user/login', data);
  },
  
  getInfo: () => {
    return request.get<{ name: string; avatar: string }>('/user/info');
  },
  
  updateInfo: (data: { name?: string; avatar?: string }) => {
    return request.put('/user/info', data);
  }
};

// 商品相关API
export const productApi = {
  getList: (params: { page: number; size: number }) => {
    return request.getList<{ id: number; name: string; price: number }>(
      '/products', 
      params
    );
  },
  
  getDetail: (id: number) => {
    return request.get<{ id: number; name: string; description: string }>(
      `/products/${id}`
    );
  },
  
  create: (data: { name: string; price: number }) => {
    return request.post('/products', data);
  }
};

// 文件相关API
export const fileApi = {
  uploadImage: (file: any) => {
    return request.upload<{ url: string }>('/upload/image', file);
  }
};
```
### 使用示例
```ts
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { userApi, productApi } from './api';

interface Product {
  id: number;
  name: string;
  price: number;
}

const ExampleComponent: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const result = await productApi.getList({ page: 1, size: 10 });
      setProducts(result.list);
    } catch (err: any) {
      setError(err.message || '获取商品列表失败');
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    try {
      const { token } = await userApi.login({
        username: 'admin',
        password: '123456'
      });
      console.log('登录成功，token:', token);
    } catch (err: any) {
      console.error('登录失败:', err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <View>
      {loading && <Text>加载中...</Text>}
      {error && <Text>错误: {error}</Text>}
      <Button title="登录" onPress={login} />
      {products.map(product => (
        <Text key={product.id}>
          {product.name} - ¥{product.price}
        </Text>
      ))}
    </View>
  );
};

export default ExampleComponent;
```

### 高级拓展
1. 请求缓存
```ts
import { IRequestConfig } from './http';
import request from './request';

class RequestCache {
  private cache: Map<string, { data: any; expire: number }>;
  private defaultExpire: number;

  constructor(defaultExpire: number = 300000) { // 默认5分钟
    this.cache = new Map();
    this.defaultExpire = defaultExpire;
  }

  public async getWithCache<T = any>(
    url: string, 
    params?: any, 
    config?: IRequestConfig & { expire?: number }
  ): Promise<T> {
    const key = this.getCacheKey(url, params);
    const cached = this.cache.get(key);

    if (cached && cached.expire > Date.now()) {
      return cached.data;
    }

    const data = await request.get<T>(url, params, config);
    this.cache.set(key, {
      data,
      expire: Date.now() + (config?.expire || this.defaultExpire)
    });

    return data;
  }

  public clearCache(url: string, params?: any): void {
    const key = this.getCacheKey(url, params);
    this.cache.delete(key);
  }

  private getCacheKey(url: string, params?: any): string {
    return `${url}?${JSON.stringify(params)}`;
  }
}

export default new RequestCache();
```
2. 使用缓存
```ts
import cache from './cache';

// 获取商品列表并使用缓存
const getProducts = async () => {
  return cache.getWithCache('/products', { page: 1, size: 10 }, {
    expire: 60000 // 1分钟缓存
  });
};

// 清除缓存
const refreshProducts = async () => {
  cache.clearCache('/products', { page: 1, size: 10 });
  return getProducts();
};
```