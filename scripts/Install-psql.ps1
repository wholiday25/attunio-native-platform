<#
This script installs psql via Chocolatey
note that this is only the commandline tools install of POSTgresSQL, since we do not want the DB engine on AVD
#>

# Install Chocolatey if it isn't already installed
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

# Install psql
choco install postgresql14 -y --no-progress --ia '--disable-components server,stackbuilder'

