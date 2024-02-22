Start-Transcript  -PATH "C:\Comcast\Install-OracleClient-v19.3.txt"

#UnZip archive, no MSI installer
Expand-Archive -Path "C:\Comcast\Install-OracleClient-v19.3.zip" -DestinationPath "C:\comcast\Install-OracleClient-v19.3" -Force
Expand-Archive -Path "C:\Comcast\Install-OracleClient-v19.3\v19.3-Client\Files\Oracle19c_64.zip" -DestinationPath "C:\comcast\Oracle19c" -Force

Start-Process -FilePath "C:\Comcast\Oracle19c\Oracle19c_64\client\Setup.exe" -ArgumentList "-silent -nowait -ignoreSysPrereqs -ignorePrereqFailure -waitForCompletion -force -responseFile C:\Comcast\Oracle19c\Oracle19c_64\client\response\client_install.rsp" -Wait -Passthru
#this worked--possible Defender issue on file below
#C:\users\localadmin\appdata\local\temp\orainstall2024-02-22_03-48-25pm\jdk\jre\bin\java.exe

Copy-Item -Path "C:\Comcast\Install-OracleClient-v19.3\v19.3-Client\Files\OraFile\tnsnames.ora" -Destination "\app\client\product\19.0.0\client_64\network\admin"
cacls "C:\app" /T /E /C /P users:C
Start-Sleep -Seconds 120

Remove-Item "C:\Comcast\Install-OracleClient-v19.3.zip" -Force
Remove-Item "C:\comcast\Oracle19c" -Recurse -Force
Remove-Item "C:\comcast\Install-OracleClient-v19.3" -Recurse -Force

Stop-Transcript