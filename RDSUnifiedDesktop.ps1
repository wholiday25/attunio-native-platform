$ImageResourceGroup = "AzureImageBuilder-DEV"
$ImageTemplateName = "RDSUnifiedDesktop"
$imageTemplateFileName = $imageTemplateName + ".json"
$imageTemplateFileNameParameters = $imageTemplateName + ".parameters" + ".json"
$sharedimagegallery = "WVD_DEV"
$sharedimagegalleryRSG = "Nerdio-Dev"
$location = "eastus"
$parentversionid = (Get-AzGalleryImageVersion -ResourceGroupName $sharedimagegalleryRSG -GalleryName $sharedimagegallery -GalleryImageDefinitionName "EntDesktop").Id | Sort-Object -Property {$_.PublishingProfile.PublishedDate}  -Descending | Select-Object -First 1


#be sure to modify parameters file to include [IMAGEID] under image for source location. this script rewrites the file.
(Get-Content $imageTemplateFileNameParameters).replace('[IMAGEID]', $parentversionid) | Set-Content $imageTemplateFileNameParameters

try {
    Write-Output "Create ImageDefinition $imageTemplateName in $sharedimagegallery in the $location location"
    $acquiresku = (Get-AzGalleryImageDefinition -ResourceGroupName $sharedimagegalleryRSG -GalleryName $sharedimagegallery -GalleryImageDefinitionName $imageTemplateName)
    $acquiresku2 = ($acquiresku | Select-Object -ExpandProperty Identifier).sku
    if ($acquiresku2 -eq "") {
        $acquiresku2 = "10windows" + $ImageTemplateName
    }
    New-AzGalleryImageDefinition -GalleryName $sharedimagegallery -ResourceGroupName $sharedimagegalleryRSG -Location $location -Name $ImageTemplateName -OsState generalized -OsType Windows -Publisher 'Comcast' -Offer 'Windows' -Sku $acquiresku2 -HyperVGeneration "V2"

}
catch {
    $ErrorMessage = $_.Exception.Message
    Write-Output "Exception: $ErrorMessage"
}

try{
     Write-Output "Removing existing AIB Template $imageTemplateName"
    Remove-AzImageBuilderTemplate -ResourceGroupName $imageResourceGroup -Name $imageTemplateName 
    Start-Sleep -Seconds 180
    }
catch {
    $ErrorMessage = $_.Exception.Message
    Write-Output "Exception: $ErrorMessage" 
}

try {
    Write-Output "Clean up Previous Image Builders Image Creation Process"

    $azurergremove = get-azresourcegroup $searchstr        
    Write-Output "Removing Image Resource Group $($azurergremove.ResourceId)"
    remove-azresourcegroup $azurergremove -Force
    Start-Sleep -Seconds 180
   }
catch {
    $ErrorMessage = $_.Exception.Message
    Write-Output "Exception: $ErrorMessage" 
}
Write-Output "Creating New AzureImageBuilder Template Image Deployment for $imagetemplatefilename"
New-AzResourceGroupDeployment -ResourceGroupName $imageResourceGroup -TemplateFile $imagetemplateFileName -TemplateParameterFile $imageTemplateFileNameParameters -Mode Incremental
Write-Output "Starting Azure ImageBuilder Build for $imageTemplateName"
Start-AzImageBuilderTemplate -ResourceGroupName $imageResourceGroup -Name $imageTemplateName
(Get-Content $imageTemplateFileNameParameters).replace($parentversionid, '[IMAGEID]') | Set-Content $imageTemplateFileNameParameters


$gallery = Get-AzGallery -Name $galleryName
$versions = Get-AzGalleryImageVersion -ResourceGroupName $gallery.ResourceGroupName -GalleryName $gallery.Name -GalleryImageDefinitionName $imageTemplateName
$oldestVersion = $versions | Sort-Object -Property {$_.PublishingProfile.PublishedDate} | Select-Object -First 1
if ($versions.count -gt 3) {
    "Found oldest version $($oldestVersion.Name)...Deleting..."
    $oldestVersion | Remove-AzGalleryImageVersion -Force

}
