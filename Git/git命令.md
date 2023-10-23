## git 设置当前仓库用户名和密码
git config user.name "userName" //你的用户名
git config user.email "email address" //你的邮箱地址
git config user.password "password"

### 全局多了个 --global 


## vscode 当作git工具
设置以下配置，不然一直push失败
```json
{
    "git.terminalAuthentication": false
}

```

## 添加远程仓库
git remote add origin https://xxx.git

## 不存在上游分支 
设置上游分支：
方式一（适用远程分支已存在）：
用参数 -u 或 --set-upstream-to 设置上游
$ git branch --set-upstream-to=origin/<远程分支> <本地分支>
方式二（适用远程分支不存在）：
上传本地分支到远程，同是把上传后的远程分支设置为本地分支的上游分支：
git push set-upstream origin HEAD:<远程分支>
