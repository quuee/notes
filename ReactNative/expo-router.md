## react native expo-router 跳转页面有哪几种方式

在 React Native 中使用 `expo-router` 是一种现代化的页面路由管理方式，它基于文件系统自动配置路由，类似于 Next.js 的文件路由机制。以下是使用 `expo-router` 实现页面跳转的几种常见方式及示例代码：

---

### 1. **通过 `<Link>` 组件跳转**

`expo-router` 提供了一个 `<Link>` 组件，可以直接用于页面跳转。

#### 示例代码：

```javascript
import { Link } from 'expo-router'

export default function Home() {
  return (
    <Link href="/details">
      <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
        跳转到详情页
      </Text>
    </Link>
  )
}
```

---

### 2. **通过 `useRouter` 钩子跳转**

`expo-router` 提供了 `useRouter` 钩子，可以通过编程方式实现页面跳转。

#### 示例代码：

```javascript
import { useRouter } from 'expo-router'
import { Button, View, Text } from 'react-native'

export default function Home() {
  const router = useRouter()

  const handlePress = () => {
    router.push('/details') // 跳转到详情页
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>首页</Text>
      <Button title="跳转到详情页" onPress={handlePress} />
    </View>
  )
}
```

---

### 3. **通过 `href` 属性传递参数**

你可以在跳转时通过 `href` 传递参数，目标页面可以通过 `useSearchParams` 或 `route.params` 获取这些参数。

#### 示例代码：

**跳转页面：**

```javascript
import { Link } from 'expo-router'

export default function Home() {
  return (
    <Link href="/details?itemId=123&name=Test">
      <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
        跳转到详情页并传递参数
      </Text>
    </Link>
  )
}
```

**接收参数的页面：**

```javascript
import { useSearchParams } from 'expo-router'
import { View, Text } from 'react-native'

export default function Details() {
  const { itemId, name } = useSearchParams()

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>详情页</Text>
      <Text>Item ID: {itemId}</Text>
      <Text>Name: {name}</Text>
    </View>
  )
}
```

---

### 4. **通过动态路由跳转**

`expo-router` 支持动态路由（类似于 Next.js 的 `[id].js` 文件），你可以通过动态路径跳转。

#### 示例代码：

**文件结构：**

```
app/
  details/
    [id].js
```

**跳转页面：**

```javascript
import { useRouter } from 'expo-router'
import { Button, View, Text } from 'react-native'

export default function Home() {
  const router = useRouter()

  const handlePress = () => {
    router.push('/details/123') // 动态路由跳转
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>首页</Text>
      <Button title="跳转到动态详情页" onPress={handlePress} />
    </View>
  )
}
```

**动态路由页面：**

```javascript
import { useLocalSearchParams } from 'expo-router'
import { View, Text } from 'react-native'

export default function Details() {
  const { id } = useLocalSearchParams()

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>动态详情页</Text>
      <Text>ID: {id}</Text>
    </View>
  )
}
```

---

### 5. **返回上一页**

使用 `router.back()` 方法可以返回上一页。

#### 示例代码：

```javascript
import { useRouter } from 'expo-router'
import { Button, View, Text } from 'react-native'

export default function Details() {
  const router = useRouter()

  const handleBack = () => {
    router.back() // 返回上一页
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>详情页</Text>
      <Button title="返回上一页" onPress={handleBack} />
    </View>
  )
}
```

---

### 6. **替换当前页面（不保留历史记录）**

使用 `router.replace()` 方法可以替换当前页面，不会在导航历史中保留原页面。

#### 示例代码：

```javascript
import { useRouter } from 'expo-router'
import { Button, View, Text } from 'react-native'

export default function Home() {
  const router = useRouter()

  const handlePress = () => {
    router.replace('/details') // 替换当前页面
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>首页</Text>
      <Button title="替换为详情页" onPress={handlePress} />
    </View>
  )
}
```

---

### 总结

- **组件跳转**：使用 `<Link>`。
- **编程跳转**：使用 `useRouter` 的 `push`、`replace` 和 `back` 方法。
- **传递参数**：通过 `href` 或动态路由传参。
- **动态路由**：支持 `[id].js` 文件形式的动态路径。
- **返回操作**：使用 `router.back()`。

`expo-router` 提供了一种简洁且强大的路由管理方式，适合现代化的 React Native 项目。

## expo-router 动态路由案例展示，如在/(tabs)/list/index.tsx /(tabs)/list/[id].tsx 目录下

在 `expo-router` 中，动态路由是一种非常强大的功能，允许你根据 URL 动态加载页面内容。以下是一个基于 `/(tabs)/list/index.tsx` 和 `/(tabs)/list/[id].tsx` 的完整案例，展示如何实现动态路由。

