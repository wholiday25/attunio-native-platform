#aibSupportNowDesktop publish
#copy developer image to public image


$region1 = @{Name = 'East US'; ReplicaCount = 1 }
$region2 = @{Name = 'West US 2'; ReplicaCount = 1 }
$targetRegions = @($region1, $region2)
$resgroupsource = "NERDIO-DEV"
$resgrouptarget = "WVD-PROD-IMAGES"
Set-AzContext -Subscription "WVD-Dev"
foreach ($aibtemplate in Get-ChildItem -Recurse -Filter '*.json' -File '.\aibSupportNowDesktop.json') {
    $imageTemplateName = $aibtemplate.Name -replace ".json", ""
    $imageDefinitionName = $imageTemplateName
    Set-AzContext -Subscription "WVD-Dev"
    $sourcegallery = Get-AzGallery -Name "WVD_DEV" -ResourceGroupName $resgroupsource
    $versions = Get-AzGalleryImageVersion -ResourceGroupName $resgroupsource -GalleryName $sourcegallery.Name -GalleryImageDefinitionName $imageDefinitionName
    $newestVersion = $versions | Sort-Object -Property {$_.PublishingProfile.PublishedDate} | Select-Object -First 1
    Set-AzContext -Subscription "WVD-Prod"
    $destinationgallery = Get-AzGallery -Name "WVD_PROD2"
    Write-Output "$imagedefinitionName $NewestVersion.Name $destinationgallery.Name $resgrouptarget $destinationgallery.location $targetRegions $newestVersion.Id"

    New-AzGalleryImageVersion `
        -GalleryImageDefinitionName $imageDefinitionName `
    -GalleryImageVersionName $newestVersion.Name `
        -GalleryName $destinationgallery.Name `
        -ResourceGroupName $resgrouptarget `
        -Location $destinationgallery.Location `
        -TargetRegion $targetRegions `
        -SourceImageId $newestVersion.Id
    Write-Output "$imageDefinitionName copyied from Source $sourcegallery Gallery with $Newestversion Version to Destination Gallery $destinationgallery"

}