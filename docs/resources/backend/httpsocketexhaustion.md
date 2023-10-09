# HttpClient and Socket Exhaustion in dotNET
*1-9-2023*

Status: Work in progress, rewrite

The problem and solution are explained in this page:

[Use IHttpClientFactory to implement resilient HTTP requests](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/implement-resilient-applications/use-httpclientfactory-to-implement-resilient-http-requests)

These are the newest guidelines by Microsoft: 

[Guidelines for using HttpClient](https://learn.microsoft.com/en-us/dotnet/fundamentals/networking/http/httpclient-guidelines)

Janne Timmers found me this explanation, which is great:
[Youtube - Stop using the HttpClient the wrong way in .NET](https://www.youtube.com/watch?v=Z6Y2adsMnAA)

In short:
- Generating a new HttpClient can quickly lead to socket exhaustion because each time it is called it is placed in memory separately tying up a socket.
- Also, working with a HttpClient you need to keep in mind DNS issues because if the DN changes, the client won’t know because connections are pooled.


​ ----------------------------------------------------------------------------------------------

//ToDo Rewrite!!

The solution: use IHttpClientFactory

In Program.cs, preconfigure your typed HttpClient. 

Add a singleton injecting your client & its interface. 

Then you have 2 choices to consider:

Add HttpClient using the same. Detailing the BaseAddress (and possibly more such as headers) is possible when you add, because now that HttpClient is defined to use only  that type. Inject the HttpClient.

Microsoft recommends Typed Client. But just FYI: it is possible to use a named client, not detailing the type but naming your client. Handy if you plan to call more than one HttpClient so you can be explicit about which client you are getting throughout your code. Inject the HttpClientFactory, use that to create a new instance of the named client where you need it.

Nick Chapsass:

This HttpClient is transient, but the handler behind the scenes actually calling the API’s is pooled and managed by a HttpClientFactory and it gives you a client with a re-used handler. Which makes it very efficient and fixes the DNS issue. (specific part of video: https://youtu.be/Z6Y2adsMnAA?t=384).

What happens is: the code enters the DefaultHttpClientFactory, tries to find the handler in the CreateHandler method. It then creates the httpClient with that handler marking it as non-disposable because we want to re-use the handlers. 

The heavy object that is prone to be dodgy is actually cached in memory, pooled an re-used. The httpClient is just called when  you need it and if you want to dispose it, you can.
