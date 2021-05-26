#Set-ExecutionPolicy Unrestricted

# Download and silently install Java Runtime Environment 64-bit

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
#Source for 64-bit can be found here -   https://java.com/en/download/win10.jsp -- and copying button link
$source = "https://javadl.oracle.com/webapps/download/AutoDL?BundleId=244584_d7fc238d0cbf4b0dac67be84580cfb4b"
$destination = "$workd\jreInstall64bit.exe"
$client = New-Object System.Net.WebClient
$client.DownloadFile($source, $destination)

#install silently
Start-Process -FilePath "$workd\jreInstall64bit.exe" -ArgumentList INSTALLCFG="$workd\JREconfig64bit.cfg"

# Wait 240 Seconds for the installation to finish
Start-Sleep -s 240

# Remove the installer
rm -Force $workd\jreInstall64bit.exe


#Set-ExecutionPolicy Restricted