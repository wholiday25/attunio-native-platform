Start-Transcript  -PATH "C:\Comcast\InstallCrowdStrike.txt"

# 5/12/2023  Added Regkey to enhance FSLogix sessions
# Note that Nerdio >>Integrations >>FSLogix installs to  HKLM\SOFTWARE\FSLogix\Profile
# However, this is needed:  HKLM\Software\fslogix\apps\CleanupInvalidSessions

New-ItemProperty -Path "HKLM:\Software\FSLogix\apps\" -Name 'CleanupInvalidSessions' -PropertyType DWORD -Value 1


Expand-Archive -Path "C:\Comcast\InstallCrowdStrike-AVD.zip" -DestinationPath "C:\Comcast\CrowdStrike" -Force

# According to error logs, Power servivce must be running to install Crowdstrike
# Error 0x80004005: Required service DISABLED: power
# A required Windows service is disabled, stopped, or missing. Please see the installation log for details.

Set-Service -name Power -Startuptype Automatic

Start-Service -name Power

# Full list is WinHttpAutoProxySvc,lmhosts,Dhcp,BFE,Dnscache,nsi, power
# Changed 9/13/2021 to address duplciates in Crowdstrike Console
# Start-Process -Filepath "C:\Comcast\Crowdstrike\Crowdstrike-WindowsSensor-6.33.14705.exe" -ArgumentList "/silent /install CID=1AB23F2E88784A788D3F7142081CDEFA-8A VDI=1 NO_START=1 GROUPING_TAGS=WVD, Comcast_SEP_Removal"

#Edits 10/20/2022 -- new version remove some flag per Shane Lingo
#Start-Process -Filepath "C:\Comcast\Crowdstrike\Crowdstrike-WindowsSensor-6.39.15316" -ArgumentList "/silent /install CID=1AB23F2E88784A788D3F7142081CDEFA-8A VDI=1 GROUPING_TAGS=AVD,Comcast_SEP_Removal"
Start-Process -Filepath "C:\Comcast\Crowdstrike\Crowdstrike-WindowsSensor-6.45.15907.exe" -ArgumentList "/silent /install CID=1AB23F2E88784A788D3F7142081CDEFA-8A VDI=1 GROUPING_TAGS=AVD"

Set-Itemproperty -path "HKLM:\SYSTEM\CurrentControlSet\Control" -Name 'ServicesPipeTimeout' -Value 600000
Start-Sleep -s 60

Remove-Item "C:\Comcast\CrowdStrike\" -Recurse -Force

Stop-Transcript
