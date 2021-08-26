#Install Active Directory DS LDS Tools
WRITE-OUTPUT "Installing RSAT Tools for Active Directory"
Add-WindowsCapability -online -Name "Rsat.ActiveDirectory.DS-LDS.Tools~~~~0.0.1.0"
