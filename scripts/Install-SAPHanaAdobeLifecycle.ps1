Start-Transcript  -PATH "C:\Comcast\Install-SAPHanaAdobeLifecycle.txt"
Expand-Archive -Path "C:\Comcast\Install-SAPHanaAdobeLifecycle.zip" -DestinationPath "C:\Comcast\SAPHanaAdobeLifecycle" -Force
$param= ' --path "C:\Program Files\SAP\Hbdstudio" --features=all --batch'

#Start-Process -FilePath "C:\Comcast\SAPGUI\SAP-GUI-RDS-UNIFIED_20210810_1950.exe" -ArgumentList " /silent"

Start-Process -FilePath "C:\Comcast\SAPHanaAdobeLifecycle\SAP\SAPGUI-Patch\7.7 Patch0\Setup\NwSapSetup.exe" -ArgumentList " /silent /Product=SAPGUI+SAPBI"
Start-Sleep -s 180

Start-Process -FilePath "C:\Comcast\SAPHanaAdobeLifecycle\SAP\SAPGUI-Patch\7.7 Patch0\ALD110P_21-80000927.EXE" -ArgumentList " /silent"
Start-Sleep -s 180

Start-Process -FilePath "C:\Comcast\SAPHanaAdobeLifecycle\SAP\SAPGUI-Patch\SAP_HANA_Studio\hdbinst.exe"  -ArgumentList $param
Start-Sleep -s 180

#Remove-Item "C:\Comcast\Install-SAPHanaAdobeLifecycle.zip" -Force
#Remove-Item "C:\Comcast\SAPHanaAdobeLifecycle\" -Recurse -Force

Stop-Transcript