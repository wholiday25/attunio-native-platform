Start-Transcript  -PATH "C:\Comcast\Install-VS2019Extensions.txt"
cls
Expand-Archive -Path "C:\Comcast\Install-VS2019Extensions.zip" -DestinationPath "C:\Comcast\VS2019Extensions" -Force

Start-Process -FilePath "C:\Comcast\VS2019Extensions\Microsoft.DataTools.IntegrationServices.exe" -ArgumentList " /quiet /norestart"
#Visual Studio >>About >> SQL Server Integration Services - 15.0.2000.180
Start-Sleep 240

Start-Process -FilePath "C:\Program Files (x86)\Microsoft Visual Studio\2019\Professional\Common7\IDE\VSIXInstaller.exe" -ArgumentList " /quiet C:\Comcast\VS2019Extensions\Microsoft.DataTools.ReportingServices.vsix"
#Visual Studio >>About >> SQL Server Reporting  Services - 15.0.19528.0
Start-Sleep 240

Start-Process -FilePath C:\Windows\System32\msiexec.exe -ArgumentList " /i ""C:\Comcast\VS2019Extensions\MicrosoftSSISOracleConnector-SQL19-x64.msi"" /qn /norestart"
#Uninstall >> SQL Server Integration Serivces Oracle Connector version 15.0.2000.215 - Size = 51.6 MB
Start-Sleep 240

Start-Process -FilePath C:\Windows\System32\msiexec.exe -ArgumentList " /i ""C:\Comcast\VS2019Extensions\MicrosoftSSISOracleConnector-SQL19-x86.msi"" /qn /norestart"
#Uninstall >> SQL Server Integration Serivces Oracle Connector version 15.0.2000.215 - Size = 24.3 MB
Start-Sleep 240

#Remove-Item "C:\Comcast\Install-VS2019Extensions.zip" -Force
#Remove-Item "C:\Comcast\Install-VS2019Extensions\" -Recurse -Force

Stop-Transcript