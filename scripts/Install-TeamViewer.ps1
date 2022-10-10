Start-Transcript  -PATH "C:\Comcast\Install-TeamViewer.txt"

# Start-Process -FilePath C:\Windows\System32\msiexec.exe -ArgumentList " /i ""C:\Comcast\AdobeCampaignClassic7\Adobe Campaign Classic v7  Client.msi"" /qn /norestart"
# msiexec /i "Adobe Campaign Classic v7  Client.msi" /qn /norestart

Start-Process -FilePath C:\Windows\System32\msiexec.exe -ArgumentList " /i  C:\Comcast\TeamViewer_Host.msi /qn CUSTOMCONFIGID=6uyc8x8 desktopshorcuts=0"
Start-Sleep 60

Start-Process -FilePath "C:\Program Files (x86)\TeamViewer\TeamViewer.exe" -ArgumentList "assign --api-token=11653668-7T023p11PJ5izTRdPA5I --grant-easy-access"
Start-Sleep 30 
Start-Process -FilePath "C:\Program Files (x86)\TeamViewer\TeamViewer.exe" -ArgumentList " assignment --id 0001CoABChCpfiKAArcR7a3ucgnVl7oxEigIACAAAgAJAEf8mns4SKPjImNnRSBKiOihrI_GgpNPNJIuD7-RwB7KGkAQHYaRIK9xBxTFMSy6rsqXwmy2PX2JF7lDN5em5CBCD-VUkkw11LxjJ2TS6hunaxxP-mFjlivwxsGG3YqnyqO4IAEQk-2v_QY="
Start-Sleep 30 

# Remove-Item "C:\Users\Public\Desktop\TeamViewer.lnk" -Force




#start /wait msiexec.exe /i "%~dp0\TeamViewer_Host.msi" /qn CUSTOMCONFIGID=6uyc8x8 desktopshorcuts=0

#PING -n 31 127.0.0.1>nul

#"C:\Program Files (x86)\TeamViewer\TeamViewer.exe" assign --api-token=11653668-7T023p11PJ5izTRdPA5I --grant-easy-access

#PING -n 31 127.0.0.1>nul

#"C:\Program Files (x86)\TeamViewer\TeamViewer.exe" assignment --id 0001CoABChCpfiKAArcR7a3ucgnVl7oxEigIACAAAgAJAEf8mns4SKPjImNnRSBKiOihrI_GgpNPNJIuD7-RwB7KGkAQHYaRIK9xBxTFMSy6rsqXwmy2PX2JF7lDN5em5CBCD-VUkkw11LxjJ2TS6hunaxxP-mFjlivwxsGG3YqnyqO4IAEQk-2v_QY=

#del "%public%\desktop\TeamViewer.lnk" /F /Q
