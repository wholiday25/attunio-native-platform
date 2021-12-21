#Install Active Directory DS LDS Tools
Write-Output "Installing RSAT Tools for Active Directory"
Add-WindowsCapability -online -Name "Rsat.ActiveDirectory.DS-LDS.*"
