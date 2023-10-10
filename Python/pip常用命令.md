## 安装

pip install [packagename]

pip install -i [https://pypi.tuna.tsinghua.edu.cn/simple] [packagename] # -i 或 -index 指定镜像源

pip install --target=d:\path [packagename] #安装到指定位置

pip --default-timeout=100 install [packagename] #指定延时时间

pip install -r requirements.txt -i https://pypi.mirrors.ustc.edu.cn/simple/

## 卸载

pip uninstall [packagename]

## 更新

pip install --upgrade [packagename]

## 升级pip

pip install -U pip

## 查看已安装的包

### 查看所有

pip list 或 pip freeze

### 查看可升级的包

pip list -o

### 查看单个包

pip show [packagename]

### 搜索包

pip search [packagename]

### 打包

pip wheel [包名]

### requirements.txt

用于记录以来包和版本

生成requirements.txt文件：pip freeze > requirements.txt

安装requirements.txt依赖： pip install -r requirements.txt

pip install -i https://pypi.tuna.tsinghua.edu.cn/simple -r .\requirements.txt
