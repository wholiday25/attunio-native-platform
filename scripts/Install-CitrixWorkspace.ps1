#This script installs Citrix Workspace from   \\cable\sccm-dfs\EntMEMDFS\Source\Intune Applications\Citrix\v22.3.2000.2105\source\Files
#This is the most recent version in Company Portal: v22.3.2000.2105

Start-Transcript  -PATH "C:\Comcast\Install-CitrixWorkspace.txt"
Expand-Archive -Path "C:\Comcast\Install-CitrixWorkspace.zip" -DestinationPath "C:\Comcast\CitrixWorkspace" -Force

#Start-Process -FilePath "C:\Comcast\SAPGUI\SAP-GUI-RDS-UNIFIED_20210810_1950.exe" -ArgumentList " /silent"

Start-Process -FilePath C:\Comcast\CitrixWorkspace\CitrixWorkspaceApp.exe  -ArgumentList "/EnableCEIP=false /EnableTracing=false /noreboot /silent /rcu ENABLEPRELAUNCH=True /includeSSON /ENABLE_SSON=No /AutoUpdateCheck=disabled /ALLOWADDSTORE=S /ALLOWSAVEPWD=S ENABLE_DYNAMIC_CLIENT_NAME=yes DONOTSTARTCC=1 ADDLOCAL=ReceiverInside,ICA_Client,AM,SELFSERVICE,DesktopViewer,Flash,Vd3d,WebHelper,BrowserEngine,WorkspaceHub STORE0=OneSpotApps;https://onespotapps.comcast.com/Citrix/SpotApp/discovery;On;OneSpotApps"
Start-Sleep 120

$RegPath = "HKLM:\Software\wow6432node\Citrix\AuthManager"
$Name = "SavePasswordMode"
$Type = "String"
$RegValue = "Never"
if (Test-Path $RegPath){
            New-ItemProperty -Path $RegPath -Name $Name -Value $RegValue -PropertyType $Type -Force
        }
        Else {
                Write-Host "Path doesn't exist" 
}        

#Remove-Item "C:\Comcast\Install-AdobeCampaignClassic7.zip" -Force
#Remove-Item "C:\Comcast\Install-AdobeCampaignClassic7\" -Recurse -Force

Stop-Transcript
