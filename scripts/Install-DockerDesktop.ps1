<#
This script installs Docker Desktop via Chocolatey
#>

# Install Chocolatey if it isn't already installed
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

# Install Docker Desktop
choco install docker-desktop -y
