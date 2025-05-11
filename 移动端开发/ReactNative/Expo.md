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

### 如何 debug

终端启动项目
按下 m，虚拟机会弹出选者项，选择 open debugger，
终端出现链接，点击链接

有时候启动项目，虚拟机启动报错，真机没事

### ninja: error:

mkdir (/node_modules/react-native-reanimated): No such file or directory
换一个短路径目录

### requireNativeComponent: “FastImageView” was not found in the UIManager in react native

需要重新编译

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

### 根据 light dark 调整 状态栏 、 标题栏 背景色，

### react-native-image-colors 打包编译不通过

无法提取图片主题色、平均色

### react-native-track-player 启动时 "cannot read property 'capability_play' of null" 错误

无解啊 官方说 track-player 不兼容 expo

npm start -c 启动后进不了 track 相关页面，报错

npm run android == npx expo run:android 可以启动

### 延长停留在自定义 splash 界面，然后再跳转到其他界面

### 对接服务器登录 状态管理

#### navidrome 服务器

#### navidrome 播放

`http://your-navidrome-server/rest/stream?id={songId}&u={username}&t={token}&s={salt}&v=1.16.0&c=MyApp`

- id: 歌曲 ID（从 Navidrome API 获取）
- u: 用户名
- t: 认证 Token（通过密码生成）
- s: Salt（随机字符串）
- v: Navidrome API 版本（如 1.16.0）
- c: 客户端名称（如 MyApp）

生成 token salt

```ts
import { encode } from 'base-64'
import CryptoJS from 'crypto-js'

function generateNavidromeAuth(username, password) {
  const salt = Math.random().toString(36).substring(2)
  const token = CryptoJS.MD5(password + salt).toString()
  return { username, token, salt }
}

const { username, token, salt } = generateNavidromeAuth(
  'your-username',
  'your-password'
)
```

添加 Navidrome 歌曲到播放队列

```ts
async function playNavidromeSong(songId) {
  const { username, token, salt } = generateNavidromeAuth(
    'your-username',
    'your-password'
  )
  const streamUrl = `http://your-navidrome-server/rest/stream?id=${songId}&u=${username}&t=${token}&s=${salt}&v=1.16.0&c=MyApp`

  // 重置队列并添加歌曲
  await TrackPlayer.reset()
  await TrackPlayer.add({
    id: songId,
    url: streamUrl,
    title: '歌曲标题', // 从 Navidrome API 获取
    artist: '艺术家', // 从 Navidrome API 获取
    artwork: 'http://your-navidrome-server/cover.jpg', // 封面图
  })
  await TrackPlayer.play()
}

// 调用示例
playNavidromeSong('song-123').catch(console.error)
```

获取歌曲元数据（可选）

```ts
async function getSongInfo(songId) {
  const { username, token, salt } = generateNavidromeAuth(
    'your-username',
    'your-password'
  )
  const apiUrl = `http://your-navidrome-server/rest/getSong?id=${songId}&u=${username}&t=${token}&s=${salt}&v=1.16.0&c=MyApp`

  const response = await fetch(apiUrl)
  const data = await response.json()
  return data
}

// 使用示例
const songInfo = await getSongInfo('song-123')
console.log(songInfo.title, songInfo.artist)
```

### 获取本地音乐

### spalsh 页面总是在最后加载

讲道理不是最先加载？
