 
# Note Call AibEntDesktop to Build Desktop
#Then Cycle through all builds
#be sure all .parameters files have [IMAGEID] to support the script function

.\aibEntDesktop.ps1
$ImageResourceGroup = "AzureImageBuilder-DEV"
$sharedimagegallery = "WVD_DEV"
$sharedimagegalleryRSG = "Nerdio-Dev"
$location = "eastus"
$parentversionid = (Get-AzGalleryImageVersion -ResourceGroupName $sharedimagegalleryRSG -GalleryName $sharedimagegallery -GalleryImageDefinitionName "AibEntDesktop").Id | Sort-Object -Descending | select-object -First 1
$hash = @{ imageVersionID = $parentversionid }


foreach ($aibtemplate in Get-ChildItem -Recurse -Filter '*.json' -File -Exclude 'aibentdesktop*', 'Readme.md', 'scripts', '*parameters*', '*.ps1', 'aibRoleDefinition.json') {
    $imageTemplateName = $aibtemplate.Name -replace ".json", ""
    $imageTemplateFileName = $imageTemplateName + ".json"
    $imageTemplateFileNameParameters = $imageTemplateName + ".parameters" + ".json" 
    #be sure to modify parameters file to include [IMAGEID] under image for source location. this script rewrites the file.
(Get-Content $imageTemplateFileNameParameters).replace('[IMAGEID]', $parentversionid) | Set-Content $imageTemplateFileNameParameters

    Write-Output $aibtemplate
    Write-Output $Aibtemplate.length
    Write-Output $Aibtemplate.lastaccesstime

    try {
        WRITe-OUTPUT "Create ImageDefinition $imageTemplateName in $sharedimagegallery in the $location location"
        New-AzGalleryImageDefinition -GalleryName $sharedimagegallery -ResourceGroupName $sharedimagegalleryRSG -Location $location -Name $ImageTemplateName -OsState generalized -OsType Windows -Publisher 'Comcast' -Offer 'Windows' -Sku $ImageTemplateName -WhatIf

    }
    catch {
        $ErrorMessage = $_.Exception.Message
        Write-OUtput "Exception: $ErrorMessage"
    }

    try {
        WRITE-OUTPUT "Removing existing AIB Template $imageTemplateName"
        Remove-AzImageBuilderTemplate -ResourceGroupName $imageResourceGroup -Name $imageTemplateName -WhatIf

    }
    catch {
        $ErrorMessage = $_.Exception.Message
        Write-OUtput "Exception: $ErrorMessage" 
    }
    WRITE-OUTPUT "Creating New AzureImageBuilder Template Image Deployment for $imagetemplatefilename"
    New-AzResourceGroupDeployment -ResourceGroupName $imageResourceGroup -TemplateFile $imagetemplateFileName -TemplateParameterFile $imageTemplateFileNameParameters -Mode Incremental -WhatIf
    WRITE-OUTPUT "Starting Azure ImageBuilder Build for $imageTemplateName"
    Start-AzImageBuilderTemplate -ResourceGroupName $imageResourceGroup -Name $imageTemplateName -NoWait -WhatIf

}

