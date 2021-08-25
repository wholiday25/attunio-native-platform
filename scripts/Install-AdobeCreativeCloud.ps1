Start-Transcript  -PATH "C:\Comcast\Install-AdobeCreativeCloud.txt"

Expand-Archive -Path "C:\Comcast\Install-AdobeCreativeCloud.zip" -DestinationPath "C:\Comcast\AdobeCreativeCloud"-Force

# Declare settings for install switches

#Install Adobe Creative Cloud 

Start-Process -Filepath "C:\Comcast\AdobeCreativeCloud\Adobe Creative Cloud All Apps\Build\setup.exe" -ArgumentList " --silent" -Wait
#"C:\Comcast\AdobeCreativeCloud\Adobe Creative Cloud All Apps\Build\setup.exe --silent"

Remove-Item "C:\Comcast\Install-AdobeCreativeCloud.zip" -Force

Remove-Item "C:\Comcast\AdobeCreativeCloud\" -Recurse -Force

Stop-Transcript