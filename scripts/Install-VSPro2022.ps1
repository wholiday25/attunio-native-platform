
<#
This script installs Visual Studio 2019
and the .NET 5.0 and Core tools
ID: Microsoft.VisualStudio.Workload.ManagedDesktop
4/13/2022 -- Added
Microsoft.VisualStudio.Workload.NetWeb;includeRecommended;includeOptional
Microsoft.VisualStudio.Workload.NetCoreTools;includeRecommended;includeOptional
2/20/2022  See 
https://learn.microsoft.com/en-us/visualstudio/install/workload-component-id-vs-community?view=vs-2022
for workload IDs
Be sure to select Visual Studio 2022 from upper left !
#>

Start-Transcript  -PATH "C:\Comcast\Install-VSPro2022.txt"

$startInfo = New-Object System.Diagnostics.ProcessStartInfo
$startInfo.FileName = "C:\Comcast\vs_professional__2022.exe"
$startInfo.Arguments = "--nocache --wait --noUpdateInstaller --add Microsoft.VisualStudio.Workload.ManagedDesktop;includeRecommended;includeOptional --add Microsoft.VisualStudio.Workload.NetWeb;includeRecommended;includeOptional --add Microsoft.VisualStudio.Component.SQL.SSDT;includeRecommended;includeOptional --quiet --norestart"
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
Write-Host "Process $process exited"
Stop-Transcript 
