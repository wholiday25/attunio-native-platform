
#aibBulkDeploy publish
#copy developer image to public image
$region1 = @{Name = 'East US'; ReplicaCount = 1 }
$region2 = @{Name = 'West US 2'; ReplicaCount = 1 }
$resgroup1 = "NERDIO-DEV"
$resgroup2 = "WVD-PROD-IMAGES"
$targetRegions = @($region1, $region2)
foreach ($aibtemplate in Get-ChildItem -Recurse -Filter '*.json' -File -Exclude 'X_*', '*publish*', 'aibentdesktop*', 'Readme.md', 'scripts', '*parameters*', '*.ps1', 'aibRoleDefinition.json') {

    try {
    
        Set-AzContext -Subscription "WVD-Dev"
        $imageTemplateName = $aibtemplate.Name -replace ".json", ""
        $imageDefinitionName = $imageTemplateName
        $sourcegallery = Get-AzGallery -Name "WVD_DEV" -ResourceGroupName $resgroup1
        $versions = Get-AzGalleryImageVersion -ResourceGroupName $sourcegallery.ResourceGroupName -GalleryName $sourcegallery.Name -GalleryImageDefinitionName $imageDefinitionName
        $newestVersion = $versions | Sort-Object -Property Name | Select-Object -First 1
        Set-AzContext -Subscription "WVD-Prod"
        $destinationgallery = Get-AzGallery -Name "WVD_PROD2" -ResourceGroupName $resgroup2
        New-AzGalleryImageVersion `
            -GalleryImageDefinitionName $imageDefinitionName`
        -GalleryImageVersionName $newestVersion.Name `
            -GalleryName $destinationgallery.Name `
            -ResourceGroupName $resgroup2 `
            -Location $destinationgallery.Location `
            -TargetRegion $targetRegions `
            -SourceImageId $newestVersion.Id -whatif
        Write-Host "$imageDefinitionName copyied from Source $sourcegallery Gallery with $Newestversion Version to Destination Gallery $destinationgallery"
    }

    catch {
        $ErrorMessage = $_.Exception.Message
        Write-Output "Exception: $ErrorMessage"
    }
}

