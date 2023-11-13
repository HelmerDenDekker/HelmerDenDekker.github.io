# About NswagStudio
*5-9-2023 Updated 24-10-2023*

This article contains links I used for working with NswagStudio, NSwag in an ASP.NET Web API project.

## How to generate a client

How to generate a client - the way I like it.

#### Step 1:

On the left side in NSwagStudio, in the **Input** area, select the **Runtime**, and in the **OpenAPI/Swagger specification** enter the path to the yaml spec file.

![NSwag Studio Input](/assets/images/nswag/nswag1.png "Input section of NSwag Studio")

NB, if it throws any errors, JetBrains Rider has a real nice yaml validation AI.

Nice-to-know:
If you select **CSharp Web API Controller**, NSwagStudio reverse-generates a controller the targeted API. This could be nice for local testing purposes. 

#### Step 2:

In the **Outputs** area check the **CSharp Client** checkbox.
Next select the **CSharp Client** tab, and go to the **Settings** tab. 

![NSwag Studio Outputs](/assets/images/nswag/nswag2.png "Input section of NSwag Studio")

As you can see there are loads of settings you can play around with.

I will discuss these, for the 13.2 version of NSwagStudio:

1. Start with setting the **Namespace** to the proper namespace of your project
//ToDo continue here
For all the settings, see [CSharp Client Generator Settings](https://github.com/RicoSuter/NSwag/wiki/CSharpClientGeneratorSettings)

## Resources

[Download Nswag Github](https://github.com/RicoSuter/NSwag/wiki/NSwagStudio)  

How to:  
[Get started with NSwag and ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/tutorials/getting-started-with-nswag?view=aspnetcore-6.0&tabs=visual-studio)  
[NSwagStudio wiki](https://github.com/RicoSuter/NSwag/wiki/NSwagStudio)  

Old, but still useful
[Using NSwag to Generate C# Client Classes for ASP.NET Core 3](https://elanderson.net/2019/11/using-nswag-to-generate-c-client-classes-for-asp-net-core-3/)  
[Use HTTP Client Factory with NSwag Generated Classes in ASP.NET Core 3](https://elanderson.net/2019/11/use-http-client-factory-with-nswag-generated-classes-in-asp-net-core-3/)