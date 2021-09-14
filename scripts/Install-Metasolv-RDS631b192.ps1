Start-Transcript  -PATH "C:\Comcast\Install-Metasolv-RDS631b192.txt"

#UnZip archive, no MSI installer
Expand-Archive -Path "C:\Comcast\Install-Metasolv-RDS631b192.zip" -DestinationPath "C:\Program Files\Metasolv" -Force

#Create Shortcut on Public Desktop
New-Item -ItemType SymbolicLink -Path "C:\Users\Public\Desktop" -Name "MetaSolv" -Value "C:\Program Files\Metasolv\RDS631b192\tbs.exe"

# Don't remove, troubleshooting 8/17/2021
#Remove-Item "C:\Comcast\Install-RDS631b192-Metasolv.zip" -Force

Stop-Transcript