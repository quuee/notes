### swap

交换分区 8G以下设置两倍大小，以上同样大就行。

### EFI引导分区

逻辑分区 ext4 512m~1024m。如果主板bios是UEFI+GPT分区模式，就不需要设置/boot分区了，/boot分区时legacy+mbr分区使用，特别时双系统，避免破坏其他系统引导文件

### /home

用户分区 逻辑分区 ext4

### / 根目录

主分区 ext4 如果不给其他目录挂载分区，所有的linux系统文件都在这里
