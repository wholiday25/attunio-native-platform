
<#
This script installs Visual Studio 2019
and the .NET 5.0 and Core tools
ID: Microsoft.VisualStudio.Workload.ManagedDesktop
4/13/2022 -- Added
Microsoft.VisualStudio.Workload.NetWeb;includeRecommended;includeOptional
Microsoft.VisualStudio.Workload.NetCoreTools;includeRecommended;includeOptional

#>

Start-Transcript  -PATH "C:\Comcast\Install-VSPro2019.txt"

$startInfo = New-Object System.Diagnostics.ProcessStartInfo
$startInfo.FileName = "C:\Comcast\vs_professional__2019.exe"
$startInfo.Arguments = "--nocache --wait --noUpdateInstaller --add Microsoft.VisualStudio.Component.SQL.SSDT;includeRecommended;includeOptional --quiet --norestart"
$process = New-Object System.Diagnostics.Process
$process.StartInfo = $startInfo
$process.Start()
$process.WaitForExit()

Stop-Transcript