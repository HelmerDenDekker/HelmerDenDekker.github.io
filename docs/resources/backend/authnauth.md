# Authentication and Authorization

*8-9-2023*

Status: Work in progress - Not mine!

*By Janne Timmers*

//ToDo: rewrite!!

## OAuth 2.0:

    OAuth 2.0 is the industry-standard protocol for authorization. 
    OAuth 2.0 focuses on client developer simplicity while providing specific authorization flows for web applications. 
    OAuth 2.0 is NOT an authentication protocol. It is an delegated authorization framework, which many modern authentication protocols are built on.

### Resources

[RFC 6749 - OAuth 2.0](https://datatracker.ietf.org/doc/html/rfc6749)
[The Simplest Guide to OAuth 2.0](https://darutk.medium.com/the-simplest-guide-to-oauth-2-0-8c71bd9a15bb)
[Diagrams and Movies of all the OAuth 2.0 Flows](https://darutk.medium.com/diagrams-and-movies-of-all-the-oauth-2-0-flows-194f3c3ade85)

While OAuth 2.0 does a great job of providing the necessary information for consumers to make authorization decisions,
it says nothing about how that information will be exchanged securely.
This has led to every authentication provider having their own way of exchanging the OAuth 2.0 information, which has
led to a few well-publicized hacks.

## OpenID Connect 1.0

OpenID Connect fixes these problems by providing an authentication protocol that describes exactly how the exchange of
authorization information happens between a subscriber and their provider.

- It is a simple identity layer on top of the OAuth 2.0 protocol.
- It allows Clients to verify the identity of the End-User based on the authentication performed by an Authorization
  Server, as well as to obtain basic profile information about the End-User in an interoperable and REST-like manner.
- It allows clients of all types, including Web-based clients, to request and receive information about authenticated
  sessions and end-users.

[OpenID Connect](https://openid.net/connect/)


