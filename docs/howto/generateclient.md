# Generate a client
*18-12-2023*

Status: Work in progress  
Type of post: Guide



## *Outline*

Generate a client:

- For the example of the [Petstore API](https://editor.swagger.io/)
- Injecting HttpClient
- Using the HttpClientFactory

## Context

Say there is a petstore API (of a third party) you want to connect to. 
We only have the openapi specs (in this case as yaml format, but Rico Suter has a nice example of how to get an online json in the NSwag docs)

![Container of petstore for context](/assets/images/generateclient/container.svg "Context in container")

## How to

//ToDo: Write a how to with the steps and code

## Using the generated client

Register in Program.cs

```cs
builder.Services.AddHttpClient<IPetStoreApiClient, PetStoreApiClient>>(c => c.BaseAddress = new Uri("https://petstore.swagger.io/v2/"));
```

Use it wherever you need it by dependency injecting the IPetStoreApiClient.



## Resources

[My github code for generating client](https://github.com/HelmerDenDekker/helmer.helper.clientgenerator)  

Inspired by:  
[Stuart Lang, Generating a Typed Client for use with HttpClientFactory using NSwag](https://stu.dev/generating-typed-client-for-httpclientfactory-with-nswag/)  
[Rico Suter Nswag](https://github.com/RicoSuter/NSwag)  
[Rico Suter C# Client Generator](https://github.com/RicoSuter/NSwag/wiki/CSharpClientGenerator)  
