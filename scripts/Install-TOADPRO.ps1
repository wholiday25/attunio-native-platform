Start-Transcript  -PATH "C:\Comcast\Install-TOADPRO.txt"

#UnZip archive, no MSI installer
Expand-Archive -Path "C:\Comcast\Install-TOADPRO.zip" -DestinationPath "C:\comcast\Install-TOADPRO" -Force

#possibly good, check
#No, path is wrong.  Hard to get with transforms
#Start-Process "C:\Windows\System32\msiexec.exe" -ArgumentList "/i ""C:\Comcast\Install-TOADPRO\Toad\v5.1.6.206\Pro\ToadDataPoint_pro_5.1.6.206.x64.msi"" /passive TRANSFORMS=""C:\Comcast\Install-TOADPRO\Toad\v5.1.6.206\Pro\ToadDataPoint_pro_5.1.6.206.x64.mst"" /l* ""%windir%\temp\toad516206Pro.log"

#The below works, with no Powershell
CD \Comcast\Install-TOADPRO\Toad\v5.1.6.206\Pro
msiexec.exe /i "ToadDataPoint_pro_5.1.6.206.x64.msi" /passive TRANSFORMS="ToadDataPoint_pro_5.1.6.206.x64.mst"

Start-Sleep  -Seconds 600

Remove-Item "C:\Comcast\Install-TOADPRO.zip" -Force
#process takes a long time, perhaps more than 600 seconds above
#Remove-Item "C:\Comcast\Install-TOADPRO" -Recurse -Force

Stop-Transcript