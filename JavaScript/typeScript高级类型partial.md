## 
```typescript
/**
 * Make all properties in T optional
 */
type Partial<T> = {
    [P in keyof T]?: T[P];
};

```

```typescript
interface IUser {
  name: string
  age: number
  department: string
}

```

经过 Partial 类型转化后得到  
```typescript
type optional = Partial<IUser>

// optional的结果如下
type optional = {
    name?: string | undefined;
    age?: number | undefined;
    department?: string | undefined;
}
```
