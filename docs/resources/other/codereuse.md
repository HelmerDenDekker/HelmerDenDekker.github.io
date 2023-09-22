# Code reuse
*30-8-2023*

Status: Work in progress

## When to reuse code

DRY principle, once you have written code >2 times, see if you can reuse it.
Why? 
Ease of maintenance
Short time-to-market

## Good reuse principles

Only reuse technical components, no business logic. Business logic can and will change.

- Keep it simple
- Use a versioning system
- 

## My experience with code reuse

//ToDo -> add pictures using Excalidraw to clarify and REWRITE!!!!

This article describes a code reuse in a philosophical way. Several options and their pros and cons are jotted down. It is a living document



This is mainly a process problem. On the one hand we want the shared code to be (able to be) developed upon, so it will have frequent changes. For the development process in the dependent applications however, you would want the shared code to be developed along with the app (because we want to be agile, and work scrum-wise, right?)

There are several ways to achieve code reuse across different .NET solutions. The list below is not complete, but a summary of a full day read on the internet:

As a clear example, I will introduce:

Project A: Clients (Is a vertical slice containing the clients)

Project S1: Logging (first shared project, about logging)

Project S2: Authentication

Project S3: Configuration

Project S4: DAL connections (FE Postgres setup for EF)

### Common library

You could create a common class library (a suggestion often found on Stack Overflow and other websites.) and add this library to your code as a link, or as a project reference. A common library would consist of 1 project, containing all code of S1-S4 and this be added as a link  to project A.

However, this has some drawbacks.

Foremost the project will grow organically and will become too large to handle. So this is not the way to go (even if this is often suggested)

Other drawbacks are: When you change some code in the library, it is hard to tell how other projects using this code will be impacted. There is no clear versioning system. You would have to carefully set the right (and updated) branch manually while developing, and this is often forgotten by developers.

### Common Source Code

You can create a common source code solution for your reusable code. In the solution you can create different projects, which you can add to the desired solution as a link. 

A common source code would consists of separate projects S1 to S4. If we would like to add logging to project A, we would add S1 as a link to project A.

The pro's are that you can even share a single file, if necessary.

Consider the next things:

When you change some code in the common source, it is hard to tell how other projects using this code will be impacted. It will give you a build failure when you rebuild the code.

Once code has been published (deployed, compiled). It will always use that version of the code. So whenever you change something in the common source, and you want it released everywhere, you have to deploy updates of all apps using the common source.

Adding separate projects by links can cause long build times. This can be solved by adding project dll’s. However, that method is really maintenance unfriendly. Since you would have to manually build on every change and add the dll.

This method is only useful for small projects with small teams, so it is clear what everyone is working on, communication and developing lines are short. Because it will be tricky to manually keep up with all the different branches and select the right branch of the shared code to your project.

### Service or RESTfull API

An API or service is a single resource through which the common code is reachable. I did stumble upon this suggestion in Stack Overflow, where it was praised by having a version control system, and thus being preferred over a common source code.

In the case of a Service we would have to create a ServiceManager, Contract and endpoints for project S1. We would need to add the service to project A. And make calls from project A, via a proxy to the service. This is a simple representation, because I am skipping about security, CORS and other stuff we would need to take care of.

Also this introduces latency and too much complicated code in order to be serving this code to your project. Because if this is about a common way to do logging (project S1), this can be considered, but it will have some serious performance drawbacks. But it can never be used for sharing an interface, or a configuration-handler, nor an extension.

Always, use an API when you should (for example you need some generic data) instead of common code. Never use it for common code within your projects. So for example, it could be perfect for S2, authentication. Most of the times you would want a single sign on. And on sign-on the whole process will be slower than the (extra) latency caused by an API.

### Nuget Packages

Nuget packages do solve the version control AND single source of truth problem. Because you can update a nuget package, give it a certain version and describe breaking changes.

The downside of using Nuget packages is the maintenance burden. You will have to add it to every project in your solution, where you are using this nuget. And if you are using a lot of common code, in a common code source solution, you will generate nuget packages by the hundreds, having many versions around (>50), which will drive you mad in the end (which is my experience).

I really like this way of working. However, do think about the maintenance costs, if you want to update this one Nuget Package, you have to search for yourself in which projects it is used. And you need to redeploy all these projects. It is time-consuming.

If we wanted to add project S1 to project A, we need to create a Nuget package (and a local source repo for our nuget packages). We need to set some properties (versioning) and whenever the project is deployed, a new nuget package is created.

This can result in a deploy chain: Say that A depends on S1, S1 on S2, S2 on S3 and S3 on S4. It would mean if S4 is updated, I need to do five deploys before A is updated. This will take a lot of time in my experience to do all these updates (usually a day with three deployments and large sourcecodes), and it will seriously slow down the development process.

NuGet packages are interesting for stable libraries.

### Submodules

Working with submodules can be tricky ( and I would add, cause severe headaches). However it does potentially solve a lot of maintenance problems.

Say we have the master branch of project A. And we need to fix an error in the S4 branch. When we add S4 as a submodule to A, and we fix and deploy master of A, if configured right, it will take all the changes merged to the S4 branch into account as well.

This works particularly well in dependency chains, in any case in theory much better than with nuGet packages. Because I could change something in S4. If that depends on S3, and so on to A, I only need to update the respective master branches, and things will work.

So there is much better control in development, with all kind of branches around. You will have a master-chain of submodules, stable-chain etcetera.

Submodules do not update automatically, I know this will cause some issues, certainly when developers forget to update, or for longer-running tasks.

However, when you have the process taken care off properly, submodules is the only tool I know that combines branch-management (version management) and DTAP-possibilities with the possibility to develop the code quickly and have low maintenance.

### Azure Functions

When using functions as an API, it will be comparable to using a service. However, Azure has two more interesting features:

Logic App: With the logic app you can configure logic (say you want to transform to json, or to a pdf). This could replace some common logic I used in older projects, we should research this.

Service bus: The serviced bus can be used for MaaS, messaging as a service. So this is a way to perform tasks in a non-blocking way. This has the potential to increase performance. A very good example is logging. Just push the log-object into the bus and not care anymore, because we won't read the logs the next second anyway. And it won't slow down the functions execution. This mechanism can be used for any non-blocking functionality we would like to implement.

