### 创建项目

有些插件版本太高用不了

- `npx create-expo-app [项目名] --template` 接下来自己选
- `npx create-expo-app Music_demo1 --template tabs@51` 带 tabs 导航,@后面是版本。
- `npx create-expo-app tab_swiper --template expo-template-blank-typescript@51`

### package.json

```shell
npx expo install @react-native-async-storage/async-storage axios crypto-js expo-blur expo-constants react-native-awesome-slider  react-native-gesture-handler react-native-loader-kit react-native-track-player zustand expo-image react-native-image-colors expo-linear-gradient
```

react-native-fast-image 可以换 expo-image
react-native-image-colors

### 总是出环境问题 这模块没有，那个编译不通过，到处冲突，用模拟机老卡死

`npx expo prebuild -p [ios/android] --clean`
`npx expo prebuild`
`npm start -- --clear |  npm star -c`
`npx expo run:android`

临时方法：重新创建个项目，把代码配置拷贝过去
npm start -c 和 npm run android 构建方法不一样，一个会安装 app，一个不会

### eas 在线打包 apk

最好先执行`npx expo prebuild -p [ios/android] --clean`

```shell
expo login
eas build:configure
eas build --platform android --profile preview
```

### 如何 debug

终端启动项目
按下 m，虚拟机会弹出选者项，选择 open debugger，
终端出现链接，点击链接

有时候启动项目，虚拟机启动报错，真机没事

### 在 Expo 中使用 expo-router 的 Tabs 布局 结合 expo-blur 时，如果出现上下两个 Tab 栏（重复渲染），通常是因为布局层级冲突或样式未正确隔离 半透明黑色毛玻璃效果

```tsx
// app/_layout.js
import { Tabs } from 'expo-router'
import { BlurView } from 'expo-blur'

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarBackground: () => (
          <BlurView
            intensity={80}
            tint="dark" // 使用暗色模糊
            style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)' }} // 叠加黑色半透明
          />
        ),
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'transparent', // 必须设为透明
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="settings" />
    </Tabs>
  )
}
```

### 在 Expo 中使用 SafeAreaProvider 和 SafeAreaView 时，如果屏幕上方出现意外的大片空白，通常是因为安全区域的适配问题 设置透明状态栏（不超出状态栏）

```json
{
  "expo": {
    "androidStatusBar": {
      "backgroundColor": "transparent",
      "translucent": true
    }
  }
}
```

或

```tsx
import { StatusBar } from 'expo-status-bar'
;<StatusBar style="auto" translucent backgroundColor="transparent" />
```

以上两个方案都没用

### 在 Expo（使用 Expo Router 或 React Navigation）中，如果 Stack.Screen 的 index 页面内容与标题栏重叠

在使用 searchBar 时

```tsx
export const StackScreenWithSearchBar: NativeStackNavigationOptions = {
  headerLargeTitle: true,
  headerLargeStyle: {
    backgroundColor: colors.background,
  },
  headerLargeTitleStyle: {
    color: colors.text,
  },
  headerTintColor: colors.text,
  //headerTransparent: true,
  //headerBlurEffect: 'prominent',
  // 以上两行注释
  headerShadowVisible: false,
}
```

### 直接调整导航栏中的 statusBarStyle ，状态栏被背景色困扰显示问题

statusBarStyle: 'dark' | 'light', 如 Stack
如果嵌套了多个导航栏都要改，不知道能不能在根目录 一次性全局改掉

Tabs.Screen headerShown: false, 控制是否显示 header，在多个嵌套屏幕下都要关

在 tabs 标签上包裹 SafeAreaView，不会超出状态栏（重叠）
（也不会让状态栏被遮挡（同色的背景字体显示不出来））

```tsx
<SafeAreaView style={styles.container}>
  <Tabs>
    <Tabs.screem />
  </Tabs>
</SafeAreaView>
```

### expo-router 无法控制路由

src/app/
├── (tabs)/
│ ├── \_layout.tsx
│ ├── index.tsx # 默认入口
├── (play)/
│ ├── \_layout.tsx
│ ├── index.tsx
├── \_layout.tsx # 根布局
以上目录，配置如下

```tsx
export const unstable_settings = {
  initialRouteName: 'home', //卵用没有
}

<Stack initialRouteName="(tabs)">
<Tabs  initialRouteName="recommend">
```

还是启动直接进入(play)，在实际目录中（play）是在（tabs）上方，将（play）改为（uplay）后，进入（tabs）下的目录
说明 expo router 是根据文件顺序进入默认页面
最后只能将（tabs）改为（\_tabs）

