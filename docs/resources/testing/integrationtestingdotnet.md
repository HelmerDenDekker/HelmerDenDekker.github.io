# Integration testing in .NET
*5-10-2023*

## API endpoint check

I just saw this easy integration testing in .NET 6 on youtube and was like: 'WOW! I want to try this out!' So I created a quick example and played around with it.  

It revolves around this example by microsoft.

First add the next line to your <code>Program.cs</code>:

```cs
public partial class Program { }
```

Next create an integration test  using whatever framework you like, and be in awe.
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
<code>Program</code> in <code>WebApplicationFactory</code> is pointing to the <code>Program.cs</code> of the API project you want to test.
It tests a simple api endpoint returning only an OK result.

## Resources

[Example code in HelmerDemo.WebshopDemo Catalog Service](https://github.com/HelmerDenDekker/HelmerDemo.WebShopDemo)  
[Integration tests in ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/test/integration-tests?view=aspnetcore-6.0)  
[Web Application factory deep dive with Andrew Lock](https://andrewlock.net/exploring-dotnet-6-part-6-supporting-integration-tests-with-webapplicationfactory-in-dotnet-6/)