#Start-Transcript  -PATH "C:\Comcast\Install-AnyPoint.txt

#Install Install-AnyPoint
md "C:\Program Files\AnyPoint"
Expand-Archive -Path "C:\Comcast\Install-AnyPointStudio.zip" -DestinationPath "C:\Program Files\AnyPoint" -Force
# Start-Sleep 60

#Make AnyPoint Start Menu folder and shortcut
md "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Anypoint Studio"
Copy-Item "C:\Program Files\AnyPoint\AnyPointstudio\AnypointStudio.lnk" "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Anypoint Studio"

Remove-Item "C:\Comcast\Install-AnyPointStudio.zip" -Force

#Stop-Transcript