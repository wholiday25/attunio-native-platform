Start-Transcript  -PATH "C:\Comcast\Install-ThinkCell.txt"
Expand-Archive -Path "C:\Comcast\Install-ThinkCell-AVD.zip" -DestinationPath "C:\Comcast\Install-ThinkCell" -Force

Start-Process -FilePath C:\Windows\System32\msiexec.exe -ArgumentList " /i ""C:\Comcast\Install-ThinkCell\setup_think-cell_30862.msi"" /qn /norestart"
#msiexec /i "Adobe Campaign Classic v7  Client.msi" /qn /norestart

Start-Sleep 60 

Stop-Transcript