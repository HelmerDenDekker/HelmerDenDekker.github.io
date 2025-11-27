
# Function to allow limited post-install scripts
function OnlyRunAllowedPostInstallScripts {
    # Safe-by-default on your machine
    npm config set ignore-scripts true
    npm install -g @lavamoat/allow-scripts
}

# Function use npq as a strategy to check packages before installing them https://www.npmjs.com/package/npq
function UseNpq {
    npm install -g npq
    # Secure-by-default point npm to npq
    Set-Alias npm npq-hero
    
    # persist
    if ( Select-String -Path $profile -Pattern "npq-hero" )
    {
        return
    }

    Add-Content -Path $profile -Value 'Set-Alias npm npq-hero'
}

Write-Host "Start configuring safe npm usage"

OnlyRunAllowedPostInstallScripts
UseNpq

Write-Host "Finished."