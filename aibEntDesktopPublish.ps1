#aibEntDesktop publish
#copy developer image to public image


$region1 = @{Name='East US';ReplicaCount=1}
$region2 = @{Name='West US 2';ReplicaCount=1}
$targetRegions = @($region1,$region2)
$imageDefinitionName = "aibEntDesktop"
$sourcegallery = Get-AzGallery -Name "WVD_DEV"
$versions = Get-AzGalleryImageVersion -ResourceGroupName $sourcegallery.ResourceGroupName -GalleryName $sourcegallery.Name -GalleryImageDefinitionName $imageDefinitionName
$newestVersion = $versions | Sort-Object -Property Name | Select-Object -First 1
Set-AzContext -Subscription "WVD-Prod"
$destinationgallery = Get-AzGallery -Name "WVD_PROD2"
New-AzGalleryImageVersion `
-GalleryImageDefinitionName $imageDefinitionName`
-GalleryImageVersionName $newestVersion.Name `
-GalleryName $destinationgallery.Name `
-ResourceGroupName $destinationgallery.ResourceGroupName `
-Location $destinationgallery.Location `
-TargetRegion $targetRegions `
-SourceImageId $newestVersion.Id
