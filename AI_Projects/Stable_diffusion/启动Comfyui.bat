@echo off
echo "launch comfyui"
D:
cd D:\Stable_Diffusion\ComfyUI-master
call conda activate comfyui_py3_12
python ./main.py --listen 0.0.0.0
pause