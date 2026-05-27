# How to: Use the HttpClient the right way in .NET Framework

*26-05-2026*

## Recap

Newing up HttpClient per call leads to the exhaustion of ports on your machine.  
```csharp
// exhaust the ports on your machine this way:
var httpClient = new HttpClient();
// so don't do this!
var response = await httpClient.GetFromJsonAsync<string>("https://someurl/api/version");

```

I described this problem in my article [Use HttpClient the right way in .NET](./use-httpclient-the-right-way.md), showing exactly what goes wrong.  

## What about dotnet framework?

In .NET core 2.1 and onwards, the IHttpClientFactory comes to the rescue! If you use this, there will be no problem in most cases.

But there is no such thing in .NET Framework. So, what to do there?

## What do I want?

I want my application (server) to be able to call an external web-API, which is hosted on a web address.  

A => B (external API)

## Solution one: Use a static HttpClient

I have a service CallApiService that calls the external API.  
This service has a scoped lifetime, so a new instance is created per request.

In this service, I can create a static HttpClient, and reuse it for all calls to the external API.

```csharp
private static readonly HttpClient _httpClient = new HttpClient();

public async Task CallApi()
{
	var response = await _httpClient.GetFromJsonAsync<string>("https://someurl/api/version");
	// etc
}
```

It is a good start.  

There are a few issues.

- If the DNS of the API changes, the HttpClient will not know. The httpClient was started at the moment the app was started, and will only reset when the app restarts. So, if the API moves to another address, the HttpClient will not know, and all calls to the external API will fail until the app is restarted.
- If I have multiple services calling this API, I will have multiple static HttpClients, each taking up one port.
- The HttpClient should be long-lived, but each response should be short-lived. If I have a long-running response, the connection will be open for a long time, and It will not be able to reuse it for other calls.


## Solution two: Better architecture

My thoughts on this are to create some service to call the external API. This service holds the HttpClient and the configuration.

Thoughts:
1. Generic clients GetAsync(url, options)
2. Typed, generated clients.