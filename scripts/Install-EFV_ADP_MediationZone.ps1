#--this installs EFV_ADPMediation Zone Launcher

Start-Transcript  -PATH "C:\Comcast\Install-MediationzoneLauncher.txt"
Expand-Archive -Path "C:\Comcast\Install-MediationzoneLauncher.zip" -DestinationPath "C:\Program Files\Mediationzone Launcher" -Force

md "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Mediation Launcher"
copy "C:\Program Files\Mediationzone Launcher\Mediationzone launcher.lnk" "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Mediationzone Launcher\"


Stop-Transcript