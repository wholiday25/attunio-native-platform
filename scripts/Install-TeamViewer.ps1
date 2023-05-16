Start-Transcript  -PATH "C:\Comcast\Install-TeamViewer.txt"
Expand-Archive -Path "C:\Comcast\Install-TeamViewer.zip" -DestinationPath "C:\Comcast\Install-TeamViewer" -Force

#Start-Process -FilePath "C:\Comcast\SAPGUI\SAP-GUI-RDS-UNIFIED_20210810_1950.exe" -ArgumentList " /silent"

Start-Process -FilePath "C:\Comcast\Install-TeamViewer\TeamViewer_Setup_x64.exe" -ArgumentList " /S"
Start-Sleep 60 

#Remove-Item "C:\Comcast\Install-AdobeCampaignClassic7.zip" -Force
#Remove-Item "C:\Comcast\Install-AdobeCampaignClassic7\" -Recurse -Force

Stop-Transcript