### expo-router 路由介绍

| 特性           | 带括号 (folder)    | 不带括号 folder |
| -------------- | ------------------ | --------------- |
| URL 路径可见性 | 不显示在 URL 中    | 显示在 URL 中   |
| 路由分组       | 用于逻辑分组       | 用于路径结构    |
| 布局嵌套       | 可选是否继承       | 强制继承        |
| 常见用途       | 认证流程、布局分组 | 常规路由        |

- router.push(path) - 导航到新页面

- router.replace(path) - 替换当前页面

- router.back() - 返回上一页

- router.canGoBack() - 检查是否可以返回

### 文件夹 文件名称带特殊符号

1. () 逻辑分组
2. [id].tsx 动态路由
3. [...not-found].tsx 通配符路由

### \_layout 的作用

1. 定义共享布局：允许你为同一目录下的所有路由页面创建共享的 UI 布局结构

```tsx
// app/home/_layout.tsx
import { Stack } from 'expo-router'

export default function HomeLayout() {
  return (
    <>
      <Stack />
      <Footer /> {/* 所有/home下的页面都会显示这个Footer */}
    </>
  )
}
```

2. 嵌套路由配置

```
app/
  _layout.tsx        // 根布局
  home/
    _layout.tsx      // home专属布局
    index.tsx
    details.tsx
```

3. 导航容器设置

```tsx
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router'

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="settings" />
    </Tabs>
  )
}
```

4. 路由屏幕配置

```tsx
// app/_layout.tsx
import { Stack } from 'expo-router'

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: '首页',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          headerTitle: '用户资料',
        }}
      />
    </Stack>
  )
}
```

5. 身份验证控制

```tsx
// app/(auth)/_layout.tsx
import { Redirect, Stack } from 'expo-router'
import { useAuth } from '../auth'

export default function AuthLayout() {
  const { user } = useAuth()

  if (user) {
    return <Redirect href="/home" />
  }

  return <Stack />
}
```

6. 动态布局切换

```tsx
// app/_layout.tsx
export default function Layout() {
  const { isTablet } = useDeviceInfo()

  return isTablet ? <TabletLayout /> : <MobileLayout />
}
```

7. 全局状态共享 如 app/\_layout.tsx，提供：通常包含全局样式和 Providers，必须渲染一个导航容器（Stack、Tabs 等）

```tsx
// app/_layout.tsx
import { ThemeProvider } from '../theme'

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack />
    </ThemeProvider>
  )
}
```

8. 根布局，同 7
9. 分组布局 app/(group)/\_layout.tsx；只影响该分组内的路由，可以覆盖根布局的设置

### 当键盘弹出时，防止底部 TabBar 上浮

```tsx
// app/_layout.js
import { Tabs } from 'expo-router'

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true, // 键盘弹出时隐藏 TabBar
        tabBarStyle: {
          display: 'flex', // 确保默认显示
        },
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="settings" />
    </Tabs>
  )
}
```

以下这样有时候不行

```json
{
  "expo": {
    "android": {
      "softwareKeyboardLayoutMode": "pan" // 或 "resize"（根据需求选择） android专属
    }
  }
}
```

### 典型的状态未及时更新的问题

你在使用 Zustand 状态管理时，遇到了一个典型的状态未及时更新的问题：在 play 方法中调用时发现 queue 是空数组，但预期它已经被 addSongsToQueue 填充了。这是因为 异步执行顺序和 Zustand 的同步状态更新机制之间存在错位。

🧠 问题总结

- 你先调用了 addSongsToQueue(songs, index)
- 然后立即调用了 play(index)
- 在 play 中访问了 queue[index]
- 第一次调用时 queue 还是空数组（因为 Zustand 更新不是 React 的 useState 那样可以 await）
- 第二次点击才拿到数据，说明状态确实已经更新了，只是不是你期望的“同步”更新

### eas build 无法构建 apk，只能手动打包(未试过)

1. Node.js、Java JDK、Android Studio、ANDROID_HOME，确保能够通过命令行运行 adb、gradlew
2. npm install expo-cli

- 执行 expo eject 这个命令会生成 iOS 和 Android 的原生项目文件。请注意，一旦执行此操作，你就不能再直接使用某些 Expo 提供的便捷功能和服务，除非你回退这次操作或自己手动维护这些变化。有风险！

3. 设置 Android 签名密钥 命苦：
4. 修改 android/app/build.gradle：在 buildTypes 下的 release 块中添加你的签名配置
5. 未签名`./gradlew assembleRelease --project-dir=android`，已签名`./gradlew bundleRelease --project-dir=android`
