<#
This script installs Open JDK 11.0.13.8 via Chocolatey
11.0.14 is Latest End of Life see https://endoflife.date/java
#>

# Install Chocolatey if it isn't already installed
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

# Install JDK 8
choco install openjdk11 -y --no-progress

