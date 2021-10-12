$ImageResourceGroup = "AzureImageBuilder-DEV"
$ImageTemplateName = "aibDeveloperNSE"
$imageTemplateFileName = $imageTemplateName + ".json"
$imageTemplateFileNameParameters = $imageTemplateName + ".parameters" + ".json"
$sharedimagegallery = "WVD_DEV"
$sharedimagegalleryRSG = "Nerdio-Dev"
$location = "eastus"
$parentversionid = (Get-AzGalleryImageVersion -ResourceGroupName $sharedimagegalleryRSG -GalleryName $sharedimagegallery -GalleryImageDefinitionName "AibEntDesktop").Id | Sort-Object -Descending | select-object -First 1
$hash = @{ imageVersionID = $parentversionid }

#be sure to modify parameters file to include [IMAGEID] under image for source location. this script rewrites the file.
(Get-Content aibDeveloperNSE.parameters.json).replace('[IMAGEID]', $parentversionid) | Set-Content aibDeveloperNSE.parameters.json

try {
    Write-Output "Create ImageDefinition $imageTemplateName in $sharedimagegallery in the $location location"
    New-AzGalleryImageDefinition -GalleryName $sharedimagegallery -ResourceGroupName $sharedimagegalleryRSG -Location $location -Name $ImageTemplateName -OsState generalized -OsType Windows -Publisher 'Comcast' -Offer 'Windows' -Sku $ImageTemplateName

}
catch {
    $ErrorMessage = $_.Exception.Message
    Write-Output "Exception: $ErrorMessage"
}

try {
    Write-Output "Removing existing AIB Template $imageTemplateName"
    Remove-AzImageBuilderTemplate -ResourceGroupName $imageResourceGroup -Name $imageTemplateName 

}
catch {
    $ErrorMessage = $_.Exception.Message
    Write-Output "Exception: $ErrorMessage" 
}
Write-Output "Creating New AzureImageBuilder Template Image Deployment for $imagetemplatefilename"
New-AzResourceGroupDeployment -ResourceGroupName $imageResourceGroup -TemplateFile $imagetemplateFileName -TemplateParameterFile $imageTemplateFileNameParameters -Mode Incremental
Write-Output "Starting Azure ImageBuilder Build for $imageTemplateName"
Start-AzImageBuilderTemplate -ResourceGroupName $imageResourceGroup -Name $imageTemplateName



$gallery = Get-AzGallery -Name $galleryName
$versions = Get-AzGalleryImageVersion -ResourceGroupName $gallery.ResourceGroupName -GalleryName $gallery.Name -GalleryImageDefinitionName $imageTemplateName
$oldestVersion = $versions | Sort-Object -Property Name | Select-Object -First 1
"Found oldest version $($oldestVersion.Name)...Deleting..."
$oldestVersion | Remove-AzGalleryImageVersion -Force
