Start-Transcript  -PATH "C:\Comcast\InstallSEP.txt"

Expand-Archive -Path "C:\Comcast\InstallSEP-WVD.zip" -DestinationPath "C:\Comcast\" -Force

Start-Process  "C:\Comcast\SEP\Setup.exe"

Start-Sleep -s 60

Start-Process "C:\Comcast\ClientSideClonePrepTool\ClientSideClonePrepTool.exe"

Stop-Transcript
