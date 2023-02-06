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

#Remember to edit for Dev and Prod, as per Parmateres at start of script

$ACTIVEUSERS= foreach ($directory in $directories) {
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
 Get-ADUser $username 
 }
   
   Catch 
   {
   #$username |Export-Csv  C:\Comcast\$($subscription)_NON-ActiveUsers-Report.CSV
   Write-Output $username | out-file  C:\Comcast\$($subscription)_NON-ActiveUsers-Report.csv -append

   }

   }

        }  
        
        
 #}



 $ACTIVEUSERS | Export-Csv C:\Comcast\$($subscription)_ActiveUsers_Report.CSV



 ForEach ($ACTIVEUSER in $ACTIVEUSERS) {
 Try  
 { 
 Get-ADUser $username 
 }
   
   Catch 
   {
   #$username |Export-Csv  C:\Comcast\$($subscription)_NON-ActiveUsers-Report.CSV
   Write-Output $username | out-file  C:\Comcast\$($subscription)_NON-ActiveUsers-Report.csv -append
   
   $files=Get-AZStorageFile -Context $context -ShareName $fileShareName -Path $directory.Name

   foreach ($file in $files) 
                {  
                    Write-Output "Deleting: " $files.Name
                    $Total += $files.Length
                    $files | Remove-AzStorageFile -PassThru -Verbose -WhatIf
                
                Write-Output "Deleting directory..."
                Remove-AzStorageDirectory -Context $context -ShareName $fileShareName -Path $directory.Name -PassThru -Verbose -WhatIf
                }
   }

   }


   $ToDeleteUserProfiles= Get-Content C:\Comcast\$($subscription)_NON-ActiveUsers-Report.csv 
   foreach ($ToDeleteUserProfile in $ToDeleteUserProfiles  {

    $files=Get-AZStorageFile -Context $context -ShareName $fileShareName -Path $directory.Name | Get-AZStorageFile
    

    foreach ($file in $files) 
                {  
                    Write-Output "Deleting: " $files.Name
                    $Total += $files.Length
                    $files | Remove-AzStorageFile -PassThru -Verbose -WhatIf
                }
                Write-Output "Deleting directory..."
                Remove-AzStorageDirectory -Context $context -ShareName $fileShareName -Path $directory.Name -PassThru -Verbose
            }
        }
    }
    Write-Output "Total Space Saved: $Total bytes"
}




 foreach ($checkprofile in $checkprofiles) 
 {
 Get-ADUser $checkprofile
 
 }


$Path = 'C:\Comcast\WVD-Dev_FINAL_NON-ActiveUsers-Report.csv'

$Content = [System.IO.File]::ReadAllLines($Path)

foreach ($string in (Get-Content c:\strings.txt))
{
$Content = $Content -replace $string,''
}
$Content | Set-Content -Path $Path