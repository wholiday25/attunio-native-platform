Start-Transcript  -PATH "C:\Comcast\Install-SAPGUI.txt"

Expand-Archive -Path "C:\Comcast\Install-SAPGUI.zip" -DestinationPath "C:\Comcast\SAPGUI" -Force

Start-Process -FilePath "C:\Comcast\SAPGUI\SAP-GUI-RDS-UNIFIED_20210810_1950.exe" -ArgumentList " /silent"
Start-Sleep -s 240

Remove-Item "C:\Comcast\Install-SAPGUI.zip" -Force
Remove-Item "C:\Comcast\Install-SAPGUI\" -Recurse -Force

Stop-Transcript