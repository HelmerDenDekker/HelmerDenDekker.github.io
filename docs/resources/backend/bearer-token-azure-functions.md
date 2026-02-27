# Bearer token in Azure functions

*25-2-2026*

Type of post: Guide

## Bearer tokens in Azure Functions

Question of the day: Howe to call an external API secured by a bearer token from an Azure function.

## Short azure functions recap

Azure functions have a Host and a Worker.  

Worker == `[Function]` part.  
Host is the 'Program' part.  

You can set bindings etc in the host (dependency injection, logging, configuration, ...)

The worker executes and is the part that gets scaled.

## Dealing with user tokens

User sends an access token along when calling the Azure Function.  
I want the Azure function to validate the token, and next call an external API.  

No (valid) token? Return a 401 so the user can re-authenticate. Consider using 404 out of security reasons.

Using the Easy auth, you can inject the `ClaimsPrincipal` in the function code, and check if the user is authenticated. You can also check for specific claims, like scopes or roles.

[//]: # ( ToDo: How did this work? Because there is scope and audience. And I know I can have an AccessToken in an MVC/web app where you just have an access token with just scope (or role) and not audience.)

User tokens should be added per request to the HttpRequestMessage in the function code, always!

## Server-to-server tokens

Using the Client credentials OAuth flow you can add it to the HttpRequestMessage per request as well, HOWEVER...

It is also possible to use a Singleton with a named client. The singleton stores the access_token in memory, and retrieves it. It refreshes it when it is expired (on 50%-70% of expiration-window time).

### As implemented

For adding the access token to the HttpRequestMessage, I implemented a DelegatingHandler that adds the access token to the request. The DelegatingHandler is added to the HttpClient pipeline in the host configuration.

```csharp
public class BearerTokenHandler : DelegatingHandler
{
    private readonly ITokenService _tokenService;

    public BearerTokenHandler(ITokenService tokenService)
    {
        _tokenService = tokenService;
    }

    protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
    {
        var accessToken = await _tokenService.GetAccessTokenAsync();
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
        return await base.SendAsync(request, cancellationToken);
    }
}
```

The TokenService provides and locally stores the access-token until it is expired. It retrieves a new one when it is expired.
```csharp
public class TokenService : ITokenService
{
    private readonly IHttpClientFactory _clientFactory;
    private string _accessToken;
    private DateTime _expiration;

    public TokenService(IHttpClientFactory clientFactory)
    {
        _clientFactory = clientFactory;
    }

    public async Task<string> GetAccessTokenAsync()
    {
        if (!string.IsNullOrEmpty(_accessToken) && DateTime.UtcNow < _expiration)
            return _accessToken.AccessToken;
            
        var client = httpClientFactory.CreateClient("AccessTokenClient");
        using var request = new TokenRequest();
        // Set up the request with necessary parameters (client_id, client_secret, scope, etc.)
        var response = await client.SendAsync(request);
        
        if (response.IsError || !string.IsNullOrEmpty(response.Error))
        {
            Log.Error("Failed to retrieve access token: {Error}", response.Error);
            return string.Empty; // or throw an exception based on your error handling strategy
        }
        
        _expirationTime = DateTime.UtcNow.Add(response.ExpiresIn * 0.75);
        _accessToken = response.AccessToken;
        
        return _accessToken;
}
```

In the azure function, it is implemented as follows:

```csharp
public class MyFunction
{
    private readonly HttpClient _httpClient;

    public MyFunction(IHttpClientFactory httpClientFactory)
    {
        _httpClient = httpClientFactory.CreateClient("ExternalApiClient");
    }

    [FunctionName("MyFunction")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
        ILogger log)
    {
        var result = await _httpClient.GetAsync("https://externalapi.com/data");
        // etc... No need to add the access token here, it is added in the DelegatingHandler. Base url is added in the host configuration.
    }
}
```

The Program.cs (host) configuration looks like this:

```csharp
var host = new HostBuilder()
    .ConfigureFunctionsWorkerDefaults()
    .ConfigureServices(services =>
    {
        // Register the BearerTokenHandler as a transient service
        services.AddTransient<BearerTokenHandler>();
        // Register the TokenService as a singleton service
        services.AddSingleton<ITokenService, TokenService>();
        
        services.AddHttpClient("AccessTokenClient");
                
        services.AddHttpClient("ExternalApiClient", client =>
        {
            client.BaseAddress = new Uri("https://externalapi.com/");
        })
        .AddHttpMessageHandler<BearerTokenHandler>();
    })
    .Build();
    
host.Run();
```


## Resources

[HttpClient Lifecycle in Singleton Services ](https://www.technetexperts.com/httpclient-singleton/)  
[IHttpClientFactory with .NET](https://learn.microsoft.com/en-us/dotnet/core/extensions/httpclient-factory)