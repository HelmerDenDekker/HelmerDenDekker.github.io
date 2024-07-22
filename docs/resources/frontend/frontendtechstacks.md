# Front end architectures

*30-8-2023*

Status: Work in progress

In this page some Front End frameworks are discussed, in a philosophical way.

[//]: # (	ToDo Rewrite!!)
For context: a monolith architecture is a no go. This will create too much technical debt. We need flexibility for laws
can be scrapped or changed, so there is a need for the ability to change just that what needs to be changed.

This speaks for small N-layered apps or microservices (functions in extreme). Here the possible design patterns for
front end are summed up:

## MVC pattern

Model-View-Controller, invented in 1970s

MVC is a design pattern used to decouple user-interface (view), data (model), and application logic (controller). This
pattern helps to achieve separation of concerns.

Using the MVC pattern for websites, requests are routed to a Controller that is responsible for working with the Model
to perform actions and/or retrieve data. The Controller chooses the View to display and provides it with the Model. The
View renders the final page, based on the data in the Model.

Most websites have a layered MVC-design (Models, Views, Controllers separately in layers, so this is not CUPID design)

Helmer den Dekker has built many MVC apps before, and the MyCustomers Vertical slice (old) is an example.

MVC is hosted in the back end, these are mostly static pages, with some javascript functionality.
Benefits

Fast development (templating, scaffolding, lots of code is shared and can be auto-generated)

Proven technology

Secure code, since it runs on your server

Ease of debugging, everything is happening in one piece of code.

Flexibility, you can add anything to an MVC and it will work, lots of extensions available
Challenges

Not CUPID by default, so you need some changes to the default MVC pattern to achieve CUPID design.

Static web pages: Limited rules in Front End (only validation), except for if you develop your own javascript, which can
easily lead to spaghetti-code

Learning curve: For beginners it is hard to understand.

Has to make round trip to server to load a new page (could also be a benefit)

Server load with heavy web pages, because everything runs on server

## Razor

Razor is microsofts answer to the steep MVC learning curve.

Basically it is MVC in a Cupid way, so the views and controllers are combined, just being a view (html) and back-end
code-behind. In theory a good idea, if you need a small simple web pages. But if it grows organically, it will spin out
of control.

For a Razor getting out of control, take a look at our Login Thor page

Benefits

Fast development (templating, scaffolding, even more code is shared and can be auto-generated)

Proven technology

Secure code, since it runs on your server

Debugging is quite easy, not as easy as an MVC, because you cannot always step through front end rules easily. Also,
because all views are scattered, but inheriting, in a big project this will drive you crazy: (where does this piece of
html come from?)

Learning curve is way less steep than MVC, anyone can easily start off a project and understand what happens.
Challenges

It is difficult to maintain, if you make one change, you need to repeat yourself almost everywhere.

Due to simplification, it is harder to get certain (advanced) things done compared to MVC.

Limited rules in Front End (only validation), except for if you develop your own javascript, which can easily lead to
spaghetti-code

Has to make round trip to server to load a new page (could also be a benefit)

Server load with heavy web pages, because everything runs on server

## Blazor-Server

Server-side Blazor was launched in 2019, as microsofts answer to Javascript.

Most of the code runs back-end, and it sends data to front end using SignalR.

It is the best of both worlds, so, now you only need C# to do programming, no javascript. But still you can create
dynamic web pages, and being in control over the code.
Benefits

All code in one language (c#, is this a benefit?)

Can build complex interface, responding dynamically

Code and html can be seperated, you can use normal app architecture. Code in FE, not as good as in MVC
Challenges

No IntelliSense in Front End Code behind code.

It is new, so documentation, or architecture guidelines are sparse.

There seems to be okay Extensions support.

Leak in the HttpContextAccessor: Blazor and shared state

## Blazor-Client

Client-side Blazor was launched in 2020, as microsofts answer to Javascript, so it is brand new!!

All of the code runs in front end.

Benefits

All code in one language (c#, is this a benefit?)

Can build complex interface, responding dynamically
Challenges

I find it impossible to maintain.

I have no intellisense in the code

Code and html is one big mess.

You are not able to share the code, so lots of DRY, because if you run it, the code wants to download, and your
anti-virus will block that request.

It is new, so documentation, or architecture guidelines are sparse.

I have no idea about the extensions, microsoft says there are some there, but the learning curve is really steep for
advanced stuff due to lack of documentation (help needed here).

Security in your front end code, since it runs on the clients machine (you are not in control)

## SPA with Typescript framework

Benefits

Can build complex interface, responding dynamically

Decoupling, flexibility
Challenges

Multiple languages and interfacing between them needs tools to make maintenance easy

Latency for API-calls

Security in your front end code, since it runs on the clients machine (you are not in control)

Sources:

[Architecture of modern web apps in dotnet core and azure](https://docs.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/)  
[Architecture for cloud native apps](https://docs.microsoft.com/en-us/dotnet/architecture/cloud-native/)  
[Architecture for Serverless apps](https://docs.microsoft.com/en-us/dotnet/architecture/serverless/)  