#This script install T-Recs version 10.2.0
#Created 12/18/2023 by Mark Schlegel

Start-Transcript  -PATH "C:\Comcast\Install-T-Recs10.2.0.txt"

Expand-Archive -Path "C:\Comcast\Install-T-Recs10.2.0.zip" -DestinationPath "C:\Comcast\Install-T-Recs10.2.0" -Force

#Install script install T-Recs version 10.2.0
CD C:\Comcast\Install-T-Recs10.2.0\T-Recs10.2.0
Start-Process -FilePath .\setup.exe -ArgumentList " /SILENT /NORESTART"
Start-Sleep 60

#Remove-Item "C:\Comcast\Install-T-Recs10.2.0.zip" -Force

#Stop-Transcript