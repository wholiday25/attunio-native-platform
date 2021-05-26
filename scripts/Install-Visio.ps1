Start-Transcript  -PATH "C:\Comcast\InstallVisio.txt"

Expand-Archive -Path "C:\Comcast\InstallVisio-WVD.zip" -DestinationPath "C:\Comcast\Visio" -Force

C:\Comcast\Visio\Setup.exe /configure C:\Comcast\Visio\configuration.xml

Remove-Item "C:\Comcast\InstallVisio-WVD.zip" -Force

Remove-Item "C:\Comcast\Visio\" -Recurse -Force

Stop-Transcript