# Stop using the HttpClient the wrong way in .NET

*1-9-2023 - updated 15-9-2025*

Status: Work in progress, rewrite

## Problem

There is a lot of noise about the use of the HtppClient, despite Microsoft (and others) have clear explanations about how to use it.

Sometimes I encounter code like this:

```csharp
public class MyApiService
{
	public async Task CallApi()
	{
		using var httpClient = new HttpClient();
		var response = await httpClient.GetAsync("https://myapi.com/endpoint");
		// Process the response
	}
}
```

The HttpClient is covered in a using. You should NEVER do this, it will lead to ~~socket~~ port exhaustion.
I understand the cause: The HttpClient implements the HttpMessageInvoker, which implements IDisposable, so developers think they need to dispose it by wrapping the HttpClient in a using.  

For this test, I am using a simple console application with a Worker that calls a scoped dependency injected ApiService.

## Scenario one: The worst

In this service, a new HttpClient is created for each call.

```csharp
var htppClient = new HttpClient();
var response = await htppClient.GetFromJsonAsync<string>("https://someurl/api/version");
// etc
```
Checking with TCPView (or with the netstat -ano command) you can see this will keep the connection open for 120 seconds (on my windows locally, may vary per OS). 
After 120 seconds the operating system moves the connection to the "Time Wait" state. The connection will remain in this state for a while (30s to 120s, depending on OS), after which the socket will be closed.

So, when I do a lot of calls, it will open up a lot of new TCP connections, until the server runs out of connections. 
This is called ~~socket~~ port exhaustion.

## Scenario two: Slightly better, but still bad

Let's try to mitigate this by wrapping the HttpClient in a using. Because the HttpMessageInvoker implements IDisposable. So it will be disposed. Right?

```csharp
using var htppClient = new HttpClient();
var response = await htppClient.GetFromJsonAsync<string>("https://someurl/api/version");
// etc
```

YES!  
The TCP connection no longer exists in TCPView! Erm, well, it does exist, but only for as long as the ApiService call lives. Which is short in my test.  

What happens here is less visible.  
- Every time a new HttpClient is created, a new TCP connection is opened.
- The connection is directly moved to a "Time Wait" state after the call is done.
- The connection will remain in this state for a while (30s to 120s, depending on OS), after which the connection will be closed.

So if you wait and stare at TCPView, you will see the connection appear and disappear as it is closed after 120s (on my OS).  

So, we made the situation a bit better. The system can handle twice as many connections in the same time compared to scenario one.

Is it?? In my test, this is the only way the ports actually get exhausted.  

## Scenario 3: Static!!

Let's try to mitigate this by making the HttpClient static. This way the connection is only created once, and reused.

```csharp
private static readonly HttpClient _httpClient = new HttpClient();

public async Task CallApi()
{
	var response = await _httpClient.GetFromJsonAsync<string>("https://someurl/api/version");
	// etc
}
```

This sample will:
- Have only one TCP connection open per service! 
- Perform better on multiple calls because the connection is reused.
- No more ~~socket~~ port exhaustion (as long there are a limited amount of services.)

The connection will be open for two minutes, after which the connection will be closed by the OS (and be in a "Time Wait" state for a while). Until a next call is done, which will open a new connection.

However, what happens when the DNS of my API changes? The HttpClient will not know, because the connection is pooled.

So, I can either set the lifetime of the HttpClient to a limited time, or:

## Do it the right way:

Use the IHttpClientFactory.


```csharp
public class ApiService : IApiService
{
	private readonly IHttpClientFactory _httpClientFactory;

	public ApiService(IHttpClientFactory httpClientFactory)
	{
		_httpClientFactory = httpClientFactory;
	}

	public async Task CallApi()
	{
        var httpClient = _httpClientFactory.CreateClient();
		var response = await httpClient.GetFromJsonAsync<string>("https://someurl/api/version");
		// etc
	}
}
```

Register the IHttpClientFactory in the DI container with the AddHttpClient extension method.

```csharp
builder.Services.AddHttpClient();
```

This is a bit better than the static HttpClient:

It is possible to create a typed Client (one HttpClient per service).

If you want to have even less TCP-connections open, you can use a named client. That client can be used by multiple services.

## Recap

Creating a "new HttpClient" per call creates one TCP connection per call, leaving this connection open for ~240s (Established + Time Wait). Amount of connections == amount of calls.  
Wrapping this in a using creates one connection per call, leaving the connection open for ~120s (Time Wait). Amount of connections == amount of calls.  
Using a static HttpClient per service, creates one connection per service, leaving the connection open for ~240s. Amount of connections == amount of services.  
Using a static IHttpClientFactory, creates one connection per client (named/typed), leaving the connection open for ~240s. Amount of connections == amount of clients.  

## Reaction: Really! Come on, Helmer!

First of all, do you know have many sockets a machine has? It has 2^16 ports over TCP, and each port has as many sockets, right? So there are millions of sockets available!!! Or something like that, maybe trillions!!  
Also, we have caching, so don't worry!

No!  

These are the kind of responses I got trying to explain it.
Sorry. Theoretically you are right. In practice, an old server will only have about 3000 ports available. A newer Windows server has 15000 ports available. A Linux server has around 30.000 ports available.  

First of all, sockets are not ports. And the HttpClient opens a new TCP connection on an available port, not a socket. Sorry for the confusion.

I say, the proof of the pudding is in the eating (I hate that phrase).

It is DDOS time!!  

Don't do this on a production environment!!  

I wrote a simple loop, in order to test this (on my machine). It just calls the service repeatedly until it breaks, and I log the iteration where it does.

### Test results

#### new Httpclient

When using "new HttpClient()" per call, there is never any post exhaustion. Somehow dotnet starts cleaning up when about 1000 connections are made, so it uses around 100-500 connections at once.

#### Wrapping in a using

When wrapping it in a using statement, the ports are exhausted after 16274 calls.

I so wanna give you the finger with your theoretical 4.294.967.296 socket answer!!!

#### HttpClientFactory / static HttpClient

When using the HttpClientFactory or a static HttpClient, there is never any port exhaustion. It just keeps reusing the same connection. You will see the package amount (received/sent) increase, and that's it.


## Resources

The problem and solution are explained in this page:

[Use IHttpClientFactory to implement resilient HTTP requests](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/implement-resilient-applications/use-httpclientfactory-to-implement-resilient-http-requests)

These are the newest guidelines by Microsoft:

[Guidelines for using HttpClient](https://learn.microsoft.com/en-us/dotnet/fundamentals/networking/http/httpclient-guidelines)

Janne Timmers found me this explanation, which is great:
[YouTube - Stop using the HttpClient the wrong way in .NET](https://www.youtube.com/watch?v=Z6Y2adsMnAA)

## Resources

- [YouTube - Stop using the HttpClient the wrong way in .NET](https://www.youtube.com/watch?v=Z6Y2adsMnAA)  
- [Use IHttpClientFactory to implement resilient HTTP requests](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/implement-resilient-applications/use-httpclientfactory-to-implement-resilient-http-requests)  
- [Guidelines for using HttpClient](https://learn.microsoft.com/en-us/dotnet/fundamentals/networking/http/httpclient-guidelines)
- [Back to .NET basics: How to properly use HttpClient](https://www.mytechramblings.com/posts/dotnet-httpclient-basic-usage-scenarios/)

