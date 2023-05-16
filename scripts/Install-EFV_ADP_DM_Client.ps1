#--this installs RedPoint Data Management Client 9.4.5.2864 

Start-Transcript  -PATH "C:\Comcast\Install-EFV_ADP_DM_Client.txt"
Expand-Archive -Path "C:\Comcast\Install-EFV_ADP_DM_Client.zip" -DestinationPath "C:\Comcast\Install-EFV_ADP_DM_Client" -Force



Start-Process -FilePath C:\Windows\System32\msiexec.exe -ArgumentList " /i ""C:\Comcast\Install-EFV_ADP_DM_Client\RedPoint Data Management Client 9.4.5.2864.msi"" /qn /norestart"
Start-Sleep  120 

#Remove-Item "C:\Comcast\Install-AdobeCampaignClassic7.zip" -Force
#Remove-Item "C:\Comcast\Install-AdobeCampaignClassic7\" -Recurse -Force

Stop-Transcript