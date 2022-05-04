<#
This script installs Gulp via Chocolatey
Node.JS is also installed
3/10/2022 :  Node.JS version changed from 17.6.0 (nearing End of Life )  to 16.14.0 (Long Term Support [LTS] ).  See https://endoflife.date/nodejs
#>

# Install Chocolatey if it isn't already installed
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

# Install Nodejs
choco install nodejs-lts -y --no-progress

# Install Gulp
choco install gulp-cli -y --no-progress

