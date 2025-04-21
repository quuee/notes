在使用 Git 时，有时会遇到已经在 .gitignore 文件中忽略的文件仍然被提交到远程仓库的问题。这通常是因为这些文件在添加到 .gitignore 之前已经被 Git 跟踪。  
当文件已经被 Git 跟踪时，简单地将其添加到 .gitignore 文件中是无效的。Git 仍然会继续跟踪这些文件的更改

### 解决
1. 清除缓存中的文件
`git rm -r --cached example.txt`
2. 提交和推送更改
```shell
git add .gitignore
git commit -m "Update .gitignore to ignore example.txt"
git push origin main
```