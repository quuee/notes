## 创建虚拟环境

```
conda create -n comfyui_py3_12 python=3.12

conda activate comfyui_py3_12

conda env list

conda activate comfyui_py312

conda create -n comfyui_py312 --clone comfyui_py312_bak #clone

conda deactivate

conda remove -n comfyui_py312 --all

```


## cuda环境
1. nvidia-smi查看自己能安装的cuda toolkit最新版本是多少  
(查看对应版本)[https://docs.nvidia.com/cuda/cuda-toolkit-release-notes/index.html]  
驱动是可以向下兼容cuda toolkit  
2. 如果pytorch支持的cuda是12.4 ，cuda toolkit 需要下载12.4以上；如果是支持12.1，cuda toolkit 需要下载12.1以上

3. cuda和cudnn是支持NVIDIA的GPU计算的两个库，cuda是高性能计算，cudnn是深度神经网络计算。一般装cuda就OK

## python环境

```
git clone https://github.com/comfyanonymous/ComfyUI.git
#进入ComfyUI目录

pip install onnxruntime-gpu
#Install ONNX Runtime GPU (CUDA 12.x)
#The default CUDA version for onnxruntime-gpu in pypi is 12.x since 1.19.0.

#先安装torch，清华源可能很慢
pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu124
cd Comfyui && pip install -r requirements.txt
```
  
pip conda 都是python包下载安装工具，pip只支持python包，conda能下载其他语言包，比如C/C++,R语言等  
两者Repo源不一样，conda会少一些小众的包  
pip包是wheel(已编译的)或源代码发行版(需要编译)  
conda包都是二进制文件，不用编译，直接用  
pip对环境依赖检查较差，依赖越来越多，冲突可能性加大（有待严重） 
conda会检查虽有依赖  
虚拟环境中pip安装的包会在当前环境中  
conda安装的包会放在anaconda3/pkgs下，用的时候复制过去  

## 下载comfyui
小心从镜像加速站下载的comfyui可能不是最新的

## 模型目录
编辑extra_model_paths.yaml，换成自己目录的位置（不要在这个文件加中文，不然编码报错）
```
comfyui:
    base_path: C:/Users/bandz/Documents/Stable_Diffusion/Local_Env/
    # You can use is_default to mark that these folders should be listed first, and used as the default dirs for eg downloads
    is_default: true
    checkpoints: models/checkpoints/
    clip: models/clip/
    clip_vision: models/clip_vision/
    configs: models/configs/
    controlnet: models/controlnet/
    diffusion_models: |
                 models/diffusion_models
                 models/unet
    embeddings: models/embeddings/
    loras: models/loras/
    upscale_models: models/upscale_models/
    vae: models/vae/
   # custom_nodes: custom_nodes/ #自定义目录启动时报错找不到模块, 放comfyui/custom_nodes/下没问题. 因为启动时是在comfyui目录下执行 python main.py
```

### 清理python缓存文件
```
python -c "import pathlib; [p.unlink() for p in pathlib.Path('.').rglob('*.py[co]')]"
python -c "import pathlib; [p.rmdir() for p in pathlib.Path('.').rglob('__pycache__')]"

```

## 节点[插件]
### ComfyUI-Manager

### AIGODLIKE-ComfyUI-Translation
翻译插件
TODO 最新版comfyui不起作用

### UlimateSDUpscale 
这个插件克隆时要添加 --recursive （递归克隆，项目里还有其他项目）
```
git clone https://github.com/ssitu/ComfyUI_UltimateSDUpscale --recursive
```

### stable-fast-3d
从安装git
```
pip install git+https://github.com/vork/PyNanoInstantMeshes.git@v0.0.3

```
从项目目录安装
```
pip install ./uv_unwrapper/
pip install ./texture_baker
```

### comfyui-3d-pack (据说是最难装的插件，没有之一)
该项目不支持最新的cuda12.4，跳过检查安装  
1. 进入_Pre_Builds目录下
2. 添加cub_home到环境变量
3. 在build_config.yaml添加新的cuda版本，是代码可执行
4. 在build_util.py里将 CUDA_VERSION = get_cuda_version() 改为 CUDA_VERSION = 'cu124' 
5. 因网络问题，将dependencies.txt里面的github项目换成带镜像加速的地址
6. 配置cl.exe到环境变量path C:\Program Files\Microsoft Visual Studio\2022\Community\VC\Tools\MSVC\14.41.34120\bin\Hostx64\x64
7. 启用长路径
8. ninja -v 报错，C:\Users\AX\.conda\envs\comfyui_py311_cuda121\Lib\site-packages\torch\utils\cpp_extension.py 找到修改为ninja --version

TODO 难道torch版本过高？
[Wheel BUILD ERROR LOG]
Emitting ninja build file C:\Users\AX\Documents\Stable_Diffusion\ComfyUI\custom_nodes\ComfyUI-3D-Pack\_Pre_Builds\_Build_Dependencies\pytorch3d\build\temp.win-amd64-cpython-311\Release\build.ninja...
Compiling objects...
Allowing ninja to set a default number of workers... (overridable by setting the environment variable MAX_JOBS=N)
error: command 'C:\\Program Files\\Microsoft Visual Studio\\2022\\Community\\VC\\Tools\\MSVC\\14.41.34120\\bin\\HostX86\\x64\\link.exe' failed with exit code 1181

## 节点（插件）环境依赖库

torch
importlib_metadata
huggingface_hub
scipy
opencv-python>=4.7.0.72
filelock
numpy
Pillow
einops
torchvision
pyyaml
scikit-image
python-dateutil
mediapipe
svglib
fvcore
yapf
omegaconf
ftfy
addict
yacs
trimesh[easy]
albumentations
scikit-learn
matplotlib

diffusers>=0.27.0
accelerate>=0.29.0,<0.32.0
peft>=0.7.0

GitPython
PyGithub
matrix-client==0.4.0
transformers
huggingface-hub>0.20
typer
rich
typing-extensions

这依赖插件越多，依赖越难管理

## 外网访问
1. python main.py --listen 0.0.0.0
2. 修改cli_args.py，将127.0.0.1改为0.0.0.0
3. 修改


## comfyui in docker
https://github.com/YanWenKun/ComfyUI-Docker