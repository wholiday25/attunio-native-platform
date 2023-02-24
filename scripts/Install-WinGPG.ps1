#installs WinGPG v 1.0.1


Start-Transcript  -PATH "C:\Comcast\Install-WinGPG.txt"
Expand-Archive -Path "C:\Comcast\Install-WinGPG.zip" -DestinationPath "C:\Comcast\WinGPG" -Force


Start-Process -Filepath "C:\Comcast\WinGPG\WinGPG-1.0.1.exe"  -ArgumentList "/SP- /VERYSILENT /NORESTART" 

Start-Sleep 60 

#Remove-Item "C:\Comcast\Install-AdobeCampaignClassic7.zip" -Force
#Remove-Item "C:\Comcast\Install-AdobeCampaignClassic7\" -Recurse -Force

Stop-Transcript