<#
This script installs NotePad++ via Chocolatey
#>

# Install Chocolatey if it isn't already installed
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

# Install Notepad++
choco install notepadplusplus -y --no-progress

#12/7/2022  Added BigFiles plugin for very larg (5.5 GB or more!) files, per CAS1008266
# see https://github.com/superolmo/BigFiles

Expand-Archive -Path "C:\Comcast\Install-NotepadPlusPlusBigFiles.zip" -DestinationPath "C:\Program Files\Notepad++\plugins\BigFiles" -Force