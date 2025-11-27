function OnlyRunAllowedPostInstallScripts {
    # Setup allow-scripts per project https://www.npmjs.com/package/@lavamoat/allow-scripts
    npx --no-install allow-scripts setup
    # generates a configuration
    allow-scripts auto
}

function PreventLockfileInjection {
    npm install --save-dev lockfile-lint
    npx lockfile-lint --path package-lock.json --type npm --allowed-hosts npm --validate-https
}

Write-Host "Start configuring safe npm usage for this project"

OnlyRunAllowedPostInstallScripts
PreventLockfileInjection

Write-Host "Finished."