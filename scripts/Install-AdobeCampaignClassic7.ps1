Start-Transcript  -PATH "C:\Comcast\Install-AdobeCampaignClassic7.txt"
Expand-Archive -Path "C:\Comcast\Install-AdobeCampaignClassic7.zip" -DestinationPath "C:\Comcast\AdobeCampaignClassic7" -Force

#Start-Process -FilePath "C:\Comcast\SAPGUI\SAP-GUI-RDS-UNIFIED_20210810_1950.exe" -ArgumentList " /silent"

Start-Process -FilePath C:\Windows\System32\msiexec.exe -ArgumentList " /i ""C:\Comcast\AdobeCampaignClassic7\Adobe Campaign Classic v7  Client.msi"" /qn /norestart"
#msiexec /i "Adobe Campaign Classic v7  Client.msi" /qn /norestart

Start-Sleep 60 

#Remove-Item "C:\Comcast\Install-AdobeCampaignClassic7.zip" -Force
#Remove-Item "C:\Comcast\Install-AdobeCampaignClassic7\" -Recurse -Force

Stop-Transcript