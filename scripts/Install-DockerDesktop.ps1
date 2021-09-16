<#
This script installs Docker Desktop via Chocolatey
#>

# Install Chocolatey if it isn't already installed
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

# Install Docker Desktop
choco install docker-desktop -y --no-progress

#Now install WSL - Windows Subsystem for Linux
choco install wsl -y 

#Add Authenticated Users to new Docker local group
Add-LocalGroupMember -Group "docker-users" -Member 'S-1-5-11'

#Download latest update to  WSL
mkdir C:\Comcast\WSL
Invoke-WebRequest -Uri "https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi" -OutFile "C:\Comcast\WSL\WSLUpdate.msi" -UseBasicParsing

# Install WSL Update
Write-Host "INFO: Installing WSL Kernel Update. . ."
Start-Process C:\Windows\System32\msiexec.exe `
-ArgumentList "/i C:\Comcast\WSL\WSLUpdate.msi /l*v C:\Comcast\WSL\WSLUpdate_install_log.txt /qn /norestart" -Wait
