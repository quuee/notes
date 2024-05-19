使用管理员权限运行CMD  
winget uninstall MicrosoftWindows.Client.WebExperience_cw5n1h2txyewy  

Get-AppxPackage -allusers *WebExperience* | Remove-AppxPackage  