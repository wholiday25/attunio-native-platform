Start-Transcript  -PATH "C:\Comcast\Install-SmartView.txt"
Expand-Archive -Path "C:\Comcast\Install-SmartView.zip" -DestinationPath "C:\Comcast\Install-SmartView" -Force

Start-Process -FilePath C:\Windows\System32\msiexec.exe -ArgumentList " /i ""C:\Comcast\Install-SmartView\Oracle Smart View 64-bit for Office.msi"" /qn /norestart"
#msiexec /i "Adobe Campaign Classic v7  Client.msi" /qn /norestart

Start-Sleep 60 

Stop-Transcript