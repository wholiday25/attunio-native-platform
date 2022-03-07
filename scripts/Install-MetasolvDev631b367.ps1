Start-Transcript  -PATH "C:\Comcast\Install-MetasolvDev631b367.txt"

#UnZip DEV archive, no MSI installer

Expand-Archive -Path "C:\Comcast\Install-MetasolvDev631b367.zip" -DestinationPath "C:\Program Files\Metasolv" -Force
New-Item -ItemType SymbolicLink -Path "C:\Users\Public\Desktop" -Name "MetaSolvDEV" -Value "C:\Program Files\Metasolv\MetasolvDEV\tbs.exe"

Stop-Transcript