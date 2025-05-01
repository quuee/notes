## 用 markdown 记录笔记

为什么不用 gitee，一个 G 的项目根本传不上去。github 几分钟就 ok 了。

## markdown 语法速览

| Syntax   | Description                                                                                                           |
| -------- | --------------------------------------------------------------------------------------------------------------------- |
| 标题     | `# H1` <br>`## H2` <br> `### H3`                                                                                      |
| 标题编号 | `### title {#custome-id}`                                                                                             |
| 粗体     | `**Blod Text**`                                                                                                       |
| 斜体     | `_Italicized Text_`                                                                                                   |
| 引用块   | `> blockquote`                                                                                                        |
| 有序列表 | `1. First item`<br>`2. Second item` <br>`3. Third item`                                                               |
| 无序列表 | `- First item`<br>`- Second item`<br>`- Third item`                                                                   |
| 代码     | `code` <br> `print("hello")`                                                                                          |
| 代码块   | ` ```json {name:''} ``` `                                                                                             |
| 分隔线   | `---` <br> `***` <br> `___`                                                                                           |
| 链接     | `[title](https://www.example.com)`                                                                                    |
| 图片     | `![alt text](image.jpg)`                                                                                              |
| 表格     | `\| Syntax \| Description \|`<br> `\| ---------\| ---------\|`<br>`\| Header \|Title \|`<br>`\| Paragraph \| Text \|` |
| 脚注     | `这里有个脚注。[^1]` <br> `[^1]:hi`                                                                                   |
| 定义列表 | `term` <br> `: definition `                                                                                           |
| 删除线   | `~~The world is flat.~~    `                                                                                          |
| 任务列表 | `- [x] task1 `<br> `- [ ] task2`                                                                                      |

## 树型目录

- project
  - index.html
  - index.css
  - /app
    - index.html
    - index.css

### windows 生成命令

```shell
tree [path] [/f] [/a]
#/f 显示每个文件中文件的名称
#/a 使用ASCII字符，而不使用扩展字符
```

### linux 生成命令

```shell
tree [path]
# -L 选项可以限制递归的深度
# -d 选项，tree 将仅列出目录而不包括文件
# -a 包含隐藏文件
# -P 使用模式匹配
# -I 排除特定文件
# > 输出到文件
# -s 显示文件大小
# -h 人性化显示
# -f 显示完整的路径
# -C 颜色输出
# --dirsfirst  按文件类型分类

```

## 不转义

- `\`

## 换行

1. 末尾添加两个空格
2. `<br>`
3. 空行来换行

## mermaid 流程图 时序图 甘特图

[Markdown 高级技巧](https://www.runoob.com/markdown/md-advance.html)

## 数学公式

## 使用其他字体

## 内嵌 html
