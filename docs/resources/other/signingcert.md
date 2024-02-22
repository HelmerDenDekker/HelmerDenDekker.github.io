# About Signing Certificates and how to create them

*8-9-2023*

Status: Work in progress

We created the code signing certificates on the server using the following code in Powershell:

$EKU = "2.5.29.37"
$EKU_CODE_SIGNING = "1.3.6.1.5.5.7.3.3"

$certificate = New-SelfSignedCertificate -Subject "CN=your-cn-url-here,E=your-email-here,O=-your-organisation-name-here"
-FriendlyName "friendly-Certificate-name-here" -NotAfter (Get-Date).AddYears(3) -CertStoreLocation Cert:\LocalMachine\My
-TextExtension @("$EKU={text}$EKU_CODE_SIGNING")

$password = ConvertTo-SecureString -String "your-password" -Force -AsPlainText

Export-PfxCertificate -Cert "Cert:\LocalMachine\My\$($certificate.Thumbprint)" -FilePath "
friendly-Certificate-name-here.pfx" -Password $password