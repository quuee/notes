IP地址/16或者/24的意义

当创建VPC专有网络时，许多人会遇到填写IPv4地址的情况，通常使用的格式是xxx.xxx.xxx.xxx/16或者xxx.xxx.xxx.xxx/24。那么这个斜杠后面的数字代表什么意思呢？

实际上，IPv4地址是由32位二进制数组成的。

 
1、以192.168.0.0/16为例，它的二进制表示是11000000.10101000.00000000.00000000。/16表示前16位是网络地址，后16位是主机地址，即从11000000.10101000.00000000.00000000到11000000.10101000.11111111.11111111。

所表示的IP地址范围是从192.168.0.0到192.168.255.255，其中最后一个地址为广播地址，因此可用IP地址数量为65534。

 

2、如果是/24，它表示前24位是网络地址，后8位是主机地址。例如，192.168.0.0/24表示的IP地址范围是从11000000.10101000.00000000.00000000到11000000.10101000.00000000.11111111。

所表示的IP地址为192.168.0.0到192.168.0.255，其中最后一个地址为广播地址，因此可用IP地址数量为254。

 

子网掩码还决定了网络的大小。因此，在选择子网掩码时，需要考虑所需的IP地址数量和网络规模。