Start-Transcript  -PATH "C:\Comcast\Install-OracleTOADv16.0.txt"

#UnZip archive, no MSI installer
Expand-Archive -Path "C:\Comcast\Install-OracleTOADv16.0.zip" -DestinationPath "C:\Comcast\Install-OracleTOADv16.0" -Force

#Execute-MSI -Action Install -Path "ToadforOracle_16.0.90.1509_x64_En.msi" -Parameters "/quiet /norestart RESTRICTIONS=P"
Start-Process -FilePath C:\Windows\System32\msiexec.exe -ArgumentList " /i ""C:\Comcast\OracleTOADv16.0\Files\ToadforOracle_16.0.90.1509_x64_En.msi"" /qn /norestart"
Start-Sleep  -Seconds 120

Remove-Item "C:\Comcast\Install-OracleTOADv16.0.zip" -Force
Remove-Item "C:\Comcast\Install-OracleTOADv16.0" -Recurse -Force
Stop-Transcript