 
# Note Call EntDesktop to Build Desktop
#Then Cycle through all builds
#be sure all .parameters files have [IMAGEID] to support the script function

.\EntDesktop.ps1
$ImageResourceGroup = "AzureImageBuilder-DEV"
$galleryName = "WVD_DEV"
$sharedimagegallery = "WVD_DEV"
$sharedimagegalleryRSG = "Nerdio-Dev"
$location = "eastus"
#Date sorts on $_.PublishingProfile.PublishedDate are usualy bad.  Trying simple sort on ID 
#$parentversionid = (Get-AzGalleryImageVersion -ResourceGroupName $sharedimagegalleryRSG -GalleryName $sharedimagegallery -GalleryImageDefinitionName "EntDesktop").Id | Sort-Object -Property {$_.PublishingProfile.PublishedDate}  -Descending | Select-Object -First 1
$parentversionid = (Get-AzGalleryImageVersion -ResourceGroupName $sharedimagegalleryRSG -GalleryName $sharedimagegallery -GalleryImageDefinitionName "EntDesktop").Id |  Select-Object -Last 1




foreach ($aibtemplate in Get-ChildItem -Recurse -Filter '*.json' -File -Exclude 'Win11*', 'X_*', 'aib*', 'SingleApp*','EntDesktop*','*publish*', 'entdesktop*', 'Readme.md', 'scripts', '*parameters*', '*.ps1', 'aibRoleDefinition.json') {
    $imageTemplateName = $aibtemplate.Name -replace ".json", ""
    $imageTemplateFileName = $imageTemplateName + ".json"
    $imageTemplateFileNameParameters = $imageTemplateName + ".parameters" + ".json"
    $searchstr = "IT_AzureImageBuilder-DEV_"+$imagetemplateName+"_*" 
    #be sure to modify parameters file to include [IMAGEID] under image for source location. this script rewrites the file.
(Get-Content $imageTemplateFileNameParameters).replace('[IMAGEID]', $parentversionid) | Set-Content $imageTemplateFileNameParameters

    Write-Output $aibtemplate
    Write-Output $Aibtemplate.length
    Write-Output $Aibtemplate.lastaccesstime

    try {
        Write-Output "Clean up Previous Image Builders Image Creation Process"

        $azurergremove = get-azresourcegroup $searchstr        
        Write-Output "Removing Image Resource Group $($azurergremove.ResourceId)"
        remove-azresourcegroup $azurergremove -Force
        Start-Sleep -Seconds 180
        Write-Output "Create ImageDefinition $imageTemplateName in $sharedimagegallery in the $location location"
        $acquiresku = (Get-AzGalleryImageDefinition -ResourceGroupName $sharedimagegalleryRSG -GalleryName $sharedimagegallery -GalleryImageDefinitionName $imageTemplateName)
        $acquiresku2 = ($acquiresku | Select-Object -ExpandProperty Identifier).sku
        if ($acquiresku2 -eq "") {
            $acquiresku2 = "10windows" + $ImageTemplateName 
            Write-Output $acquiresku2
        }
        New-AzGalleryImageDefinition -GalleryName $sharedimagegallery -ResourceGroupName $sharedimagegalleryRSG -Location $location -Name $ImageTemplateName -OsState generalized -OsType Windows -Publisher 'Comcast' -Offer 'Windows' -Sku $acquiresku2 -HyperVGeneration "V2"
        Write-Output "Current AIB Template $aibtemplate"
        Write-Output "SharedImageGallery $sharedimagegallery"
        Write-Output "ResourceGroupName $sharedimagegalleryRSG"
        Write-Output "Location $location"
        Write-Output "ImageTemplateName $imageTemplateName"
        Write-Output "Sku $acquiresku2"

    }
    catch {
        $ErrorMessage = $_.Exception.Message
        Write-Output "Exception: $ErrorMessage"
    }

    try {
        Write-Output "Removing existing AIB Template $imageTemplateName"
        Remove-AzImageBuilderTemplate -ResourceGroupName $imageResourceGroup -Name $imageTemplateName
        Start-Sleep -Seconds 180

    }
    catch {
        $ErrorMessage = $_.Exception.Message
        Write-Output "Exception: $ErrorMessage" 
    }
    Write-Output "Creating New AzureImageBuilder Template Image Deployment for $imagetemplatefilename"
    New-AzResourceGroupDeployment -ResourceGroupName $imageResourceGroup -TemplateFile $imagetemplateFileName -TemplateParameterFile $imageTemplateFileNameParameters -Mode Incremental
    Write-Output "Starting Azure ImageBuilder Build for $imageTemplateName"
    Start-AzImageBuilderTemplate -ResourceGroupName $imageResourceGroup -Name $imageTemplateName -NoWait
    (Get-Content $imageTemplateFileNameParameters).replace($parentversionid, '[IMAGEID]') | Set-Content $imageTemplateFileNameParameters



    
    
}

foreach ($aibtemplate in Get-ChildItem -Recurse -Filter '*.json' -File -Exclude 'Win11*', 'X_*', 'aib*', 'EntDesktop*','SingleApp*','entdesktop*', 'Readme.md', 'scripts', '*parameters*', '*.ps1', 'aibRoleDefinition.json', '*.yaml') {
    $imageTemplateName = $aibtemplate.Name -replace ".json", ""
    $imageTemplateFileName = $imageTemplateName + ".json"
    $imageTemplateFileNameParameters = $imageTemplateName + ".parameters" + ".json" 
    $getStatus = $(Get-AzImageBuilderTemplate -ResourceGroupName $ImageResourceGroup -Name $imageTemplateName).LastRunStatusRunState
    Write-Output "AIB Template $aibtemplate"
    Write-Output "GetImageStatus $getStatus"
  
    while (($getStatus -ne "Failed") -and ($getstatus -ne "Succeeded")) {
        Start-Sleep -Seconds 30
        $getStatus = $(Get-AzImageBuilderTemplate -ResourceGroupName $ImageResourceGroup -Name $imageTemplateName).LastRunStatusRunState
    }
    #be sure to modify parameters file to include [IMAGEID] under image for source location. this script rewrites the file.

    $gallery = Get-AzGallery -Name $galleryName
    $versions = Get-AzGalleryImageVersion -ResourceGroupName $gallery.ResourceGroupName -GalleryName $gallery.Name -GalleryImageDefinitionName $imageTemplateName
    $oldestVersion = $versions | Sort-Object -Property {$_.PublishingProfile.PublishedDate} | Select-Object -First 1
    if ($versions.count -gt 8) {
        "Found oldest version $($oldestVersion.Name)...Deleting..."
        $oldestVersion | Remove-AzGalleryImageVersion -Force
    
    }
    
}
