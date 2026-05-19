# Blazor authentication

*9-4-2026*

Status: Work in progress  
Type of post: Resource

## Problem statement

How to do authentication in Blazor?

## Boundary conditions

Only Blazor-Server!!

## Description of the problem

Blazor-Server app operates over a SignalR connection.
Every time the client connects, a new circuit (signalR connection) is created on the server.

At that time the authentication is handled.
So any authentication logic is handled AT THAT TIME! And not any time later, because all is done by SignalR, which runs in the circuit, and outside the default ASP.NET pipeline.

Again! It does NOT run in the default ASP.NET pipeline, so it does not have access to the HttpContext, and it does not have access to the authentication middleware.

The user is authenticated once, any further step on conversation over this SignalR connection is secured.  

Successive requests need to be managed different!

Do not EVER access the HttpContext in Blazor-Server, because it is not there. It is not available. It is not accessible. 
The whole fuck-up is that it will work when running locally, and then when you deploy, it does not work anymore.

MVC-views will work.

For razor views and components, you will need to use the AuthenticationState.  

--

### Recap:

For authentication, you NEED the default pipeline, so you will need to create some MVC login page.  
Once you are logged in, on any components and views that are non-MVC (so, razor and blazor-components), you will need the AuthenticationState!


## *Outline*

## Resources
[Pluralsight course by Dino Esposito ](https://app.pluralsight.com/ilx/video-courses/838282b3-27ca-42b9-9dfa-dd4ecb9f05c2/019a9ca4-41fa-40a4-be32-641bb6731086/2d8fb265-f584-4a12-80b8-5473bbd63f6d)  
Blazor.Server needs to have an MVC-login page, which has the same issues as ASP.NET Core:  
[ASP.NET Core security topics](https://learn.microsoft.com/en-us/aspnet/core/security/?view=aspnetcore-10.0)  
About both Blazor.Server and WASM:  
[ASP.NET Core Blazor authentication and authorization](https://learn.microsoft.com/en-us/aspnet/core/blazor/security/?view=aspnetcore-10.0&tabs=visual-studio)  
