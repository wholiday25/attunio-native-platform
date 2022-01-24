Start-Transcript  -PATH "C:\Comcast\InstallTeammate.txt"

Expand-Archive -Path "C:\Comcast\Install-Teammate.zip" -DestinationPath "C:\Comcast\Teammate" -Force


Start-Process -Filepath "C:\Comcast\Teammate\TeamMate_R11.2_Desktop_Update_One.exe" -ArgumentList '/s /v"/qn /l*v setup.log"'
Start-Sleep -s 120

Remove-Item "C:\Comcast\Teammate\" -Recurse -Force

Stop-Transcript
