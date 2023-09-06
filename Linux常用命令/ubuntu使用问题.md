### 打不开终端
是语言包不对导致的，要切换成都是中文或都是英文
### ibus pinyin输入法
在终端可以输入，在浏览器无法输入。
解决：.bashrc 中加入 export LC_CTYPE=zh_CN.UTF-8 后重启。
