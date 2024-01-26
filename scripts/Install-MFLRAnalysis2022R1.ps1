Start-Transcript  -PATH "C:\Comcast\Install-MFLRAnalysis12.60.txt"
Expand-Archive -Path "C:\Comcast\Install-MFLRAnalysis2022R1.zip" -DestinationPath "C:\Comcast\Installers\" -Force

Start-Process -filepath "C:\Windows\System32\msiexec.exe" -Argumentlist "/i ""C:\Comcast\Installers\Micro Focus LoadRunner Analysis 2022 R1\Analysis_x64.msi"" /qn"

Remove-Item "C:\Comcast\Install-MFLRAnalysis2022R1.zip" -Force

Stop-Transcript