


$ImageResourceGroup = "AzureImageBuilder-DEV"
$ImageTemplateName = "aibEntDesktop"
$imageTemplateFileName = $imageTemplateName + ".json"
$imageTemplateFileNameParameters = $imageTemplateName + ".parameters" + ".json"
$sharedimagegallery = "WVD_DEV"
$sharedimagegalleryRSG = "Nerdio-Dev"
$location = "eastus"

try {
    Write-Output "Create ImageDefinition $imageTemplateName in $sharedimagegallery in the $location location"
    $acquiresku = (Get-AzGalleryImageDefinition -ResourceGroupName $sharedimagegalleryRSG -GalleryName $sharedimagegallery -GalleryImageDefinitionName $imageTemplateName)
    $acquiresku2 = ($acquiresku | Select-Object -ExpandProperty Identifier).sku
    if ($acquiresku2 -eq "") {
        $acquiresku2 = "10windows" + $ImageTemplateName
    }
    New-AzGalleryImageDefinition -GalleryName $sharedimagegallery -ResourceGroupName $sharedimagegalleryRSG -Location $location -Name $ImageTemplateName -OsState generalized -OsType Windows -Publisher 'Comcast' -Offer 'Windows' -Sku $acquiresku2

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


