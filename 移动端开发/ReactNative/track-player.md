# 封装 react-native-track-player 的 Hook 实现优雅初始化

下面我将为你提供一个完整的、优雅的 Hook 封装方案，用于初始化和管理 react-native-track-player。

## 基础 Hook 封装

```typescript
import { useEffect, useState, useCallback } from 'react'
import TrackPlayer, {
  Capability,
  AppKilledPlaybackBehavior,
  Event,
  State,
  usePlaybackState,
  useTrackPlayerEvents,
} from 'react-native-track-player'

// 播放器配置
const setupOptions = {
  // 安卓后台播放配置
  android: {
    appKilledPlaybackBehavior:
      AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
  },
  // 播放器能力配置
  capabilities: [
    Capability.Play,
    Capability.Pause,
    Capability.SkipToNext,
    Capability.SkipToPrevious,
    Capability.SeekTo,
    Capability.Stop,
  ],
  // 通知栏配置
  compactCapabilities: [
    Capability.Play,
    Capability.Pause,
    Capability.SkipToNext,
  ],
  // 进度条颜色
  progressUpdateEventInterval: 2,
}

// 自定义 Hook
export function useTrackPlayer() {
  const [isInitialized, setIsInitialized] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const playbackState = usePlaybackState()
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)

  // 初始化播放器
  const initializePlayer = useCallback(async () => {
    try {
      await TrackPlayer.setupPlayer()
      await TrackPlayer.updateOptions(setupOptions)
      setIsInitialized(true)
      setError(null)
    } catch (e) {
      setError(e as Error)
      setIsInitialized(false)
    }
  }, [])

  // 重置播放器
  const resetPlayer = useCallback(async () => {
    try {
      await TrackPlayer.reset()
      setIsInitialized(false)
    } catch (e) {
      setError(e as Error)
    }
  }, [])

  // 添加曲目
  const addTracks = useCallback(
    async (tracks: Track[]) => {
      if (!isInitialized) {
        await initializePlayer()
      }
      await TrackPlayer.add(tracks)
      if (tracks.length > 0) {
        setCurrentTrack(tracks[0])
      }
    },
    [isInitialized, initializePlayer]
  )

  // 播放控制
  const play = useCallback(async () => {
    if (!isInitialized) return
    await TrackPlayer.play()
  }, [isInitialized])

  const pause = useCallback(async () => {
    if (!isInitialized) return
    await TrackPlayer.pause()
  }, [isInitialized])

  // 其他播放控制方法...

  // 监听播放状态变化
  useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
      const track = await TrackPlayer.getTrack(event.nextTrack)
      setCurrentTrack(track || null)
    }
  })

  // 组件卸载时销毁播放器
  useEffect(() => {
    return () => {
      if (isInitialized) {
        TrackPlayer.reset()
      }
    }
  }, [isInitialized])

  return {
    isInitialized,
    error,
    initializePlayer,
    resetPlayer,
    addTracks,
    play,
    pause,
    currentTrack,
    playbackState,
    // 暴露其他需要的 TrackPlayer 方法...
  }
}
```

## 更高级的封装 - 带重试机制的 Hook

```typescript
import { useEffect, useState, useCallback } from 'react'
import TrackPlayer from 'react-native-track-player'

export function useAdvancedTrackPlayer(maxRetries = 3) {
  const [isInitialized, setIsInitialized] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  const initializeWithRetry = useCallback(async () => {
    try {
      await TrackPlayer.setupPlayer()
      await TrackPlayer.updateOptions({
        // 配置选项...
      })
      setIsInitialized(true)
      setError(null)
      setRetryCount(0)
    } catch (e) {
      setError(e as Error)
      if (retryCount < maxRetries) {
        const timer = setTimeout(() => {
          setRetryCount((c) => c + 1)
          initializeWithRetry()
        }, 1000 * Math.pow(2, retryCount)) // 指数退避
        return () => clearTimeout(timer)
      }
    }
  }, [maxRetries, retryCount])

  useEffect(() => {
    initializeWithRetry()
    return () => {
      TrackPlayer.reset()
    }
  }, [initializeWithRetry])

  return {
    isInitialized,
    error,
    retryCount,
    retryInitialization: initializeWithRetry,
  }
}
```

## 使用示例

```typescript
import React from 'react'
import { View, Text, Button, ActivityIndicator } from 'react-native'
import { useTrackPlayer } from './useTrackPlayer'

const tracks = [
  {
    id: '1',
    url: require('./assets/track1.mp3'),
    title: 'Track 1',
    artist: 'Artist 1',
  },
  // 更多曲目...
]

export default function PlayerScreen() {
  const {
    isInitialized,
    error,
    initializePlayer,
    addTracks,
    play,
    pause,
    currentTrack,
    playbackState,
  } = useTrackPlayer()

  const handlePlay = async () => {
    if (!isInitialized) {
      await initializePlayer()
      await addTracks(tracks)
    }
    await play()
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
        <Button title="Retry" onPress={initializePlayer} />
      </View>
    )
  }

  if (!isInitialized) {
    return <ActivityIndicator size="large" />
  }

  return (
    <View>
      <Text>Now Playing: {currentTrack?.title || 'None'}</Text>
      <Text>State: {playbackState}</Text>
      <Button title="Play" onPress={handlePlay} />
      <Button title="Pause" onPress={pause} />
    </View>
  )
}
```

## 最佳实践建议

1. **全局状态管理**：考虑将播放器状态集成到你的全局状态管理(如 Redux、Zustand)中
2. **错误边界**：为播放器组件添加错误边界处理
3. **持久化**：保存播放队列和进度到本地存储
4. **后台任务**：正确处理应用进入后台时的播放行为
5. **类型安全**：为 Track 对象和播放器方法添加 TypeScript 类型定义

这个封装提供了良好的错误处理、状态管理和简洁的 API，可以根据你的具体需求进一步扩展。
