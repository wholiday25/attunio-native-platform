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

#Remember to edit for Dev and Prod, as per Parameters at start of script

#$ACTIVEUSERS= 

foreach ($directory in $directories) {
        if($directory.Name -like "adm_*") {
            $username = "adm_" + $directory.Name.Split("_")[1]
            $sid = $directory.Name.Split("_")[2]
            }
        else {        
            $username = $directory.Name.Split("_")[0]
            $sid = $directory.Name.Split("_")[1]
          # GET-ADUSER $USERNAME | select Name

          Try  
 { 
 #this is only cable.comcast.com, and does not account for apac.comcast.com.  That's mainly used by RDS for CCP, but still
 #Get-ADUser $username 

#$DomainController = (Get-ADDomainController -Discover).hostname
#$GCDomainController = "$($DomainController):3268"
#Get-ADUser -LDAPFilter $username -Server $GCDomainController

#Get-AzureADUser -SearchString $username |select DisplayName, UserPrincipalName | Export-csv c:\comcast\$($subscription)_Active.csv -Append
 #Write-Output $username | out-file  C:\Comcast\$($subscription)_NON-ActiveUsers-Report.csv -append

 $ProfileNotPresent =  Get-AzureADUser -SearchString $username |select DisplayName, UserPrincipalName 

if ($ProfileNotPresent -eq $null) {
Write-Output $directory | Export-csv  C:\Comcast\$($subscription)_FINDONLY_DIRECTORY_NON-ActiveUsers-Report.csv -append
#USE imporat-csv TO GET THIS INFO
    }

  }
   
   Catch 
   {
   #$username |Export-Csv  C:\Comcast\$($subscription)_NON-ActiveUsers-Report.CSV
    #Write-Output $username | out-file  C:\Comcast\$($subscription)_NON-ActiveUsers-Report.csv -append
  

   }

   }

 } 



 foreach ($directory in $directories) 
 {




 $compareActive =@{
 referenceObject =$directories.name
 DifferenceObject = $nonactive
 }

 Compare-Object @compareActive -ExcludeDifferent
 
 
 #| Where-Object -Property Name -Contains $nonactive


 $array |ForEach-Object {
 if ($array2 -contains $_) 
 {Write-Host "`$array2 contains the `$array string [$_]"

 }
 }




 $directories | select name | export-csv C:\Comcast\AllProfiles-Dev.csv



 I ended up using this script from another forum. Thanks.

$Path = 'C:\Comcast\AllProfiles-Dev.csv’

$Content = [System.IO.File]::ReadAllLines($Path)

foreach ($string in (Get-Content C:\Comcast\WVD-Dev_NON-ActiveUsers-Report.csv))
{
$Content = $Content -replace $string,''
}
$Content | Set-Content -Path $Path






foreach ($directory in $directories)
{
$user = Get-AzureADUser -SearchString $username |select DisplayName, UserPrincipalName 
If ($user -eq $null)

