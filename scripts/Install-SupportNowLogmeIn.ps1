Start-Transcript  -PATH "C:\Comcast\Install-SupportNowLogmeIn.txt"

Expand-Archive -Path "C:\Comcast\Install-SupportNowLogmeIn.zip" -DestinationPath "C:\Comcast\SupportNowLogMeIn" -Force

#Install LogMeIn
Start-Process -FilePath "C:\Comcast\SupportNowLogMeIn\LogMeInRescueTechnicianConsoleApp.msi" -ArgumentList " /qn /norestart"
Start-Sleep 60

#Remove-Item "C:\Comcast\Install-SupportNowLogmeIn.zip" -Force
#Remove-Item "C:\Comcast\SupportNowLogMeIn\" -Recurse -Force

Stop-Transcript