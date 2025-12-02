# Are you missing the sub claim in dotNet JWT tokens?

*28-11-2025*


## Problem

In a JWT token, there is a `sub` claim that uniquely identifies the user.

From the openId specs:

>Subject Identifier  
>Locally unique and never reassigned identifier within the Issuer for the End-User, which is intended to be consumed by the Client.

I spent this morning debugging and trying to figure out why my ASP.NET application was not showing the `sub` claim in the ClaimsIdentity after authentication. In complete despair I decided to search the internet for a reason.

This is where I stumbled upon the blog by Clint McMahon. In dotNet the `sub` claim is mapped to the `NameIdentifier` claim type by default. This means that if you are looking for the `sub` claim specifically, you will not find it because it has been renamed. 

## The solution

As per Clint McMahon's blog, you can disable the default claim mapping by adding the following line of code in your `Startup.cs` or wherever you configure your authentication:

```csharp
JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
```

This line of code clears the default claim type mappings, allowing you to access the `sub` claim directly from the JWT token.

After adding this line, you should be able to access the `sub` claim like this:

```csharp
var subClaim = User.FindFirst("sub")?.Value;
```


## Resources

[How To Fix Missing 'sub' Claim an ASP.NET JWT](https://clintmcmahon.com/Blog/aspnet-core-sub-claim-mapping)  
[OpenID Connect Core 1.0 incorporating errata set 2](https://openid.net/specs/openid-connect-core-1_0.html)  