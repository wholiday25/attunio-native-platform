# Use this script to add Windows Features
# Note that 
#enable-windowsoptionalfeature -online -featureName [feature name] -all
#will enable any other needed/dependent features required for installed feature

#Enable telnet
enable-windowsoptionalfeature -online -FeatureName TelnetClient 

