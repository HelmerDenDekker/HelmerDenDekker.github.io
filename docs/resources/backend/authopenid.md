# Authentication: OpenID Connect
*1-9-2023*

## About OpenIdConnect

OpenID Connect (oidc openidconnect):
- Is a simple identity layer on top of the OAuth 2.0 protocol.
- Allows Clients to verify the identity of the End-User based on the authentication performed by an Authorization Server, as well as to obtain basic profile information about the End-User in an interoperable and REST-like manner.
- Allows clients of all types, including Web-based clients, to request and receive information about authenticated sessions and end-users.

In OpenID connect there are flows defined for the protocol implementation. These flows are regularly updated, making anything I write down here deprecated in a year (probably). Please check the [OpenID foundation website](https://openid.net/) for up to date info.

## Authorization code flow explained

![OpenID connect flow](/assets/images/openid/openid.svg "OpenID connect  flow")

The user wants to visit your webpage. So it enters the url in the browser, and hits enter. 

Behind the scenes:
- The User agent sends a request for a resource to the Application. 
- The Application checks for a valid token

Happy scenario: Token is available and valid:
- The application will return the requested resource

If there is no token and no authorization code sent in the request; or the token is invalid:
- The application will send an Authorization code request to the identityprovider
- The identityprovider will validate the authorization code request. 
- The application will redirect the user to the identityprovider login page. The IdentityProvider will ask the user for authentication credentials.
- The user enters credentials and posts it by clicking the login button. A POST request is sent to the IdentityProvider.
- The IdentityProvider processes the credentials. 
- When valid, the identityprovider sends an authorization code back to the user with a redirect action (to the original target).
- The User Agent follows up on this redirect and go to the original target (Application).
- The Application detects the Authorization code send along, and calls the Token endpoint on the identityprovider, without any user agent interference.
- The Identityprovider validates the code (safety measure) and sends an id-token, access-token with the claims back to the Application.
- The application can create a session with the user, and store the token in the backend (in the sequence diagram). Another option is to store the token in the user agent, whatever you prefer.

## My thoughts on OpenID Connect

I am a fan for using OpenID Connect and OAuth 2.0 in dotNET projects. I think it is the best thing out there as I type this down (1-9-2023).
In my opinion it is quite easy to implement in a .NET (Core) project. I might write a little blog about this later. I have done the device-flow implementation for a desktop app, and the authorization code flow for web in 2023. Both .NET 6 applications. 
Earlier I implemented this in .NET framework as well, which takes a little more effort.

- It is new compared to SAML.
- It is a proven technology. 
- It receives regular security updates. Be aware of that when implementing OpenID, because you will need to keep it up to date.

## Resources

[Darut K explains all the flows (although the flow names are missing)](https://darutk.medium.com/diagrams-of-all-the-openid-connect-flows-6968e3990660)  
[How OpenID Connect Works - OpenID Foundation](https://openid.net/connect/)