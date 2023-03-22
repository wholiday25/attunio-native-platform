Start-Transcript  -PATH "C:\Comcast\Install-SAP-HANA-ABAPDevelopmentToolKit.txt"

Expand-Archive -Path "C:\Comcast\Install-SAP-HANA-ABAPDevelopmentToolKit.zip" -DestinationPath "C:\Comcast\Install-SAP-HANA-ABAPDevelopmentToolKit" -Force

Start-Process -FilePath C:\Windows\System32\msiexec.exe -ArgumentList " /i ""C:\Comcast\Install-SAP-HANA-ABAPDevelopmentToolKit\ABAP Development ToolKit.msi"" /qn /norestart"
Start-Sleep -s 240

Remove-Item "C:\Comcast\Install-SAP-HANA-ABAPDevelopmentToolKit" -Force
Stop-Transcript