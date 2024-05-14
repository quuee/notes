1 git miniconda
2 获取 hip sdk for windows 链接：https://www.amd.com/en/developer/resources/rocm-hub/hip-sdk.html  一般默认安装就行
3 下载zluda 链接：https://link.zhihu.com/?target=https%3A//github.com/lshqqytiger/ZLUDA/releases/tag/v3.2-win
4 将ROCm的安装目录 和 zluda解压后的目录加入到path
  rocm安装后会创建HIP_PATH
  path中加入rocm 的 %HIP_PATH%bin
  path中加入zluda解压后的目录
5 conda create -n test_env python=3.10.12
5.1 pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118 （选cu118不要选cu12以上，不支持的。）
5.2 把ZLUDA文件夹里的cublas.dll重命名为cublas64_11.dll，把cusparse.dll重命名为cusparse64_11.dll，并覆盖到conda的虚拟环境（C:\Users\bandz\.conda\envs\test_env\Lib\site-packages\torch\lib下）
  进入python编辑器
  import torch
  print(torch.cuda.is_available())
  成功返回True



6 stablediffusion 替换不受支持的 GPU 架构的 HIP SDK 库文件
  https://rocm.docs.amd.com/projects/install-on-windows/en/develop/reference/system-requirements.html
  根据这个文档，如果自己的GPU有双勾，跳过，去安装SD。

  如果不是，https://github.com/YellowRoseCx/koboldcpp-rocm/releases/ 下载koboldcpp_rocm_files.zip
  去 %HIP_PATH%bin\rocblas 这个文件夹里
  解压缩这个文件并到 rocblas这个文件夹
  把library文件夹拖到 rocblass这个文件夹
  重启电脑


set HSA_OVERRIDE_GFX_VERSION=10.3.0
python launch.py --medvram --opt-split-attention


参考
https://zhuanlan.zhihu.com/p/682661646
https://github.com/vladmandic/automatic/wiki/ZLUDA

安装gpt-sovits碰到的问题
1、windows conda环境下使用pip安装pyopenjtalk 0.3.3出错解决办法，在安装pyopenjtalk时，CMake没有找到合适的编译器。

安装visual studio，将CMake的路径添加到系统环境变量中。
例如，如果你使用的是Windows系统，可以将CMake的安装路径（如C:\Program Files\CMake\bin）添加到系统的PATH环境变量中
（安装完应该默认加到path了）