Start-Transcript  -PATH "C:\Comcast\Install-AdobeReportBuilderAddIn.txt"
Expand-Archive -Path "C:\Comcast\Install-AdobeReportBuilderAddIn.zip" -DestinationPath "C:\Comcast\Install-AdobeReportBuilderAddIn" -Force

Start-Process -FilePath C:\Comcast\Install-AdobeReportBuilderAddIn\AdobeReportBuilderSetupx64_SC15.exe -ArgumentList " /AllUsers /S"

Start-Sleep 120 

#Remove-Item "C:\Comcast\Install-AdobeCampaignClassic7.zip" -Force
#Remove-Item "C:\Comcast\Install-AdobeCampaignClassic7\" -Recurse -Force

Stop-Transcript