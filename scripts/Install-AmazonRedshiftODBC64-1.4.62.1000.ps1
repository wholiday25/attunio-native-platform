Start-Transcript  -PATH "C:\Comcast\Install-AmazonRedshiftODBC64-1.4.62.1000.txt"

Expand-Archive -Path "C:\Comcast\Install-AmazonRedshiftODBC64-1.4.62.1000.zip" -DestinationPath "C:\Comcast\AmazonRedshiftODBC64-1.4.62.1000" -Force

Start-Process -FilePath C:\Windows\System32\msiexec.exe -ArgumentList " /i ""C:\Comcast\AmazonRedshiftODBC64-1.4.62.1000\AmazonRedshiftODBC64-1.4.62.1000.msi"" /qn /norestart"

Start-Sleep -s 60

Remove-Item "C:\Comcast\Install-AmazonRedshiftODBC64-1.4.62.1000.zip\" -Recurse -Force

Stop-Transcript
