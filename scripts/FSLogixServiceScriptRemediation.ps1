## Description: Fslogix Service Check Detection
## Author : William Holiday 
## Date : 02/16/2024

# Define the name of the FSLogix service
$serviceName = "frxsvc"

# Define the path for the log file
$logFilePath = "C:\Comcast\FSLogixServiceLog.txt"

# Create a timestamp for logging
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

# Check the status of the FSLogix service
$serviceStatus = Get-Service -Name $serviceName -ComputerName $env:COMPUTERNAME

# Open or create the log file
if (-not (Test-Path $logFilePath)) {
    New-Item -Path $logFilePath -ItemType File | Out-Null
}

# Output the status of the service and log it
if ($serviceStatus.Status -eq "Running") {
    $logMessage = "$timestamp - FSLogix service is running."
    Write-Output $logMessage
    Add-Content -Path $logFilePath -Value $logMessage
} elseif ($serviceStatus.Status -eq "Stopped") {
    $logMessage = "$timestamp - FSLogix service is stopped. Starting the service..."
    Write-Output $logMessage
    Add-Content -Path $logFilePath -Value $logMessage

    # Start the FSLogix service
    Start-Service -Name $serviceName

    # Log the result
    $logMessage = "$timestamp - FSLogix service started successfully."
    Write-Output $logMessage
    Add-Content -Path $logFilePath -Value $logMessage
} else {
    $logMessage = "$timestamp - FSLogix service status: $($serviceStatus.Status)"
    Write-Output $logMessage
    Add-Content -Path $logFilePath -Value $logMessage
}
