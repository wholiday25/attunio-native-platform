Start-Transcript  -PATH "C:\Comcast\Install-AlteryxFusionPWC.txt"

Expand-Archive -Path "C:\Comcast\Install-AlteryxDesignerFusionPWC.zip" -DestinationPath "C:\Comcast\" -Force
Start-Process -FilePath "C:\Comcast\Alteryx Designer\Files\AlteryxNonAdminInstallx64_2021.3.6.01129.exe" -Argumentlist '/s /l=c:\comcast\Alteryxinstall2.log AllUSERS="TRUE" TARGETDIR="C:\Program Files\Alteryx"'
Start-Sleep 540

Start-Process -FilePath "C:\Comcast\Alteryx Designer\Files\zulu8.74.0.17-ca-jre8.0.392-win_x64.msi" -Argumentlist "/qn /norestart"
Start-Sleep 90

Expand-Archive -Path "C:\Comcast\Alteryx Designer\Files\SAAC_Automation_Tool_OpenJDK-V12.zip" -DestinationPath C:\
Start-Sleep 180
md "C:\SAAC Automation Tool 12"
mv "C:\SAAC_Automation_Tool_OpenJDK-V12\*" "C:\SAAC Automation Tool 12"
rd "C:\SAAC_Automation_Tool_OpenJDK-V12"

Start-Process -FilePath "C:\Comcast\Alteryx Designer\Files\adfdi-excel-addin-installer-all-users.msi" -Argumentlist "/qn /norestart"
Start-Sleep 60

Start-Process -FilePath "C:\Comcast\Alteryx Designer\Files\vbafe-installer-all-users.msi" -Argumentlist "/qn /norestart"
Start-Sleep 60

md "C:\Program Files\sqldeveloper"
mv "C:\Comcast\Alteryx Designer\Files\sqldeveloper\*" "C:\Program Files\sqldeveloper"
copy-item "C:\Comcast\Alteryx Designer\Files\sqldeveloper.lnk" "C:\Users\Public\Desktop"

Stop-Transcript
