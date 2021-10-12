Start-Transcript  -PATH "C:\Comcast\Install-MetasolvProd09172021.txt"

#UnZip archive, no MSI installer
Expand-Archive -Path "C:\Comcast\Install-MetasolvProd09172021.zip" -DestinationPath "C:\Program Files\Metasolv" -Force

#Create Shortcut on Public Desktop
New-Item -ItemType SymbolicLink -Path "C:\Users\Public\Desktop" -Name "MetaSolv" -Value "C:\Program Files\Metasolv\Metasolv Prod\tbs.exe"

# Don't remove, troubleshooting 8/17/2021
#Remove-Item "C:\Comcast\Install-MetasolvProd09172021.zip" -Force

Stop-Transcript