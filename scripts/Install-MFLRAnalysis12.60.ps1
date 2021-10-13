Start-Transcript  -PATH "C:\Comcast\Install-MFLRAnalysis12.60.txt"

Expand-Archive -Path "C:\Comcast\Install-MFLRAnalysis12.60.zip" -DestinationPath "C:\Comcast\Installers\" -Force

Start-Process -filepath "C:\Windows\System32\msiexec.exe" -Argumentlist "/i ""C:\Comcast\Installers\Micro Focus LoadRunner Analysis 12.60\Analysis_x64.msi"" /qn /l*v ""c:\comcast\LRAnalysisLog.txt"""

Remove-Item "C:\Comcast\Install-MFLRAnalysis12.60.zip" -Force

Remove-Item "C:\Comcast\Installers\Micro Focus LoadRunner Analysis 12.60\" -Recurse -Force

Stop-Transcript