---

### 项目结构

假设你的项目目录如下：

```
app/
  (tabs)/
    list/
      index.tsx       // 列表页
      [id].tsx        // 动态详情页
  _layout.tsx         // Tab 布局文件
```

---

### 1. **`_layout.tsx` - 定义 Tab 导航**

首先，在 `/(tabs)/_layout.tsx` 中定义 Tab 导航布局。

```tsx
import { Tabs } from 'expo-router'

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="list"
        options={{
          title: '列表',
          tabBarIcon: () => null, // 可以添加图标
        }}
      />
    </Tabs>
  )
}
```

---

### 2. **`index.tsx` - 列表页**

`/(tabs)/list/index.tsx` 是一个简单的列表页，展示一些项目，并支持点击跳转到动态详情页。

```tsx
import { Link } from 'expo-router'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

const DATA = [
  { id: '1', title: 'Item 1' },
  { id: '2', title: 'Item 2' },
  { id: '3', title: 'Item 3' },
]

export default function ListScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity>
            {/* 使用 Link 组件跳转 */}
            <Link href={`/(tabs)/list/${item.id}`} asChild>
              <Text style={styles.item}>{item.title}</Text>
            </Link>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    padding: 16,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
})
```

---

### 3. **`[id].tsx` - 动态详情页**

`/(tabs)/list/[id].tsx` 是动态详情页，根据传入的 `id` 显示具体内容。

```tsx
import { useLocalSearchParams } from 'expo-router'
import { View, Text, StyleSheet } from 'react-native'

export default function DetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>详情页</Text>
      <Text style={styles.content}>当前 ID: {id}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  content: {
    fontSize: 18,
  },
})
```

---

### 4. **运行效果**

- **列表页**：显示一个列表，点击某个项目后会跳转到动态详情页。
- **动态详情页**：根据 URL 中的 `id` 参数（例如 `/list/1`），显示对应的内容。

#### 示例 URL：

- 列表页：`/(tabs)/list`
- 动态详情页：`/(tabs)/list/1` 或 `/(tabs)/list/2`

---

### 5. **动态路由的工作原理**

- 文件名 `[id].tsx` 表示这是一个动态路由，`id` 是动态参数。
- 当用户访问 `/list/1` 时，`useLocalSearchParams` 会解析出 `id` 的值为 `1`。

---

### 6. **可选参数支持**

如果你希望参数是可选的，可以使用 `[...id].tsx` 或 `[[...id]].tsx` 文件名：

- `[...id].tsx`：匹配 `/list/1`、`/list/1/2` 等多级路径。
- `[[...id]].tsx`：匹配 `/list` 和 `/list/1`。

---

### 总结

通过 `expo-router` 的动态路由功能，你可以轻松实现基于 URL 的动态页面跳转。以上案例展示了如何在 `/(tabs)` 布局下实现列表页和动态详情页的交互，非常适合构建现代化的 React Native 应用。

## 命令式导航 router.push('/songs') 如何添加参数

在 `expo-router` 中，使用命令式导航（例如 `router.push`）时，可以通过多种方式添加参数。以下是详细的说明和示例代码。

---

### 1. **通过查询字符串传递参数**

你可以将参数作为查询字符串附加到 URL 中。

#### 示例代码：

```tsx
import { useRouter } from 'expo-router'
import { Button, View, Text } from 'react-native'

export default function Home() {
  const router = useRouter()

  const handlePress = () => {
    // 添加查询参数
    router.push('/songs?songId=123&name=MyFavoriteSong')
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>首页</Text>
      <Button title="跳转到歌曲页面" onPress={handlePress} />
    </View>
  )
}
```

**接收参数的页面：**

```tsx
import { useSearchParams } from 'expo-router'
import { View, Text } from 'react-native'

export default function SongDetails() {
  const { songId, name } = useSearchParams()

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>歌曲详情页</Text>
      <Text>Song ID: {songId}</Text>
      <Text>Name: {name}</Text>
    </View>
  )
}
```

---

### 2. **通过动态路由传递参数**

如果使用了动态路由（例如 `[id].tsx`），可以直接将参数嵌入到路径中。

#### 示例代码：

**跳转页面：**

```tsx
import { useRouter } from 'expo-router'
import { Button, View, Text } from 'react-native'

export default function Home() {
  const router = useRouter()

  const handlePress = () => {
    // 动态路由传参
    router.push('/songs/123')
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>首页</Text>
      <Button title="跳转到歌曲页面" onPress={handlePress} />
    </View>
  )
}
```

**动态路由页面：**

