Start-Transcript  -PATH "C:\Comcast\Install-RSASecurIDToken.txt"

Expand-Archive -Path "C:\Comcast\Install-RSASecurIDToken.zip" -DestinationPath "C:\Comcast\RSASecurIDToken" -Force

Start-Process -FilePath "C:\Windows\System32\msiexec.exe" -ArgumentList " /i C:\Comcast\RSASecurIDToken\RSASecurIDToken503x64.msi SETROAMING=TRUE SETCOPYPROTECTION=FALSE SETDATABASEDIR=~\AppData\Roaming\RSA /qn"
Start-Sleep -s 120
Set-Itemproperty -path "HKLM:\SOFTWARE\RSA\Software Token\Library" -Name 'DatabasePath' -value "~\AppData\Roaming\RSA"

Remove-Item "C:\Comcast\Install-RSASecurIDToken.zip" -Force
Remove-Item "C:\Comcast\RSASecurIDToken\" -Recurse -Force

Stop-Transcript