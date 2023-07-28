<#
***NOTE: 7/18/2023  
Per Chocolatey site, link in package is worong as of about MAy 2023
correct link is 
https://dev.mysql.com/get/Downloads/MySQLGUITools/mysql-workbench-community-8.0.33-winx64.msi
Will use this in script below to install, bypassing Chocolatey
Version is 8.0.31


This script installs My SQl Workbench via Chocolatey
#>

# Install Chocolatey if it isn't already installed
#Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

# Install My SQl Workbench
#choco install mysql.workbench -y --no-progress

Start-Transcript  -PATH "C:\Comcast\Install-MySQLWorkbenchv8.0.33.txt"
Expand-Archive -Path "C:\Comcast\Install-MySQLWorkbenchv8.0.33.zip" -DestinationPath "C:\Comcast\" -Force

Start-Process -FilePath C:\Windows\System32\msiexec.exe -ArgumentList " /i ""C:\Comcast\mysql-workbench-community-8.0.33-winx64.msi"" /qn /norestart"
Start-Sleep  -s 120 


