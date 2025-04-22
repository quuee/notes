### 创建项目
- `npx create-expo-app [项目名] --template` 接下来自己选
- `npx create-expo-app Music_demo1 --template tabs@50` 带tabs导航,@后面是版本。有些插件版本太高用不了
- `npx create-expo-app tab_swiper --template expo-template-blank-typescript@50`

### 总是出环境问题  这模块没有，那个编译不通过，到处冲突，用模拟机老卡死
`npx expo prebuild -p [ios/android] --clean` 会 Unmatched Route
`npx expo prebuild`
`npm start -- --clear`
`npx expo run:android`

临时方法：重新创建个项目，把代码配置拷贝过去

### Unmatched Route找不到路径问题
临时方法：重新创建个项目，把代码配置拷贝过去

### 如何debug
终端启动项目
按下m，虚拟机会弹出选者项，选择 open debugger，
终端出现链接，点击链接

### gradle下载超时，换国内镜像
在android->gradle->wrapper->gradle-wrapper.properties修改distributionUrl=https\://mirrors.cloud.tencent.com/gradle/gradle-8.10.2-all.zip

### gradle maven国内镜像
好像没什么用
```gradle
        //国内镜像
        maven { url 'https://repo.huaweicloud.com/repository/maven/' }
        maven { url 'https://mirrors.tuna.tsinghua.edu.cn/repository/maven/' }
        maven { url 'https://mirrors.cloud.tencent.com/nexus/repository/maven-public/' }
        maven { url 'https://mirrors.ustc.edu.cn/maven/' }
        maven { url 'https://repo.jd.com/maven/' }
        maven { url 'https://mirrors.ustc.edu.cn/maven-central/' }
        maven { url 'https://maven.aliyun.com/repository/public/' }
```

### ninja: error: 
mkdir (/node_modules/react-native-reanimated): No such file or directory   
换一个短路径目录

### requireNativeComponent: “FastImageView” was not found in the UIManager in react native
需要重新编译

### 在 Expo 中使用 expo-router 的 Tabs 布局 结合 expo-blur 时，如果出现上下两个 Tab 栏（重复渲染），通常是因为布局层级冲突或样式未正确隔离  半透明黑色毛玻璃效果

```tsx
// app/_layout.js
import { Tabs } from 'expo-router';
import { BlurView } from 'expo-blur';

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
  );
}
```

### 在 Expo 中使用 SafeAreaProvider 和 SafeAreaView 时，如果屏幕上方出现意外的大片空白，通常是因为安全区域的适配问题  设置透明状态栏（不超出状态栏）
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
import { StatusBar } from 'expo-status-bar';

        <StatusBar style='auto'
        translucent
        backgroundColor="transparent" />
```

### 在 Expo（使用 Expo Router 或 React Navigation）中，如果 Stack.Screen 的 index 页面内容与标题栏重叠
在使用searchBar时
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

### 无法控制路由
src/app/
├── (tabs)/
│   ├── _layout.tsx
│   ├── index.tsx       # 默认入口
├── (play)/
│   ├── _layout.tsx
│   ├── index.tsx
├── _layout.tsx         # 根布局
以上目录，配置如下
```tsx
export const unstable_settings = {
    initialRouteName: 'home', //卵用没有
};
```
还是启动直接进入(play)，在实际目录中（play）是在（tabs）上方，将（play）改为（uplay）后，进入（tabs）下的目录
说明 expo router是根据文件顺序进入默认页面
最后只能将（tabs）改为（_tabs）

### 当键盘弹出时，防止底部 TabBar 上浮

```tsx
// app/_layout.js
import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        keyboardHidesTabBar: true, // 键盘弹出时隐藏 TabBar
        tabBarStyle: {
          display: 'flex', // 确保默认显示
        },
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
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

### 根据light dark调整 状态栏 、 标题栏 背景色，



### 某些版本下无法安装react-native-image-colors
无法提取图片主题色、平均色

### 延长停留在自定义splash界面，然后再跳转到其他界面

### 对接服务器登录  状态管理
#### navidrome服务器

#### navidrome播放

`http://your-navidrome-server/rest/stream?id={songId}&u={username}&t={token}&s={salt}&v=1.16.0&c=MyApp`

- id: 歌曲 ID（从 Navidrome API 获取）
- u: 用户名
- t: 认证 Token（通过密码生成）
- s: Salt（随机字符串）
- v: Navidrome API 版本（如 1.16.0）
- c: 客户端名称（如 MyApp）

生成token salt
```ts
import { encode } from 'base-64';
import CryptoJS from 'crypto-js';

function generateNavidromeAuth(username, password) {
  const salt = Math.random().toString(36).substring(2);
  const token = CryptoJS.MD5(password + salt).toString();
  return { username, token, salt };
}

const { username, token, salt } = generateNavidromeAuth('your-username', 'your-password');
```
添加 Navidrome 歌曲到播放队列
```ts
async function playNavidromeSong(songId) {
  const { username, token, salt } = generateNavidromeAuth('your-username', 'your-password');
  const streamUrl = `http://your-navidrome-server/rest/stream?id=${songId}&u=${username}&t=${token}&s=${salt}&v=1.16.0&c=MyApp`;

  // 重置队列并添加歌曲
  await TrackPlayer.reset();
  await TrackPlayer.add({
    id: songId,
    url: streamUrl,
    title: '歌曲标题',      // 从 Navidrome API 获取
    artist: '艺术家',       // 从 Navidrome API 获取
    artwork: 'http://your-navidrome-server/cover.jpg', // 封面图
  });
  await TrackPlayer.play();
}

// 调用示例
playNavidromeSong('song-123').catch(console.error);
```

获取歌曲元数据（可选）
```ts
async function getSongInfo(songId) {
  const { username, token, salt } = generateNavidromeAuth('your-username', 'your-password');
  const apiUrl = `http://your-navidrome-server/rest/getSong?id=${songId}&u=${username}&t=${token}&s=${salt}&v=1.16.0&c=MyApp`;

  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}

// 使用示例
const songInfo = await getSongInfo('song-123');
console.log(songInfo.title, songInfo.artist);
```

### 获取本地音乐

### spalsh页面总是在最后加载
讲道理不是最先加载？


