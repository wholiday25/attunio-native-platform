Start-Transcript  -PATH "C:\Comcast\InstallProject.txt"

Expand-Archive -Path "C:\Comcast\InstallProject-WVD.zip" -DestinationPath "C:\Comcast\Project" -Force

C:\Comcast\Project\Setup.exe /configure C:\Comcast\Project\configuration.xml

Remove-Item "C:\Comcast\InstallProject-WVD.zip" -Force

Remove-Item "C:\Comcast\Project\" -Recurse -Force

Stop-Transcript