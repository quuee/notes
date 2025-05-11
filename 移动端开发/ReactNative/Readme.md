## Run instructions for Android:

    • Have an Android emulator running (quickest way to get started), or a device connected.
    • cd "C:\Users\GMK_M7\Documents\React_Native_Projects\AwesomeProject" && npx react-native run-android

## JSX 展开语法 (`{...flatlistProps}`) 在 React Native FlatList 中的作用

在 React Native 的 `FlatList` 组件中，`{...flatlistProps}` 使用的是 JSX 展开语法（Spread Operator）。它的作用是将一个对象 (`flatlistProps`) 中的所有属性展开并传递给 `FlatList` 组件。

### 基本用法

```jsx
<FlatList
  data={songsLibrary}
  renderItem={({ item: track }) => (
    <TrackItem track={{ ...track, image: track.artwork }} />
  )}
  {...flatlistProps}
/>
```

如果 flatlistProps 是：

```js
const flatlistProps = {
  keyExtractor: (item) => item.id,
  onEndReached: loadMoreSongs,
  refreshing: isLoading,
  onRefresh: fetchSongs,
}
```

那么上面的代码等价于：

```jsx
<FlatList
  data={songsLibrary}
  renderItem={...}
  keyExtractor={(item) => item.id}
  onEndReached={loadMoreSongs}
  refreshing={isLoading}
  onRefresh={fetchSongs}
/>
```

### 注意事项

1. 属性覆盖
   如果 flatlistProps 和显式写的 props 有同名属性（例如同时存在 {...flatlistProps} 和 refreshing={false}），显式写的 props 会覆盖展开的 props。
2. 无效属性
   确保 flatlistProps 中的属性是 FlatList 支持的，否则会被忽略。

### 应用场景

1. 分页列表
2. 主题/配置共享
3. 条件渲染

## React Context

provider consumer contentType

## 动画
