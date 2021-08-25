Start-Transcript  -PATH "C:\Comcast\Install-IBMAsperaConnect.txt"

Expand-Archive -Path "C:\Comcast\Install-IBMAsperaConnect.zip" -DestinationPath "C:\Comcast\IBMAsperaConnect" -Force

#Install LogMeIn
Start-Process -FilePath "C:\Windows\System32\msiexec.exe" -ArgumentList " /i C:\Comcast\IBMAsperaConnect\IBMAsperaConnect-ML-3.10.1.181943.msi WIX_APP_FOLDER=WixPerMachineFolder ALLUSERS=1 REBOOT=REALLYSUPPRESS /qn"
Start-Sleep 60

Remove-Item "C:\Comcast\Install-IBMAsperaConnect.zip" -Force

Remove-Item "C:\Comcast\IBMAsperaConnect\" -Recurse -Force

Stop-Transcript