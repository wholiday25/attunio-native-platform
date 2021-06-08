Start-Transcript  -PATH "C:\Comcast\Install-SupportNowRumba.txt"

Expand-Archive -Path "C:\Comcast\Install-SupportNowRumba.zip" -DestinationPath "C:\Comcast\SupportNowRumba"-Force


# Declare settings for install switches
$param= ' /s /v"/qn"'

#Install Rumba 10 (Citrix for licensing)  and its prerequisites
Start-Process -FilePath "C:\Comcast\SupportNowRumba\RumbaPrerequisites.exe" -ArgumentList $param
Start-Sleep 120

Start-Process -Filepath "C:\Comcast\SupportNowRumba\Rumba_Citrix.exe" -ArgumentList $param
Start-Sleep 180

Remove-Item "C:\Comcast\Install-SupportNowRumba.zip" -Force

Remove-Item "C:\Comcast\SupportNowRumba\" -Recurse -Force

Stop-Transcript