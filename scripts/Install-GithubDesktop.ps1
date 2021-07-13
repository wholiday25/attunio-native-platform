<#
This script installs Github Desktop
#>

# Install Chocolatey if it isn't already installed
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

# Install git
choco install git -y

Invoke-WebRequest https://central.github.com/deployments/desktop/desktop/latest/win32?format=msi -OutFile C:\Comcast\GitHubDesktopSetup-x64.msi

msiexec /i C:\Comcast\GitHubDesktopSetup-x64.msi /qn ALLUSERS=1

& 'C:\Program Files (x86)\GitHub Desktop Deployment\GitHubDesktopDeploymentTool.exe'



