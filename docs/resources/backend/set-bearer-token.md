# How to add a bearer token to an HttpClient request in .NET

*13-10-2025*

## Searching my memory for the right way

Just this moment I was searching my memory for the right way to add a bearer token to an HttpClient request in .NET.  
Sadly, my memory is a bit corrupted, so I went on the interwebs to look this up.  

I WAS APPALLED!

My god!

A Microsoft page, or any documentation is nowhere to be found.

So I needed to write this blog to set things right.

### DefaultRequestHeaders

I will tell you about DefaultRequestHeaders first.
This is a property of the HttpClient class.

The HttpClient instance should be static. Or reused in some way.

I repeat: The HttpClient instance should be static or reused in some way.

Is that clear?

This HttpClient has a property called DefaultRequestHeaders.

And I quote Microsoft:
> Gets the headers which should be sent with each request.

I repeat: Gets the headers which should be sent with each request.  
Each request!

The DefaultRequestHeaders property is made for your convenience, to not have to repeat setting the same headers over and over again.
So it should have headers that are shared for ALL requests you do with this HttpClient instance for as long as it lives.

It is an unsafe way in my opinion, to set the bearer token here. Your token should expire.

If you set the AccessToken in the DefaultRequestHeaders, it will be used for all requests, until you change it. 

Imagine you created a twisted app with a static HttpClient. And user1 wants do do a request, changes the DefaultHeaders, and user2 makes a request within the millisecond, the DefaultHeaders of that static instance are changed to user2's token.  
What are the odds of that happening?  
Zero in well-build apps, but I have seen people doing crazy stuff.

### How to set the bearer token?

In my opinion, the right way to set the bearer token is to set it on the HttpRequestMessage.
In case of token expiration, you will always set the right token for the request.

Here is a sample:

```csharp
var request = new HttpRequestMessage(HttpMethod.Get, "https://someurl/api/version");
request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
var response = await _httpClient.SendAsync(request);
```

## Resources

[HttpClient.DefaultRequestHeaders Property](https://learn.microsoft.com/en-us/dotnet/api/system.net.http.httpclient.defaultrequestheaders?view=net-9.0)  
[Duende.IdentityModel](https://github.com/DuendeSoftware/foss/blob/bdcca2f9a746880984015db47ec567b0228336bd/identity-model/src/IdentityModel/Client/AuthorizationHeaderExtensions.cs)













[//]: # ( ToDo: Write!)

- Problem statement
- Boundary conditions
- Solution


## *Outline*

## Resources
