<#
This script installs JDK 17.02,  via Chocolatey
Oracle JDK is a distribution of OpenJDK provided by Oracle
Latest End Of Life  see https://endoflife.date/java
#>

# Install Chocolatey if it isn't already installed
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

# Install JDK 8
choco install oracle17jdk -y --no-progress

