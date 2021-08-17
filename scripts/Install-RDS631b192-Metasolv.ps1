Start-Transcript  -PATH "C:\Comcast\Install-RDS631b192-Metasolv.txt"

#UnZip archive, no MSI installer
Expand-Archive -Path "C:\Comcast\Install-RDS631b192-Metasolv.zip" -DestinationPath "C:\Program Files\Metasolv" -Force

#Create Shortcut on Public Desktop
New-Item -ItemType SymbolicLink -Path "C:\Users\Public\Desktop" -Name "MetaSolv" -Value "C:\Program Files\Metasolv\RDS631b192\tbs.exe"

Remove-Item "C:\Comcast\Install-RDS631b192-Metasolv.zip" -Force

#UnZip DEV archive, no MSI installer
Expand-Archive -Path "C:\Comcast\Install-MetasolvDEV.zip" -DestinationPath "C:\Program Files\Metasolv" -Force
New-Item -ItemType SymbolicLink -Path "C:\Users\Public\Desktop" -Name "MetaSolvDEV" -Value "C:\Program Files\Metasolv\MetasolvDEV\tbs.exe"

Stop-Transcript