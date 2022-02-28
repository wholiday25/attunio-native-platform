<#
This script installs JDK SE 8.0.211 via Chocolatey
The Java Development Kit (JDK) version 8.0.211 
Note that 8.231 would be better -- See choco install openjdk8
#>

# Install Chocolatey if it isn't already installed
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

# Install JDK 8
choco install jdk8 -y --no-progress

