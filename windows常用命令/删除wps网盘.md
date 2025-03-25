注册表

## 第一处
计算机\HKEY_USERS\S-1-5-21-659195866-849881651-1175438114-500\Software\Microsoft\Windows\CurrentVersion\Explorer\Desktop\NameSpace\{7AE6DE87-C956-4B40-9C89-3D166C9841D3}  

S-1-5-21-659195866-849881651-1175438114-500这段可能每台电脑不同

## 第二处
计算机\HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{5FCD4425-CA3A-48F4-A57C-B8A75C32ACB1}


或者

1、删除盘符位置的图标（WPS网盘、百度网盘）打开注册表以下路径：HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace点开里面的注册表项，即可在描述中看到对应盘符图标；删除刷新资源管理器即可。
2、删除左侧导航栏里面的快捷方式（WPS网盘、OneDrive）打开注册表以下路径：HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\Desktop\NameSpace点开里面的注册表项，删除刷新资源管理器即可。


