Start-Transcript  -PATH "C:\Comcast\Install-MFLRVUGen12.60.txt"

Expand-Archive -Path "C:\Comcast\Install-MFLRVUGen12.60.zip" -DestinationPath "C:\Comcast\Installers" -Force

Start-Process -filepath "C:\Windows\System32\msiexec.exe" -Argumentlist "/i ""C:\Comcast\Installers\Micro Focus Virtual User Generator 12.60\Vugen_x64.msi"" /qn /l*v c:\comcast\VUGen12.60Log.txt /norestart"
Start-Sleep -s 480

Remove-Item "C:\Comcast\Install-MFLRVUGen12.60.zip" -Force

Remove-Item "C:\Comcast\Installers\Micro Focus Virtual User Generator 12.60" -Recurse -Force

Stop-Transcript