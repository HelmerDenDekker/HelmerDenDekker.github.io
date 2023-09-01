# Authentication: SAML
*1-9-2023*

## About SAML

SAML is the acronym for Security Assertion Markup Language. It is an open standard for exchanging authentication AND authorization data between parties.

SAML is a buzzword, and is used to describe things like the set or one of the xml-based protocol messages, the bindings, or the profiles. So whenever you hear or use the word SAML be aware of that! Ask them what they mean precisely. Because basically SAML is a standard.

SAML is a proven standard, it was developed in 2001, and the latest version is from 2005. So it is supported by most software that have Single Sign On implementations. Basically it combines a lot of existing standards as XML, SOAP, XSD and HTTP.

## SAML single sign on explained

Web browser Single Sign On (SSO) is a well-known use case for SAML.
In SAML-speak:
- the application you want to enter is the "service provider", since it provides the service you want to request.
- The application responsible for identity management is called "identity provider"

![SAML authentication flow](/assets/images/saml/saml.svg "SAML authentication flow")

This sequence diagram shows the "behind the scenes" of a user visiting your application ("service provider"). The user enters the url in the browser, and hits enter.

Behind the scenes the following happens:

The User agent sends a request for a resource to the Service Provider.
The Service Provider checks if a security context exists.
If it exists, the service provider will return the resource, and the user will be happy.

If there is no security context:
- In some cases the service provider will do identity provider discovery; it checks if the identity provider is reachable.
- The service provider returns a redirect response, with an AuthnRequest object.
- The User Agent receives the redirect response, and acts accordingly, by sending a GET request to the Identity Provider with the AuthRequest object.
- The IdentityProvider processes the request. It will take decisions based on configuration, in this case I assume the IdentityProvider will ask the user for username and password.
- The User Agent is redirected to the login page, and show this page in the screen.
- The user enters credentials and posts it by clicking the login button. A POST request is sent to the IdentityProvider. 
- The IdentityProvider processes the credentials. When valid, it will respond by sending a form back to the User Agent.This form contains the SamlResponse object.
- The User Agent sends a POST with the SamlResponse to the service provider. In this application the "Assertion consumer service" will process the request and create a security context.
- The service provider will redirect to the original target by using a redirect response.
- The User Agent picks up the redirect and sends a GET request to the Service Provider.
- The Service provider returns the requested resource, because we just created a valid security context.

And the user is happy.

## My thoughts on SAML single sign on

It is old (no judgement intended). So on the plus-side it is proven, on the downside, there are newer, better technologies and protocols.

Theoretically it is a lot slower than OpenIDConnect, but I never tested this in real life.

Having all the responses go back to the user agent, mean it has a larger attack surface for a hacker compared to OpenIdconnect (again, theoretically).

In my (limited 2-year) experience, I found implementing SAML correctly in dotNET projects was complex. For me it was a lot more difficult compared to OpenIdConnect (but I have 4 year multi-project experience with that, so...). Setting up OpenIdConnect and Oauth is also not easy, but in the end, the implementation in a dotNET project is easier.


## SAML in dotNET

I have created an implementation in a dotNET project using the packages provided by [Anders Revgaards](https://github.com/Revsgaard) ITfoxTec company. I compared some dotNET implementations, and in my opinion, this company provided the best implementation back in 2021. Let me know if things have changed by now by [creating an issue for this article in my GitHub](https://github.com/HelmerDenDekker/HelmerDenDekker.github.io/issues)

## Resources

[How SAML works - AUTH0](https://auth0.com/blog/how-saml-authentication-works/)

[SAML - Wikipedia](https://en.wikipedia.org/wiki/Security_Assertion_Markup_Language)