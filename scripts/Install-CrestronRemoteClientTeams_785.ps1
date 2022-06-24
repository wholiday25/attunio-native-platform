Start-Transcript  -PATH "C:\Comcast\Install-CrestronRemoteClientTeams_785.txt"

Expand-Archive -Path "C:\Comcast\Install-CrestronRemoteClientTeams_785.zip" -DestinationPath "C:\Comcast\CrestronRemoteClientTeams_785"-Force


# Declare settings for install switches
$param= ' /s /v"/qn"'

#Install-Crestron Remote Client For Teams Troubleshooting

Start-Process -Filepath "C:\Comcast\CrestronRemoteClientTeams_785\crestronremoteclient_785.exe" -ArgumentList $param
Start-Sleep 120
# modify firewall settings
New-NetFirewallRule -DisplayName "Allow Crestron Client for Teams Rooms" -Direction Inbound -Program "C:\Program Files\Crestron\Crestron Remote\CrestronRemoteClient.exe" -Profile Any -Action Allow
Remove-NetFirewallRule -DisplayName "CrestronRemoteClient"


Remove-Item "C:\Comcast\Install-CrestronRemoteClientTeams_785.zip" -Force

Stop-Transcript