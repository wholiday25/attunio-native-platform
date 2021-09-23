Start-Transcript  -PATH "C:\Comcast\Install-AccessDatabaseEngine.txt"

#Install AccessDatabaseEngine

Start-Process -Filepath "C:\Comcast\AccessDatabaseEngine.exe" -ArgumentList "/quiet" -Wait

Remove-Item "C:\Comcast\AccessDatabaseEngine.exe" -Force

Stop-Transcript