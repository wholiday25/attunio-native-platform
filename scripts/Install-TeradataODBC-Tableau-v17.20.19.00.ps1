# Install Teradata drivers for Tableau 
#Version 17.20.19 

Start-Transcript  -PATH "C:\Comcast\Install-Tableau-TeradataODBC-v17.20.19.00.txt"
Expand-Archive -Path "C:\Comcast\Install-Tableau-TeradataODBC-v17.20.19.00.zip" -DestinationPath "C:\Comcast\Install-Tableau-TeradataODBC-v17.20.19.00" -Force

# 10/25/2023  need single tick quote to encapsulate double quotes below
Start-Process -FilePath "C:\Comcast\Install-Tableau-TeradataODBC-v17.20.19.00\TeradataODBC\silent_install.bat" -ArgumentList '"TDWALLET,ODBC"'
Start-Sleep  -s 120 


