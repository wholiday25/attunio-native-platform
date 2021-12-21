Start-Transcript  -PATH "C:\Comcast\Install-MFLRVUG_00264.txt"

Expand-Archive -Path "C:\Comcast\Install-MFLRVUG_00264.zip" -DestinationPath "C:\Comcast\Installers" -Force

Start-Process -filepath "C:\Comcast\Installers\LRVUG_00264\LRVUG_00264.exe" -Argumentlist "/q"
Start-Sleep -s 240

Remove-Item "C:\Comcast\Install-MFLRVUG_00264.zip" -Force

# Remove-Item "C:\Comcast\Installers\LRVUG_00264" -Recurse -Force

Stop-Transcript