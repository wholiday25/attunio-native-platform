<#
This script installs Tableau Desktop via Chocolatey
#>

# Install Chocolatey if it isn't already installed
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

# Install Tableau Desktop

# 12/13/2022   Downgrading to v 2021.3.8, due to  incompatibilities with Comcast Server versions  See CAS0932092
# choco install tableau-desktop -y --no-progress

Expand-Archive -Path "C:\Comcast\Install-TableauDesktop64bit-2021-3-8.zip" -DestinationPath "C:\Comcast\Install-TableauDesktop64bit-2021-3-8" -Force
Start-Process -Filepath "C:\Comcast\Install-TableauDesktop64bit-2021-3-8\TableauDesktop-64bit-2021-3-8.exe" -ArgumentList "/quiet /norestart ACCEPTEULA=1"
Start-Sleep 240



