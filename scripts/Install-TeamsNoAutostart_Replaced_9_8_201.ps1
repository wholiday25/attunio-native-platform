# set registry values for Teams to use VDI optimization 
Write-Host "Adjusting registry to set teams to WVD Environment mode" -ForegroundColor Gray
reg add HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Teams /v "IsWVDEnvironment" /t REG_DWORD /d 1 /f


# 8/26/2021 Extra Uninstall Teams to resolve verison problems. Calls Squirrel uninstall
Start-Process -FilePath "C:\Program Files (x86)\Microsoft\Teams\Update.exe" -ArgumentList " --uninstall -s"
Start-Sleep -s 240

#region Uninstall Previous Versions
# uninstall any previous versions of MS Teams or Web RTC

# Per-user teams uninstall logic 

$TeamsPath = [System.IO.Path]::Combine($env:LOCALAPPDATA, 'Microsoft', 'Teams')
$TeamsUpdateExePath = [System.IO.Path]::Combine($env:LOCALAPPDATA, 'Microsoft', 'Teams', 'Update.exe')

try {
    if ([System.IO.File]::Exists($TeamsUpdateExePath)) {
        Write-Host "Uninstalling Teams process (per-user installation)"

        # Uninstall app
        $proc = Start-Process $TeamsUpdateExePath "-uninstall -s" -PassThru
        $proc.WaitForExit()
    }
    else {
        write-host "No per-user teams install found."
    }
    Write-Host "Deleting any possible Teams directory (per user installation). Ignore any errors from this step"
    Remove-Item -path $TeamsPath -recurse | Out-Null
}
catch  {
    Write-Output "Uninstall failed with exception $_.exception.message"
}

# Per-Machine teams uninstall logic
$GetTeams = get-wmiobject Win32_Product | Where-Object IdentifyingNumber -match "{731F6BAA-A986-45A4-8936-7C3AAAAA760B}"
if ($null -ne $GetTeams){
    Start-Process C:\Windows\System32\msiexec.exe -ArgumentList '/x "{731F6BAA-A986-45A4-8936-7C3AAAAA760B}" /qn /norestart' -Wait
    Write-Host "Teams per-machine Install Found, uninstalling teams"
}

# WebRTC uninstall logic
$GetWebRTC = get-wmiobject Win32_Product | Where-Object IdentifyingNumber -match "{FB41EDB3-4138-4240-AC09-B5A184E8F8E4}"
if ($null -ne $GetWebRTC){
    Start-Process C:\Windows\System32\msiexec.exe -ArgumentList '/x "{FB41EDB3-4138-4240-AC09-B5A184E8F8E4}" /qn /norestart' -Wait
    Write-Host "WebRTC Install Found, uninstalling Current version of WebRTC"
}

#endregion

#region Download and Install Teams + WebRTC

# make directories to hold new install (Uses the TEMP D: Drive found in all Win10 Azure VMs)
mkdir D:\temp\msteams\install

# grab MSI installer for MSTeams
$DLink = "https://teams.microsoft.com/downloads/desktopurl?env=production&plat=windows&arch=x64&managedInstaller=true&download=true"
Invoke-WebRequest -Uri $DLink -OutFile "D:\temp\msteams\install\Teams_windows_x64.msi" -UseBasicParsing

# use installer to install Machine-Wide
Start-Process C:\Windows\System32\msiexec.exe -ArgumentList  '/i D:\temp\msteams\install\Teams_windows_x64.msi /l*v D:\temp\msteams\teamslog.txt ALLUSER=1 ALLUSERS=1 OPTIONS="noAutoStart=true" /qn /norestart' -wait


# get MS Docs page that has WebRTC Download link
$MSDlSite2 = Invoke-WebRequest "https://docs.microsoft.com/en-us/azure/virtual-desktop/teams-on-wvd" -UseBasicParsing

# parse through the MS Docs page to get the most up-to-date download link
ForEach ($Href in $MSDlSite2.Links.Href)
{
    if ($Href -match "https://query.prod.cms.rt.microsoft.com/cms/api/am/binary" ){
        $DLink2 = $href
    }
}

Invoke-WebRequest -Uri $DLink2 -OutFile "D:\temp\msteams\install\MsRdcWebRTCSvc_x64.msi" -UseBasicParsing

# install Teams Websocket Service
Start-Process C:\Windows\System32\msiexec.exe -ArgumentList '/i D:\temp\msteams\install\MsRdcWebRTCSvc_x64.msi /l*v D:\temp\msteams\webrtclog.txt /qn /norestart' -Wait

write-host "Finished running installers. Check D:\temp\msteams for logs on the MSI installations."

#endregion

Write-Host "All Commands Executed; script is now finished. Allow 5 minutes for teams to appear" -ForegroundColor Green
