Start-Transcript  -PATH "C:\Comcast\InstallBGInfo.txt"

Expand-Archive -Path "C:\Comcast\BGInfo.zip" -DestinationPath "C:\Comcast\BGInfo" -Force

reg import C:\Comcast\BGInfo\bginfo.reg

Stop-Transcript