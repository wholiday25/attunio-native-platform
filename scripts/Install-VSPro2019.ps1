
<#
This script installs Visual Studio 2019
and the C++ Desktop Build tools
and the .NET 5.0 Core and Build tools
ID: Microsoft.VisualStudio.Workload.ManagedDesktop
ID: Microsoft.VisualStudio.Workload.NativeDesktop
#>

Start-Transcript  -PATH "C:\Comcast\Install-VSPro2019.txt"

$startInfo = New-Object System.Diagnostics.ProcessStartInfo
$startInfo.FileName = "C:\Comcast\vs_professional__2019.exe"
$startInfo.Arguments = "--nocache --wait --noUpdateInstaller --add Microsoft.VisualStudio.Workload.NativeDesktop;includeRecommended;includeOptional --add Microsoft.VisualStudio.Workload.ManagedDesktop --quiet --norestart"
$process = New-Object System.Diagnostics.Process
$process.StartInfo = $startInfo
$process.Start()
$process.WaitForExit()

Stop-Transcript