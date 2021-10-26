
# AzureImageBuilder

Azure Image Builder ARM Templates for image creation for WVD

  

## Inventory for Images:

  

### Name: aibEntDesktop
### Location:
Dev, Stage, Prod
### Applications:
-AutoHotKey 
- Notepad++
- Visual C++ Redistributable Runtime
- BGInfo
- VDI Optimization Script
- Crowdstrike
- Microsoft Visio
- Microsoft Project
- Microsoft Office
- Microsoft Teams
- 7Zip
- Tableau Desktop
- Google Chrome
- Adobe Acrobat Reader
- Microsoft Visual Studio Code
- Oracle Java JRE x86 and x64 (currently 1.8v301)

  

### Name:  aibDeveloper
### Location:
Dev, Stage, Prod
### Applications:
*All from aibEntDesktop AND*
- Notepad++
- Visual C++ Redistributable Runtime
- Active Directory RSAT Tools
- Python
- Github Desktop
- PyCharm
- Java Development Kit 17
 -Java Development Kit 1.8.211
- Maven
- Nuget
- Gulp
 -Node.JS - installed as part of Gulp
- Postman - available for user install. Creator has not provided system-wide installer yet, only user/personal
- PuTTY
- OpenSSL (x86 and x64)
- Visual Studio 2019 Build Tools (C++ Desktop workload)
- SOAP UI
- Microsoft SQL Server Management Studio
- MYSQL Workbench
- DBeaver Community Edition
- Azure Data Studio
- MongoDB Compass
- IntelliJ IDEA Community
- AWS CLI 2.0  (added 9/21/2021)
- Azure Powershell Module 
- Ginger 3.8.0 for AMDOCS 
- MS Access 2010 Database Engine 32 bit 


### Name:  aibDeveloperNSE
### Location:
Dev, Stage, Prod
### Applications:
*All from aibEntDesktop AND* aibDeveloper AND*
- R Project for Statistical Computing 4.1.1
- HeidiSQL 11.3
- WireShark


### Name: aibRDSUnifiedDesktop
### Location:
Dev, Stage, Prod
### Applications:
*All from aibEntDesktop AND*
- Notepad++
- Firefox
- Postman - available for user install. Creator has not provided system-wide installer yet, only user/personal
- PuTTY
- SOAP UI
- Microsoft SQL Server Management Studio
- UltraVNC Viewer
- WinSCP
- MetaSolv
- MetaSolv Dev
- RSA SecureID Softtoken
- SAPGUI
- LogMeIn 


### Name: aibIHAGoodkidDesktop

### Location:
Dev, Stage, Prod

### Applications:
*All from aibEntDesktop AND*
- Adobe Creative Cloud
- IBM Aspera Connect


### Name: aibSupportNowDesktop Name:

### Location:
Dev, Stage, Prod

### Applications:
*All from aibEntDesktop AND*
- LogMeIn
- Rumba Desktop
