<#
This script installs RSAT tools needed by SupportNOw 
#>

Add-WindowsCapability -Name "Rsat.ActiveDirectory.DS-LDS.Tools~~~~0.0.1.0" -Online
Add-WindowsCapability -Name "Rsat.CertificateServices.Tools~~~~0.0.1.0" -Online
Add-WindowsCapability -Name "Rsat.GroupPolicy.Management.Tools~~~~0.0.1.0" -Online
Add-WindowsCapability -Name "Rsat.ServerManager.Tools~~~~0.0.1.0" -Online
Update-Help


