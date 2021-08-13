<#
This script installs openssl via Chocolatey
#>

# Install Chocolatey if it isn't already installed
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

# Install openssl x86
choco install openssl --x86 -y --no-progress

# Install openssl x64
choco install openssl -y --no-progress --sidebyside --force

