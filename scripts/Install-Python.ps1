<#
This script installs Python 3.x via Chocolatey
#>

# Install Chocolatey if it isn't already installed
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

# Install Python

choco install python -y --no-progress

#set up pip for standard SSL sources. See option 3, https://www.py4u.net/discuss/10309
#adapted for all users by querying expected global  pip.ini via "pip config -v debug", then making it below

#directory path
$workd = "C:\ProgramData\pip"

# Check if work directory exists if not create it
If (!(Test-Path -Path $workd -PathType Container))
{ 
New-Item -Path $workd  -ItemType directory 
}

#create the config file for pip SSL - see https://www.py4u.net/discuss/10309 , answer #3.  Also try pip config -v debug to see what, if any, pip 'expects' to find
$text = '
[global] 
trusted-host = pypi.python.org pypi.org files.pythonhosted.org
'
$text | Set-Content "$workd\pip.ini"
