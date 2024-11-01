## 创建虚拟环境
conda create -n comfyui_py3_11 python=3.11

conda activate comfyui_py3_11

pip install --pre torch torchvision torchaudio --index-url https://download.pytorch.org/whl/nightly/cu124

git clone https://github.com/comfyanonymous/ComfyUI.git

cd Comfyui && pip install -r requirements.txt

pip install onnxruntime-gpu

#Install ONNX Runtime GPU (CUDA 12.x)
#The default CUDA version for onnxruntime-gpu in pypi is 12.x since 1.19.0.

python main.py #启动

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
python -c "import pathlib; [p.unlink() for p in pathlib.Path('.').rglob('*.py[co]')]"
python -c "import pathlib; [p.rmdir() for p in pathlib.Path('.').rglob('__pycache__')]"


## 插件（节点）
ComfyUI-Manager

## 外网访问
python main.py --listen 0.0.0.0