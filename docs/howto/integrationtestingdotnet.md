# How to quickly integration test in .NET

*5-10-2023*

I just saw this easy integration testing in .NET 6 on YouTube and was like: 'WOW! I want to try this out!' So I created
a quick example and played around with it.

## Testing an API endpoint

It revolves around an example by microsoft, simply testing an API endpoint. The pattern itself is much more powerful,
but I am presenting an easy case here.

First add the next line to your <code>Program.cs</code>:

```cs
public partial class Program { }
```

Next create an integration test using whatever framework you like, and be in awe.
Right... So this is the test I have written using xUnit:

```cs
[Fact]
public async Task Get_Request_ShouldReturnVersionString()
{
    // --arrange--
    
    var application = new WebApplicationFactory<Program>();
    var httpClient = application.CreateClient();
    
    // --act--
    
    var response = await httpClient.GetAsync("/v1/catalog");
    
    // --assert-- 
    
    Assert.IsTrue(response.IsSuccessStatusCode);
    Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
}
```

<code>Program</code> in <code>WebApplicationFactory</code> is pointing to the <code>Program.cs</code> of the API project
you want to test.
It tests a simple api endpoint returning only an OK result.

Let's run dotCover to see the results: What is happening?  
![Code coverage results](/assets/images/integrationtest/codecoverage.png "Coverage Results")

As you can see, it actually tests (part of) the <code>Program.cs</code> for you! How nice! That is the effect of it
being an integration test. And it is slow, certainly the way I have been setting things up now, which can be improved in
the future.

## Resources

[Example code in HelmerDemo.WebshopDemo Catalog Service](https://github.com/HelmerDenDekker/HelmerDemo.WebShopDemo)  
[Integration tests in ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/test/integration-tests?view=aspnetcore-6.0)  
[Web Application factory deep dive with Andrew Lock](https://andrewlock.net/exploring-dotnet-6-part-6-supporting-integration-tests-with-webapplicationfactory-in-dotnet-6/)