Start-Transcript  -PATH "C:\Comcast\Install-SAPHanaAdobeLifecycle.txt"
Expand-Archive -Path "C:\Comcast\Install-SAPHanaAdobeLifecycle.zip" -DestinationPath "C:\Comcast\SAPHanaAdobeLifecycle" -Force
#$param= ' --path "C:\Program Files\SAP\Hbdstudio" --features=all --batch'

#Start-Process -FilePath "C:\Comcast\SAPGUI\SAP-GUI-RDS-UNIFIED_20210810_1950.exe" -ArgumentList " /silent"

$startInfo = New-Object System.Diagnostics.ProcessStartInfo
$startInfo.FileName = "C:\Comcast\SAPHanaAdobeLifecycle\SAP\SAPGUI-Patch\7.7 Patch0\Setup\NwSapSetup.exe"
$startInfo.Arguments =  " /silent /Product=SAPGUI+SAPBI"
$process = New-Object System.Diagnostics.Process
$process.StartInfo = $startInfo
$process.Start()
#added 12/19/2022.  to rollback, remove comment from process, remove all lines except Stop-transcript
#$process.WaitForExit()
$timer = 0
while (!$process.HasExited) {

    #Wait 5 Seconds
    sleep 5
    $timer = $timer + 5
    Write-Host "Time: $timer Seconds | Process info : $process"
}


$startInfo = New-Object System.Diagnostics.ProcessStartInfo
$startInfo.FileName = "C:\Comcast\SAPHanaAdobeLifecycle\SAP\SAPGUI-Patch\7.7 Patch0\ALD110P_21-80000927.EXE" 
$startInfo.Arguments =  " /silent"
$process = New-Object System.Diagnostics.Process
$process.StartInfo = $startInfo
$process.Start()
#added 12/19/2022.  to rollback, remove comment from process, remove all lines except Stop-transcript
#$process.WaitForExit()
$timer = 0
while (!$process.HasExited) {

    #Wait 5 Seconds
    sleep 5
    $timer = $timer + 5
    Write-Host "Time: $timer Seconds | Process info : $process"
}

$startInfo = New-Object System.Diagnostics.ProcessStartInfo
$startInfo.FileName = "C:\Comcast\SAPHanaAdobeLifecycle\SAP\SAPGUI-Patch\SAP_HANA_Studio\hdbinst.exe"
$startInfo.Arguments = " --path ""C:\Program Files\SAP\Hbdstudio"" --features=all --batch"
$process = New-Object System.Diagnostics.Process
$process.StartInfo = $startInfo
$process.Start()
#added 12/19/2022.  to rollback, remove comment from process, remove all lines except Stop-transcript
#$process.WaitForExit()
$timer = 0
while (!$process.HasExited) {

    #Wait 5 Seconds
    sleep 5
    $timer = $timer + 5
    Write-Host "Time: $timer Seconds | Process info : $process"

}

# Remove-Item "C:\Comcast\Install-SAPHanaAdobeLifecycle.zip" -Force
# Remove-Item "C:\Comcast\SAPHanaAdobeLifecycle\" -Recurse -Force

Stop-Transcript