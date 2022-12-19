Start-Transcript  -PATH "C:\Comcast\Install-AdobeCreativeCloud.txt"

Expand-Archive -Path "C:\Comcast\Install-AdobeCreativeCloud.zip" -DestinationPath "C:\Comcast\AdobeCreativeCloud"-Force

#Declare settings for install switches
#Install Adobe Creative Cloud 
#Start-Process -Filepath "C:\Comcast\AdobeCreativeCloud\Adobe Creative Cloud All Apps\Build\setup.exe" -ArgumentList " --silent" -Wait
#"C:\Comcast\AdobeCreativeCloud\Adobe Creative Cloud All Apps\Build\setup.exe --silent"
$startInfo = New-Object System.Diagnostics.ProcessStartInfo
$startInfo.FileName = "C:\Comcast\AdobeCreativeCloud\Adobe Creative Cloud All Apps\Build\setup.exe"
$startInfo.Arguments = "--silent"
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





Remove-Item "C:\Comcast\Install-AdobeCreativeCloud.zip" -Force

Remove-Item "C:\Comcast\AdobeCreativeCloud\" -Recurse -Force

Stop-Transcript