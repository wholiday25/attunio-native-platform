Start-Transcript  -PATH "C:\Comcast\InstallTeammate.txt"

Expand-Archive -Path "C:\Comcast\Install-Teammate.zip" -DestinationPath "C:\Comcast\Teammate" -Force


Start-Process -Filepath "C:\Windows\System32\msiexec.exe" -ArgumentList " /i C:\Comcast\Teammate\TeamMate_R11.2_Desktop_Update_One.msi /t C:\Comcast\Teammate\1033.MST /qn"
Start-Sleep -s 120

# Remove-Item "C:\Comcast\Teammate\" -Recurse -Force

Stop-Transcript
