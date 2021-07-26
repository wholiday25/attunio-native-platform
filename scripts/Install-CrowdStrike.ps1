Start-Transcript  -PATH "C:\Comcast\InstallCrowdStrike.txt"

Expand-Archive -Path "C:\Comcast\InstallCrowdStrike-WVD.zip" -DestinationPath "C:\Comcast\CrowdStrike" -Force

# According to error logs, Power servivce must be running to install Crowdstrike
# Error 0x80004005: Required service DISABLED: power
# A required Windows service is disabled, stopped, or missing. Please see the installation log for details.

Set-Service -name Power -Startuptype Automatic

Start-Service -name Power

# Full list is WinHttpAutoProxySvc,lmhosts,Dhcp,BFE,Dnscache,nsi, power

Start-Process -Filepath "C:\Comcast\Crowdstrike\Crowdstrike-WindowsSensor-6.23.13702.exe" -ArgumentList "/silent /install CID=1AB23F2E88784A788D3F7142081CDEFA-8A VDI=1 NO_START=1 GROUPING_TAGS=WVD, Comcast_SEP_Removal"

Start-Sleep -s 60

Remove-Item "C:\Comcast\CrowdStrike\" -Recurse -Force

Stop-Transcript
