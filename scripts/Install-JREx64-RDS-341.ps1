#Set-ExecutionPolicy Unrestricted

# Download and silently install Java Runtime Environment 64-bit

#  NOTE - due to issues with RDS/ WIPRO/TCS users being unable to 
#  use CLIPS app https://inventory.cable.comcast.com:4001/  >> “SM Service Order Manager”   http://clipapp-ch2-a19s.sys.comcast.net:24100/AmdocsOSSsm/CRM/commons-logging.jar   
#  This script will uninstall Java x64 1.8.351 and install 1.8.341

#uninstall Java 1.8.351

wmic product where name='"Java 8 Update 351 (64-bit)"' call uninstall /nointeractive
Start-Sleep -s 120


# working directory path
$workd = "C:\Comcast\Apps\Java"

# Check if work directory exists if not create it
If (!(Test-Path -Path $workd -PathType Container))
{ 
New-Item -Path $workd  -ItemType directory 
}

#create the config file for silent install
$text = '
INSTALL_SILENT=Enable
AUTO_UPDATE=Disable
INSTALLDIR=C:\Program Files\Java
NOSTARTMENU=Enable
'
$text | Set-Content "$workd\JREconfig64bit.cfg"
    
#download executable, this is the small online installer
#Source for 64-bit can be found here on the "Manual" page - https://java.com/en/download/manual.jsp . Look for "Windows Offline (64-bit)". It is about 80 MB
# NOTE -- this download is for the 341 version.  See above. 
$source = "https://javadl.oracle.com/webapps/download/AutoDL?BundleId=246808_424b9da4b48848379167015dcc250d8d"
$destination = "$workd\jreInstall64bit.exe"
$client = New-Object System.Net.WebClient
$client.DownloadFile($source, $destination)

#install silently
Start-Process -FilePath "$workd\jreInstall64bit.exe" -ArgumentList INSTALLCFG="$workd\JREconfig64bit.cfg"

# Wait 240 Seconds for the installation to finish
Start-Sleep -s 240

# Remove the installer
Remove-Item -Force $workd\jreInstall64bit.exe


#Set-ExecutionPolicy Restricted