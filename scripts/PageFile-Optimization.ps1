#PowerShell PageFile Optimization Script
#Should be run after Resize of a VM

#Get the installed RAM size
$physicalmem=get-wmiobject  Win32_ComputerSystem | % {$_.TotalPhysicalMemory}
#Get the RAM size in GB
$Physicalmem1=[math]::Round($physicalmem / 1048576)
#-EnableAllPrivileges Before the command makes the WMI call, enable all of the current user's privileges.
$computersys = Get-WmiObject Win32_ComputerSystem -EnableAllPrivileges;
#unchecks the Automatic maaged page file
$computersys.AutomaticManagedPagefile = $False;
$computersys.Put();
#querying the page file settings
$pagefile = Get-WmiObject -Query "Select * From Win32_PageFileSetting Where Name like '%pagefile.sys'";
#providing initial size
$pagefile.InitialSize = 4096;
#providing maximum size
$pagefile.MaximumSize = 8192;
#storing the values
$newpagefile=$pagefile.Put();
#$confirmation=Read-host "Do you want to Restart the server (Y/N)"
#if($confirmation -eq 'N'){

#Write-host "The system restart is skipped by the user" -BackgroundColor DarkRed

#}

#Else{

#Write-Host "The system will be restarting ...." -BackgroundColor DarkGreen

#Restart-Computer -Force
#}
