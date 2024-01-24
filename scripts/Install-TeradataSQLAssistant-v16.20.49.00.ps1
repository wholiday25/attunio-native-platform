# Install Teradata SQL Assistant
#Version 16.20.49.00

Start-Transcript  -PATH "C:\Comcast\Install-TeradataSQL Assistant-v16.20.49.00"
Expand-Archive -Path "C:\Comcast\Install-TeradataSQL Assistant-v16.20.49.00.zip" -DestinationPath "C:\Comcast\" -Force

# 10/25/2023  need single tick quote to encapsulate double quotes below
Start-Process -FilePath "C:\Comcast\TeradataSQL Assistant-v16.20.49.00\Files\silent_install.bat" -ArgumentList '"BTEQ,FastExport,SQLA"'
Start-Sleep  -s 330

Remove-Item "C:\Comcast\TeradataSQL Assistant-v16.20.49.00" -Force -Recurse
Remove-Item "C:\Comcast\Install-TeradataSQL Assistant-v16.20.49.00.zip" -Force -Recurse

Stop-Transcript


