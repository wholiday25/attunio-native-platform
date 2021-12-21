Start-Transcript  -PATH "C:\Comcast\Install-UC4UserInterface.txt"

Expand-Archive -Path "C:\Comcast\Install-UC4UserInterface.zip" -DestinationPath "C:\Automic\UserInterface\bin" -Force

Move-Item -Path "C:\Automic\UserInterface\bin\Automic" -Destination "C:\ProgramData\Microsoft\Windows\Start Menu\Programs" -Force -ErrorAction SilentlyContinue

Remove-Item "C:\Comcast\Install-UC4UserInterface.zip" -Force

Stop-Transcript