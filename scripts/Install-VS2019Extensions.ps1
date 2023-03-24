Start-Transcript  -PATH "C:\Comcast\Install-VS2019Extensions.txt"
cls

#Start-Process -FilePath "C:\Comcast\SAPGUI\SAP-GUI-RDS-UNIFIED_20210810_1950.exe" -ArgumentList " /silent"

Start-Process -FilePath "C:\Comcast\VS2019Extensions\Microsoft.DataTools.IntegrationServices.exe" -ArgumentList " /quiet /norestart"
Start-Sleep 180
Start-Process -FilePath "C:\Program Files (x86)\Microsoft Visual Studio\2019\Professional\Common7\IDE\VSIXInstaller.exe" -ArgumentList " /quiet C:\Comcast\VS2019Extensions\Microsoft.DataTools.ReportingServices.vsix"
Start-Sleep 180
Start-Process -FilePath C:\Windows\System32\msiexec.exe -ArgumentList " /i ""C:\Comcast\VS2019Extensions\MicrosoftSSISOracleConnector-SQL19-x64.msi"" /qn /norestart"
Start-Sleep 180
Start-Process -FilePath C:\Windows\System32\msiexec.exe -ArgumentList " /i ""C:\Comcast\VS2019Extensions\MicrosoftSSISOracleConnector-SQL19-x86.msi"" /qn /norestart"
Start-Sleep 240

#Remove-Item "C:\Comcast\Install-VS2019Extensions.zip" -Force
#Remove-Item "C:\Comcast\Install-VS2019Extensions\" -Recurse -Force

Stop-Transcript