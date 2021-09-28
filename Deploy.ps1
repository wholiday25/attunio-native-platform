


$ImageResourceGroup = "AzureImageBuilder-DEV"
$ImageTemplateName = "justintest"
$imageTemplateFileName = $imageTemplateName + ".json"
$imageTemplateFileNameParameters = $imageTemplateName + ".parameters" + ".json"
$sharedimagegallery = "WVD_DEV"
$sharedimagegalleryRSG = "Nerdio-Dev"
$location = "eastus"

try {
    WRITe-OUTPUT "Create ImageDefinition $imageTemplateName in $sharedimagegallery in the $location location"
    New-AzGalleryImageDefinition -GalleryName $sharedimagegallery -ResourceGroupName $sharedimagegalleryRSG -Location $location -Name $ImageTemplateName -OsState generalized -OsType Windows -Publisher 'Comcast' -Offer 'Windows' -Sku $ImageTemplateName

}
catch {$ErrorMessage = $_.Exception.Message
    Write-OUtput "Exception: $ErrorMessage"}

try {
    WRITE-OUTPUT "Removing existing AIB Template $imageTemplateName"
    Remove-AzImageBuilderTemplate -ResourceGroupName $imageResourceGroup -Name $imageTemplateName 

}
catch {$ErrorMessage = $_.Exception.Message
    Write-OUtput "Exception: $ErrorMessage" }
    WRITE-OUTPUT "Creating NEw AzureImageBuilder Template Image Deployment for $imagetemplatefilename"
    New-AzResourceGroupDeployment -ResourceGroupName $imageResourceGroup -TemplateFile $imagetemplateFileName -TemplateParameterFile $imageTemplateFileNameParameters -Mode Incremental
    WRITE-OUTPUT "Starting Azure ImageBuilder Build for $imageTemplateName"
    Start-AzImageBuilderTemplate -ResourceGroupName $imageResourceGroup -Name $imageTemplateName -NoWait



