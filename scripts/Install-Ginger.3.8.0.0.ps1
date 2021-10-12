#Start-Transcript  -PATH "C:\Comcast\Install-Ginger.3.8.0.0.txt"

#Install Install-Ginger.3.8.0.0
Start-Process -FilePath "C:\Comcast\Ginger.3.8.0.0.exe" -ArgumentList "/VERYSILENT /DIR 'C:\Program Files (x86)\Amdocs\Ginger by amdocs' /NORESTART" -Wait
# Start-Sleep 60

#Set Properties on Ginger folder for updating ChromeDriver.exe
icacls.exe "C:\Program Files (x86)\Amdocs" /grant "Authenticated Users:(OI)(CI)(M)"

Remove-Item "C:\Comcast\Ginger.3.8.0.0.exe" -Force

#Stop-Transcript