#Set-ExecutionPolicy Unrestricted

# Download and silent install Java Runtime Environment 32-bit

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
INSTALLDIR=C:\Program Files (x86)\Java
NOSTARTMENU=Enable
'
$text | Set-Content "$workd\JREconfig32bit.cfg"
    
#download executable, this is the small online installer
#Source for 32-bit can be found here -   https://java.com/en/download/win10.jsp -- and copying button link. It should be about 2 MB.
$source = "https://javadl.oracle.com/webapps/download/AutoDL?BundleId=245029_d3c52aa6bfa54d3ca74e617f18309292"
$destination = "$workd\jreInstall32bit.exe"
$client = New-Object System.Net.WebClient
$client.DownloadFile($source, $destination)

#install silently
Start-Process -FilePath "$workd\jreInstall32bit.exe" -ArgumentList INSTALLCFG="$workd\JREconfig32bit.cfg"

# Wait 240 Seconds for the installation to finish
Start-Sleep -s 240

# Remove the installer
Remove-Item -Force $workd\jreInstall32bit.exe

#Set-ExecutionPolicy Restricted
