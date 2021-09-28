 

$ImageResourceGroup = "AzureImageBuilder-DEV"
$sharedimagegallery = "WVD_DEV"
$sharedimagegalleryRSG = "Nerdio-Dev"
$location = "eastus"

foreach ($aibtemplate in Get-ChildItem -Recurse -Filter '*.json' -File -Exclude '*parameters*','*.ps1','aibRoleDefinition.json') {
    $imageTemplateName = $aibtemplate
    $imageTemplateFileName = $imageTemplateName + ".json"
    $imageTemplateFileNameParameters = $imageTemplateName + ".parameters" + ".json"

    Write-Output $aibtemplate
    Write-Output $Aibtemplate.length
    Write-Output $Aibtemplate.lastaccesstime
   
    try {
        WRITe-OUTPUT "Create ImageDefinition $imageTemplateName in $sharedimagegallery in the $location location"
        New-AzGalleryImageDefinition -GalleryName $sharedimagegallery -ResourceGroupName $sharedimagegalleryRSG -Location $location -Name $ImageTemplateName -OsState generalized -OsType Windows -Publisher 'Comcast' -Offer 'Windows' -Sku $ImageTemplateName

    }
    catch {
        $ErrorMessage = $_.Exception.Message
        Write-OUtput "Exception: $ErrorMessage"
    }

    try {
        WRITE-OUTPUT "Removing existing AIB Template $imageTemplateName"
        Remove-AzImageBuilderTemplate -ResourceGroupName $imageResourceGroup -Name $imageTemplateName 

    }
    catch {
        $ErrorMessage = $_.Exception.Message
        Write-OUtput "Exception: $ErrorMessage" 
    }
    WRITE-OUTPUT "Creating New AzureImageBuilder Template Image Deployment for $imagetemplatefilename"
    New-AzResourceGroupDeployment -ResourceGroupName $imageResourceGroup -TemplateFile $imagetemplateFileName -TemplateParameterFile $imageTemplateFileNameParameters -Mode Incremental
    WRITE-OUTPUT "Starting Azure ImageBuilder Build for $imageTemplateName"
    Start-AzImageBuilderTemplate -ResourceGroupName $imageResourceGroup -Name $imageTemplateName -NoWait

}

