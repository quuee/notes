
## type 与 interface 的区别

### type
使用 type 创建类型别名，类型别名不仅可以用来表示基本类型，还可以用来表示对象类型、联合类型、元组和交集。
```typescript
type userName = string; // 基本类型
type userId = string | number; // 联合类型
type arr = number[]; 

// 对象类型
type Person = {
    id: userId; // 可以使用定义类型
    name: userName;
    age: number;
    gender: string;
    isWebDev: boolean;
};
// 泛型
type Tree<T> = { value: T };

const user: Person = {
    id: "901",
    name: "椿",
    age: 22,
    gender: "女",
    isWebDev: false,
};

const numbers: arr = [1, 8, 9];

```
### interface
interface仅限于描述对象类型
```typescript
interface Person {
    id: userId;
    name: userName;
    age: number;
    gender: string;
    isWebDev: boolean;
}
```
#### 接口继承
```ts
interface Base {
  id: number;
  createdAt: Date;
}

interface User extends Base {
  name: string;
  email: string;
}

// 使用
const user: User = {
  id: 1,
  createdAt: new Date(),
  name: "John",
  email: "john@example.com"
};
```

### 相似处
都可以描述 Object和Function。
```typescript
//type
type Point = {
  x: number;
  y: number;
};

type SetPoint = (x: number, y: number) => void;

//interface
interface Point {
  x: number;
  y: number;
}

interface SetPoint {
  (x: number, y: number): void;
}
```

#### 类型别名交叉类型
```ts
type Base = {
  id: number;
  createdAt: Date;
};

type User = Base & {
  name: string;
  email: string;
};

// 等同于接口继承的效果
```

#### 联合类型
```ts
type Status = "active" | "inactive" | "pending";

type User = {
  id: number;
  status: Status;
};
```

#### 类型合并
```ts
interface User {
  name: string;
}

interface User {
  age: number;
}

// 最终 User 包含 name 和 age
```

#### 使用工具类型合并
```ts
type PartialUser = Partial<User>; // 所有属性变为可选
type ReadonlyUser = Readonly<User>; // 所有属性变为只读
type UserWithoutEmail = Omit<User, "email">; // 排除特定属性
type UserWithAddress = User & { address: string }; // 添加新属性
```

#### 高级组合
```ts
// 基础类型
type Entity = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

// 用户角色
type Role = "admin" | "user" | "guest";

// 扩展基础类型
type User = Entity & {
  name: string;
  email: string;
  role: Role;
  // 可选属性
  phone?: string;
};

// 进一步扩展
type AdminUser = User & {
  role: "admin"; // 重写role为特定值
  permissions: string[];
};

// 使用条件类型
type UserProfile<T extends Role> = User & {
  role: T;
  profile: T extends "admin" ? AdminProfile : BasicProfile;
};

type AdminProfile = { department: string };
type BasicProfile = { avatar: string };
```

#### 泛型继承
```ts
interface Repository<T extends { id: string }> {
  get(id: string): Promise<T>;
  save(entity: T): Promise<void>;
}

class UserRepository implements Repository<User> {
  // 必须实现 get 和 save 方法
}
```

#### 类型保护与区分联合类型


## typescript 给 vue3 添加泛型
### 为 ref() 标注类型
```typescript
// 源码中的定义
function ref<T>(value: T): Ref<UnwrapRef<T>>
interface Ref<T> {
  value: T
}
```
```typescript
// 基础数据类型
import { ref } from 'vue'

const initCode = ref<string | number>('200')

// 对象类型
interface User {
  name: string
  age: string | number
}

const user = ref<User>({
  name:'张三',
  age: 20
})

// 不是很推荐
import type { Ref } from 'vue'
const initCode: Ref<string | number> = ref('200')

```
### 为 reactive() 标注类型
```typescript
// 源码中的定义
function reactive<T extends object>(target: T): UnwrapNestedRefs<T>
```
```typescript

import { reactive } from 'vue'

interface User {
  name: string
  age: string | number
}
// 方式1
const user:User = reactive({
  name:"张三",
  age:'20'
})
// 方式2
const user2 = reactive<User>({
  name:"张三",
  age:'20'
})
```
### computed ()
接受一个 getter 函数，返回一个只读的响应式 ref 对象，即 getter 函数的返回值。它也可以接受一个带有 get 和 set 函数的对象来创建一个可写的 ref 对象。
```typescript
// 只读
function computed<T>(
  getter: () => T,
  debuggerOptions?: DebuggerOptions
): Readonly<Ref<Readonly<T>>>

// 可写的
function computed<T>(
  options: {
    get: () => T
    set: (value: T) => void
  },
  debuggerOptions?: DebuggerOptions
): Ref<T>

```
```typescript
import { ref, computed } from 'vue'

const count = ref<number>(0)

// 推导得到的类型：ComputedRef<string>
const user = computed(() => count.value + '张三')

const user2 = computed<string>(() => {
  // 若返回值不是 string 类型则会报错
  return '张三'
})
```

### defineProps()
```typescript
// 方式1
const props = defineProps({
  name: { type: String, required: true },
  age: Number
})

// 方式2
interface Props {
  name: string
  age?: number
} 
const props = defineProps<Props>()
```
#### 复杂的props
```typescript
import { PropsType } from './type';
defineProps( {
  msg: {
    type: Array as PropType<PropsType[]>
  }
  // 假设这里还有10多个参数。。。
})


defineProps({
    menu: {
        type: Object as PropType<MenuModel>,
        required: true
    }
})
```

### defineEmits()
运行时自动推导

### defineExpose()
运行时自动推导
```typescript
<script setup>
import { ref } from 'vue'

const name = ref<string>('前端开发爱好者')

defineExpose({
  name
})
```

### provide()

### inject()

### 模板 ref

### 组件 ref

### 事件处理器(原生 DOM 事件)