#--this installs EFV_ADP_RPI_Client

Start-Transcript  -PATH "C:\Comcast\Install-EFV_ADP_RPI_Client.txt"
Expand-Archive -Path "C:\Comcast\Install-EFV_ADP_RPI_Client.zip" -DestinationPath "C:\Comcast\" -Force

md "C:\Program Files\RedPointInteraction"
copy "C:\Comcast\RPIClient\*.*" "C:\Program Files\RedPointInteraction"

md "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\RedPoint Interaction"
mv "C:\Program Files\RedPointInteraction\RedPoint Interaction.lnk" "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\RedPoint Interaction\"


Stop-Transcript