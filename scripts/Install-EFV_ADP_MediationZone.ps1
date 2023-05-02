#--this installs EFV_ADPMediation Zone Launcher

Start-Transcript  -PATH "C:\Comcast\Install-MediationzoneLauncher.txt"
Expand-Archive -Path "C:\Comcast\Install-MediationzoneLauncher.zip" -DestinationPath "C:\Comcast" -Force

md "C:\Program Files\Mediation Launcher"
copy "C:\Comcast\Mediationzone Launcher\*.*" "C:\Program Files\Mediation Launcher"

md "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Mediation Launcher"
copy "C:\Program Files\Mediation Launcher\Mediationzone launcher.lnk" "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Mediation Launcher\"


Stop-Transcript