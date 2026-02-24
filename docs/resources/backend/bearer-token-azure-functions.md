# Bearer token in Azure functions

*28-1-2026*

_Status: {Work in progress} {Idea}_  
_Type of post: {Opinion piece} {Guide} {Resource}_

## *Rapid fire thoughts*

[//]: # ( ToDo: Write!)

### Problem statement

How to work with Bearer tokens in Azure Functions when making HTTP requests to a second API that needs them?


- Boundary conditions
- Solution




## *Outline*

## About azure functions

Azure functions have a Host and a Worker

Worker == `[Function]` part.
Host is the 'Program' part.

You can set bindings etc in the host (dependency injection, logging, configuration, ...)

The worker executes and is the part that gets scaled.


## user tokens

User tokens should be added per request to the HttpRequestMessage in the function code, always!

## server-to-server tokens

Using the Client credentials OAuth flow you can add it to the HttpRequestMessage per request as well, HOWEVER...

It is also possible to use a Singleton with a named client. The singleton stores the access_token in memory, and retrieves it. It refreshes it when it is expired (on 50%-70% of expiration-window time).

## Resources

[HttpClient Lifecycle in Singleton Services ](https://www.technetexperts.com/httpclient-singleton/)  
[IHttpClientFactory with .NET](https://learn.microsoft.com/en-us/dotnet/core/extensions/httpclient-factory)