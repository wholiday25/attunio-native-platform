<#
This script installs Pycharm Community Edition via Chocolatey
#>

# Install Chocolatey if it isn't already installed
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

# Install Pycharm Community Edition
#3-13-2023  --ignore-checksums  addded, both community and Pro Pychamr curently failing.  No notice on Chocolatey.  not Win11 -related, fails on Win10 as well
choco install pycharm-community -y --no-progress --ignore-checksums
