# Get the environment being checked

Param(
    [Parameter(Mandatory = $true)]
    [ValidateSet( 'Prod', 'Dev' )]
    [String]$Environment = 'Prod'
) # End Parameter Block...
Switch ($Environment) {
    'Prod' {
        $subscription = "WVD-Prod"
        $resourceGroupName = "AzureFiles"  
        $storageAccName = "ccwvdprod"  
        $fileShareName = "profile"
    }
    'Dev' {
        $subscription = "WVD-Dev"
        $resourceGroupName = "AzureFilesDev"  
        $storageAccName = "ccwvddev"  
        $fileShareName = "profile"  
    }
}

Connect-AzAccount 
Set-AzContext $subscription

Connect-AzureAD


 Write-Output "Getting Profile directories and files.."    
    ## Get the storage account context  
     $context = (Get-AzStorageAccount -ResourceGroupName $resourceGroupName -Name $storageAccName).Context  
    ## List directories  
    $share = Get-AzStorageShare -Context $context -Name $fileShareName
    $directories = Get-AZStorageFile -Context $context -ShareName $fileShareName  

#Parse directory listing and split out username

foreach ($directory in $directories) {
        if($directory.Name -like "adm_*") {
            $username = "adm_" + $directory.Name.Split("_")[1]
            $sid = $directory.Name.Split("_")[2]
            }
        else {        
            $username = $directory.Name.Split("_")[0]
            $sid = $directory.Name.Split("_")[1]
 
#We want to get ABSENCE of Azure AD User -- that will indicate no account, therfore safe to delete
       
          Try  
 { 

#$ProfileNotPresent =  Get-AzureADUser -SearchString $username |select DisplayName, UserPrincipalName 
$ProfileNotPresentCable =  Get-AzureADUser -Filter "userPrincipalName eq '$username@cable.comcast.com'" |select DisplayName, UserPrincipalName 
$ProfileNotPresentAPAC =  Get-AzureADUser -Filter "userPrincipalName eq '$username@APAC.comcast.com'" |select DisplayName, UserPrincipalName 
$ProfileNotPresentEMEA =  Get-AzureADUser -Filter "userPrincipalName eq '$username@EMEA.comcast.com'" |select DisplayName, UserPrincipalName 
$ProfileNotPresentCORPHQ =  Get-AzureADUser -Filter "userPrincipalName eq '$username@CORPHQ.comcast.com'" |select DisplayName, UserPrincipalName 

if ($ProfileNotPresentCable -eq $null -and $ProfileNotPresentAPAC -eq $null -and $ProfileNotPresentEMEA -eq $null -and $ProfileNotPresentCORPHQ -eq $null ) {
Write-Output $directory | Export-csv  C:\Comcast\$($subscription)_NonActiveUsers.csv -append
# NOTE use import-csv to get use this file not Get-Content  
    }

  }
   
   Catch 
   {
   #Nothing to catch, really

   }
   }
 } 