#10/30/2023
#This script installs EDP Station for the first time, using the provided downloaded area and BAT file
Start-Transcript  -PATH "C:\Comcast\Install-EDPStation.txt"
    
#Download Batch file for EDP Station
# this fails.  download will be done ion JSON

#$source = "http://10.168.72.113:7080/SelfServe/GetBatch.cgi?install"
#$destination = "C:\Comcast\Install.txt"
#$client = New-Object System.Net.WebClient
#$client.DownloadFile($source, $destination)
#Rename-Item -PATH "C:\Comcast\Install.txt" -NewName "C:\Comcast\Install.bat"

#install silently
start-process "cmd.exe" "/c  C:\comcast\install.bat"

# Wait 240 Seconds for the installation to finish
Start-Sleep -s 240

#Suppress Windows Firewall notifications - yes, will be deprecated at some point, but there doesn't seem to be the same commands in "netsh advfirewall"
netsh firewall set notifications mode = disable profile = all

Stop-Transcript 