```tsx
import { useLocalSearchParams } from 'expo-router'
import { View, Text } from 'react-native'

export default function SongDetails() {
  const { id } = useLocalSearchParams<{ id: string }>()

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>歌曲详情页</Text>
      <Text>Song ID: {id}</Text>
    </View>
  )
}
```

---

### 3. **通过对象传递参数**

`router.push` 还支持以对象的形式传递参数，这种方式更灵活。

#### 示例代码：

```tsx
import { useRouter } from 'expo-router'
import { Button, View, Text } from 'react-native'

export default function Home() {
  const router = useRouter()

  const handlePress = () => {
    // 使用对象形式传递参数
    router.push({
      pathname: '/songs/[id]',
      params: { id: '123', name: 'MyFavoriteSong' },
    })
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>首页</Text>
      <Button title="跳转到歌曲页面" onPress={handlePress} />
    </View>
  )
}
```

**动态路由页面：**

```tsx
import { useLocalSearchParams } from 'expo-router'
import { View, Text } from 'react-native'

export default function SongDetails() {
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>()

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>歌曲详情页</Text>
      <Text>Song ID: {id}</Text>
      <Text>Name: {name}</Text>
    </View>
  )
}
```

---

### 4. **总结**

- **查询字符串**：适合简单的键值对参数，直接拼接到 URL 中。
  ```ts
  router.push('/songs?songId=123&name=MyFavoriteSong')
  ```
- **动态路由**：适合基于路径的参数，参数嵌入到路径中。
  ```ts
  router.push('/songs/123')
  ```
- **对象形式**：适合复杂参数，支持路径和参数分离。
  ```ts
  router.push({
    pathname: '/songs/[id]',
    params: { id: '123', name: 'MyFavoriteSong' },
  })
  ```

## useLocalSearchParams 和 useSearchParams 区别

在 `expo-router` 中，`useLocalSearchParams` 和 `useSearchParams` 都是用于获取 URL 查询参数的钩子函数，但它们的使用场景和行为有所不同。以下是两者的主要区别：

### 1. **`useSearchParams`**

- **用途**：从当前页面的 URL 中提取查询参数（query parameters）。
- **适用范围**：适用于获取整个 URL 的查询参数，无论这些参数是否与动态路由有关。
- **返回值**：返回一个对象，包含所有的查询参数。

#### 示例代码：

假设你有一个 URL 如 `/songs?songId=123&name=MyFavoriteSong`。

```tsx
import { useSearchParams } from 'expo-router'
import { View, Text } from 'react-native'

export default function SongDetails() {
  const { songId, name } = useSearchParams()

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>歌曲详情页</Text>
      <Text>Song ID: {songId}</Text>
      <Text>Name: {name}</Text>
    </View>
  )
}
```

### 2. **`useLocalSearchParams`**

- **用途**：专门用于从动态路由路径中提取参数（即路径参数），而不是查询字符串中的参数。
- **适用范围**：主要用于动态路由文件（例如 `[id].tsx`），用来获取嵌入在路径中的参数。
- **返回值**：返回一个对象，包含所有路径参数。

#### 示例代码：

假设你的文件结构为 `app/(tabs)/songs/[id].tsx`，并且你访问的 URL 是 `/songs/123`。

```tsx
import { useLocalSearchParams } from 'expo-router'
import { View, Text } from 'react-native'

export default function SongDetails() {
  const { id } = useLocalSearchParams<{ id: string }>()

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>歌曲详情页</Text>
      <Text>Song ID: {id}</Text>
    </View>
  )
}
```

### 主要区别总结

| 特性               | `useSearchParams`                       | `useLocalSearchParams`               |
| ------------------ | --------------------------------------- | ------------------------------------ |
| **用途**           | 获取 URL 中的所有查询参数               | 获取动态路由路径中的路径参数         |
| **适用场景**       | 适用于需要处理查询字符串参数的情况      | 适用于动态路由文件，处理路径中的参数 |
| **返回内容**       | 返回一个包含所有查询参数的对象          | 返回一个包含路径参数的对象           |
| **示例 URL**       | `/songs?songId=123&name=MyFavoriteSong` | `/songs/123`                         |
| **获取的数据类型** | Query Parameters (查询参数)             | Path Parameters (路径参数)           |

### 实际应用中的选择

- 如果你需要处理 URL 中的查询字符串参数（如 `?key=value`），则应使用 `useSearchParams`。
- 如果你在动态路由文件中，并且需要获取嵌入在路径中的参数（如 `/songs/123` 中的 `123`），则应使用 `useLocalSearchParams`。

理解这两者的区别有助于更准确地管理路由和参数传递，提升开发效率和代码的可维护性。
