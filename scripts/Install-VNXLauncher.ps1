Start-Transcript  -PATH "C:\Comcast\Install-VNXLauncher.txt"
Expand-Archive -Path "C:\Comcast\Install-VNXLauncher.zip" -DestinationPath "C:\Comcast\Install-VNXLauncher" -Force

Start-Process -FilePath C:\Windows\System32\msiexec.exe -ArgumentList " /i ""C:\Comcast\Install-VNXLauncher\VNXLauncher-Win-32-x86-en_US-1.3.21.1.0266-1.exe"" /qn /norestart"
#msiexec /i "Adobe Campaign Classic v7  Client.msi" /qn /norestart

Start-Sleep 60 

Stop-Transcript