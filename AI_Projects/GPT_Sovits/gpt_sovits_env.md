
## install rocm
https://rocm.docs.amd.com/projects/install-on-linux/en/latest/how-to/amdgpu-install.html  
sudo usermod -a -G render,video $LOGNAME
sudo reboot

## sudo apt install git 

## minianaconda
download minianaconda  
bash ./Minianaconda.sh  

conda create -n gpt-vits python=3.9
conda activate gpt-vits

## linux amd rocm
pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/rocm6.0  

test torch  
```shell
export HSA_OVERRIDE_GFX_VERSION=10.3.0
```
into python terminal  
```shell
import torch;print(torch.cuda.is_available())
```

## git clone 

## env
```shell
conda install -c conda-forge gcc
conda install -c conda-forge gxx
conda install ffmpeg cmake

pip install -r requirements-ubuntu-amd.txt
```

## edit webui.py config.py
add gpu_name 6600 in webui.py config.py

## copy nltk_data pretrained_models to our project
copy nltk_data to /home/{user}/
replace pretrained_models from modpacks
## launch
```shell
python webui.py --no-half

```

## watch GPU
sudo apt install radeontop
sudo radeontop

## error
torch.cuda.OutOfMemoryError: HIP out of memory. Tried to allocate 1.73 GiB
RuntimeError: The size of tensor a (543) must match the size of tensor b (512) at non-singleton dimension 1

## slice
min_length 350,min_interval 200 max_sil_kept 350

audio length < 10 sec

分割的音频影响后续训练的效果

## kill Zombie process
