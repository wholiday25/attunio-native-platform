#10/30/2023
#This script installs EDP Station for the first time, using the provided downloaded area and BAT file

    
#download Batch file for EDP Station
$source = "http://10.168.72.113:7080/SelfServe/GetBatch.cgi?install"
$destination = "c:\Comcast\Install.bat"
$client = New-Object System.Net.WebClient
$client.DownloadFile($source, $destination)

#install silently
start-process "cmd.exe" "/c  C:\comcast\install.bat"

# Wait 240 Seconds for the installation to finish
Start-Sleep -s 240

#Suppress Windows Firewall notifications - yes, will be deprecated, but ther don't seem to be the same commcands in "netsh advfirewall"
netsh firewall set notifications mode = disable profile = all
