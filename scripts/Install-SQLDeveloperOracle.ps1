Start-Transcript  -PATH "C:\Comcast\Install-SQLDeveloperOracle.txt"

#UnZip archive, no MSI installer
Expand-Archive -Path "C:\Comcast\Install-SQLDeveloperOracle.zip" -DestinationPath "C:\comcast\Install-SQLDeveloperOracle" -Force

#Copy items and create Shortcut on Public Desktop

md "C:\Program Files\sqldeveloper"
xcopy /S /E /C /I /R /Y "C:\Comcast\Install-SQLDeveloperOracle\SQL Developer\v22.2.1.234.1810\sqldeveloper" "C:\Program Files\sqldeveloper"
xcopy /y "C:\Comcast\Install-SQLDeveloperOracle\SQL Developer\v22.2.1.234.1810\sqldeveloper.lnk" "C:\Users\Public\Desktop"

Remove-Item "C:\Comcast\Install-SQLDeveloperOracle.zip" -Force
Remove-Item "C:\comcast\Install-SQLDeveloperOracle" -Recurse -Force

Stop-Transcript