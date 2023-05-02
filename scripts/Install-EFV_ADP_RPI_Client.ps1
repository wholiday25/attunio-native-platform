#--this installs EFV_ADP_RPI_Client

Start-Transcript  -PATH "C:\Comcast\Install-EFV_ADP_RPI_Client.txt"
Expand-Archive -Path "C:\Comcast\Install-EFV_ADP_RPI_Client.zip" -DestinationPath "C:\Program Files\RedPointInteraction" -Force

md "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\RedPoint Interaction"
copy "C:\Program Files\RedPointInteraction\RedPoint Interaction.lnk" "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\RedPoint Interaction\"


Stop-Transcript