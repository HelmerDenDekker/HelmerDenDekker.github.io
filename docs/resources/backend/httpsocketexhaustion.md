# How to: Use the HttpClient the right way in .NET

*1-9-2023 - updated 15-9-2025*

## Problem

There is a lot of noise about the use of the HttpClient, despite Microsoft (and others) have clear explanations about how to use it.

### Diving into code

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

### Common reactions to me stating this problem

These are the kind of responses I got trying to explain it.  
- Really??? Come on, Helmer!  
- Do you know have many sockets a machine has? It has 2^16 ports over TCP, and each port has as many sockets, right? So there are millions of sockets available!!! Or even trillions!!  
- We have caching, so don't worry!  
- Never heard of it, so it won't be that big of a deal.  

About the sockets: Theoretically there are 4.294.967.296 sockets.  
However, this is where things start to go wrong. Sockets are not ports. And the HttpClient opens a new TCP connection on an available port, not a socket. This causes some confusion typically.  

In practice:
- an old server will only have about 3000 ports available.
- A newer Windows server has 15000 ports available.
- A Linux server has around 30.000 ports available.

If I look at the design of my website, which is API-heavy, it takes only 10 simultaneous users to exhaust the ports using the httpClient the wrong way.  
Looking at the traffic peaks, this is a realistic scenario.

## Scenario 1: The worst case, creating a new HttpClient per call

Many blogs and vlogs present this way to be the worst way to use the HttpClient.
In this service, a new HttpClient is created for each call.

```csharp
var httpClient = new HttpClient();
var response = await httpClient.GetFromJsonAsync<string>("https://someurl/api/version");
// etc
```
TCPView (or the netstat -ano command) shows the connection stays open for 120 seconds (on my windows locally, may vary per OS). 
After 120 seconds the operating system moves the connection to the "Time Wait" state. The connection will remain in this state for a while (30s to 120s, depending on OS), after which the socket will be closed.  

So, when I do a lot of calls, it will open up a lot of new TCP connections, until the server runs out of connections. 
This is called ~~socket~~ port exhaustion.

The ports are theoretically opened up again after 240 seconds (120s Established + 120s Time Wait).

### Test to break stuff

I said theoretically, because I wanted to see this in practice. Let's break stuff!

DDOS time!

Don't do this on a production environment!!

I wrote a simple loop, in order to test this (on my machine). It just calls the (locally hosted) api repeatedly through the service until it breaks. When it does, the iteration is written to the screen.

Much to my surprise, there is never any port exhaustion!  
Somehow something (dotnet?) starts cleaning up when about 1000 connections are established.
Running the tests multiple time, it uses around 100-500 connections at once in steady load.  

I did not expect this behaviour at all from the worst-case scenario.

## Scenario 2: Slightly better, but still bad

How to handle this problem?  
Reviewing the code, you cannot help but notice that the HttpClient implements the HttpMessageInvoker, which implements IDisposable.  
OMG! Forgot to wrap it in a using statement!  
Let's try that!

```csharp
using var httpClient = new HttpClient();
var response = await httpClient.GetFromJsonAsync<string>("https://someurl/api/version");
// etc
```
And... (drum roll please) ...

YES!

The TCP connection no longer exists in TCPView!

Erm, well, it does exist, but only for as long as the ApiService call lives. Which is short in my test.

HOWEVER!

What happens here is less visible.  
- Every time a new HttpClient is created, a new TCP connection is opened.
- The connection is directly moved to a "Time Wait" state after the call is done.
- The connection will remain in this state for a while (30s to 120s, depending on OS), after which the connection will be closed.

So if you wait and stare at TCPView, you will see the connection appear and disappear as it is closed after 120s (on my OS).  

So, in theory, we made the situation a bit better. The system can handle twice as many connections in the same time compared to scenario one.

Is it?? 

### Test to break stuff

In my test, this is the only way the ports actually get exhausted.  

I took the code from last test, and ran it with the using statement.

Now it breaks!  
Finally!  
The ports are exhausted after 16274 calls.

So that is how many ports are available on my machine at this time for this application. It is close to the theoretical 15.000 as found in some other blog.

## Scenario 3: Static!!

Instead of creating a new HttpClient each call, I will create one per service.
I will do that by making it static. This way the connection is only created once, and reused.

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

So, I can either set the lifetime of the HttpClient to a limited time, or do it the right way, using the HttpClientFactory.

### Test to break stuff

In my loop-test, there is never any port exhaustion. It just keeps reusing the same connection. You will see the package amount (received/sent) increase, and that's it.

## Do it the right way! Use HttpClientFactory

Use the IHttpClientFactory:

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

This is a bit better than the static HttpClient.

It is possible to create a typed Client (one HttpClient per service).

If you want to have even less TCP-connections open, you can use a named client. That client can be used by multiple services.

### Test to break stuff

When using the HttpClientFactory in my loop-test, there is never any port exhaustion. It just keeps reusing the same connection. You will see the package amount (received/sent) increase, and that's it. Same as with the static HttpClient.

## Recap

Creating a "new HttpClient" per call creates one TCP connection per call, leaving this connection open for ~240s (Established + Time Wait). Amount of connections == amount of calls.  
Wrapping this in a using creates one connection per call, leaving the connection open for ~120s (Time Wait). Amount of connections == amount of calls.  
Using a static HttpClient per service, creates one connection per service, leaving the connection open for ~240s. Amount of connections == amount of services.  
Using a static IHttpClientFactory, creates one connection per client (named/typed), leaving the connection open for ~240s. Amount of connections == amount of clients.

## Resources

The problem and solution are explained in this page:

[Use IHttpClientFactory to implement resilient HTTP requests](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/implement-resilient-applications/use-httpclientfactory-to-implement-resilient-http-requests)

These are the newest guidelines by Microsoft:

[Guidelines for using HttpClient](https://learn.microsoft.com/en-us/dotnet/fundamentals/networking/http/httpclient-guidelines)

Janne Timmers found me this explanation:
[YouTube - Stop using the HttpClient the wrong way in .NET](https://www.youtube.com/watch?v=Z6Y2adsMnAA)

And last but not least, a nice blog post:
[Back to .NET basics: How to properly use HttpClient](https://www.mytechramblings.com/posts/dotnet-httpclient-basic-usage-scenarios/)

