Start-Transcript  -PATH "C:\Comcast\RSASecurIDToken503x64.txt"

Expand-Archive -Path "C:\Comcast\RSASecurIDToken503x64.zip" -DestinationPath "C:\Comcast\" -Force

Start-Process -Filepath "C:\Windows\System32\msiexec.exe" -ArgumentList " /i C:\Comcast\RSASecurIDToken503x64.msi  /qn /l*v C:\Comcast\RSAinstall.log SETROAMING=TRUE SETCOPYPROTECTION=FALSE SETDATABASEDIR=~\AppData\Roaming\RSA"
Set-Itemproperty -path "HKLM:\SOFTWARE\RSA\Software Token\Library" -Name 'DatabasePath' -value "~\AppData\Roaming\RSA"

Start-Sleep -s 240

Stop-Transcript
