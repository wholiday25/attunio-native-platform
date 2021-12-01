Start-Transcript  -PATH "C:\Comcast\Install-SecureCRT.txt"

Expand-Archive -Path "C:\Comcast\Install-SecureCRT.zip" -DestinationPath "C:\Comcast\Installers" -Force

Start-Process -filepath "C:\Windows\System32\msiexec.exe" -Argumentlist "/i ""C:\Comcast\Installers\scrt911_Comcast-x64.msi"" /qn"

Remove-Item "C:\Comcast\Install-SecureCRT.zip" -Force

Stop-Transcript