在使用代理是 git会有多重ssl校验导致无法拉取。

## 方式一 linux 下 ~/.gitconfig

```config
[http]
    sslverify = false

```

### 方式二
`git config --global http.sslverify "false"`