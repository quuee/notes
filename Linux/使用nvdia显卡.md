## linux下安装显卡驱动
### 查看显卡型号
`lspci | grep -i vga `
> 01:00.0 VGA compatible controller: NVIDIA Corporation AD106 [GeForce RTX 4060 Ti] (rev a1)

### 下载驱动
https://www.nvidia.cn/drivers/lookup/

### 安装驱动
`sudo sh ./NVIDIA-Linux-x86_64-570.124.04.run`

### 检验是否成功
`nvidia-smi`

### GCC 基础环境依赖不完整
补齐基本编译环境再安装驱动

>sudo apt-get install build-essential
The following packages have unmet dependencies:
 build-essential : Depends: libc6-dev but it is not going to be installed or
                            libc-dev
 libstdc++-12-dev : Depends: libc6-dev (>= 2.23-1~) but it is not going to be installed
E: Unable to correct problems, you have held broken packages.

>libc6-dev : Depends: libc6 (= 2.36-9+deb12u10) but 2.36-9+deb12u4 is to be installed

aptitude 是一个更强大的包管理工具，可以更好地处理复杂的依赖关系。  
`sudo apt-get install aptitude  `
`sudo aptitude install build-essential`
`gcc --version`

`sudo apt install gcc g++ make`

## docker 启动找不到GPU设备
安装nvidia-container-toolkits 需要使用国内源安装。外网已被禁止访问

[comfyui3d-pt25 docker-compose.yaml](/AI_Projects/Stable_diffusion/Comfyui/docker-compose.yaml)

## 重启docker

