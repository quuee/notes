### 创建一个新的分支
`git checkout --orphan temp_branch`

### 添加所有文件到新的临时分支
```shell
git add -A
git commit --allow-empty -m "Initial commit"
```

### 推送临时分支到github

#### 删除本地分支
```shell 
git branch -D main  # 或 git branch -D master，取决于你的主分支名称
```
#### 删除远程分支
```shell
git push origin --delete main
```
以上两步因为终端无法操作作废。  
傻逼github 终端登录账户密码删除不了，只能进入网页删除(需要先推送临时分支到github)

### 删除github主分支
需要网页端修改默认分支

### 重命名临时分支为main或master