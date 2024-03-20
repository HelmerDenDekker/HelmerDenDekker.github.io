# Reading Appsettings

*20-12-2023*

Status: Work in progress  
Type of post: Resource

## *Rapid fire thoughts*

When to use what, for loading appsettings

By Mukesh:   
When to use IOptions, IOptionsMonitor, and IOptionsSnapshot?

- Prefer to use IOptions, when you are not expecting your configuration values to change.
- Use IOptionsSnapshot when you expect your values to change, but want them to be uniform for the entire request cycle.
- Use IOptionsMonitor when you need real-time options data.

## *Outline*

## Resources

MS docs: [Options pattern in .NET](https://learn.microsoft.com/en-us/dotnet/core/extensions/options)  
[Options Pattern in ASP.NET Core – Bind & Validate Configurations from appsettings.json](https://codewithmukesh.com/blog/options-pattern-in-aspnet-core/)  
[Adding validation to strongly typed configuration objects in .NET 6](https://andrewlock.net/adding-validation-to-strongly-typed-configuration-objects-in-dotnet-6/)  
