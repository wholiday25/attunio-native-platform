Start-Transcript  -PATH "C:\Comcast\InstallVSBuildTools.txt"

$startInfo = New-Object System.Diagnostics.ProcessStartInfo
$startInfo.FileName = "C:\Comcast\vs_buildtools.exe"
$startInfo.Arguments = "--nocache --wait --noUpdateInstaller --add Microsoft.VisualStudio.Workload.VCTools;includeRecommended;includeOptional --quiet --norestart"
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
