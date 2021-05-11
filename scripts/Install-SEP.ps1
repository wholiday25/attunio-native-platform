Start-Transcript  -PATH "C:\Comcast\InstallSEP.txt"

Start-Process  "\\ccwvdPROD.file.core.windows.net\imager\ScriptApps\SymantectEndPointProtection\Symantec Endpoint Protection version 14.2.5569.2100 - English\Setup.exe"

Start-Sleep -s 60

Stop-Transcript
