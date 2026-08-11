# How to bundle and minify in modern DotNet

*10-8-2026*

_Status: {Work in progress} {Idea}_  
_Type of post: {Opinion piece} {Guide} {Resource}_

## *Rapid fire thoughts*

[//]: # ( ToDo: Write!)

- Problem statement
- Boundary conditions
- Solution

This is the question I have asked myself so many times:  
How to bundle and minify in modern DotNet?

Because at some point, I have encountered:
- Gulp (which is deprecated/unmaintained)
- Webpack (of which I do not have fond memories)
- Vite (love it, but not for dotnet)
- Webcompiler, by Mads Kristensen (which is not maintained anymore)
- [BundlerMinifier, a great Visual Studio plugin by Mads Kristensen](https://github.com/madskristensen/BundlerMinifier) (which is not maintained anymore, and does not work in VS2022+, AND I am working with Rider. Also you had to find the right buttons to press? I am not sure anymore...)
- Some other Nuget Package which was way too obscure, and I cannot remember the name of.

At this moment I am confronted with this project using gulp, and i just needs so much fixing ALL the time. I barely have any real gulp left.
Which made me wonder.  
How to bundle and minify in modern DotNet?

## The Microsoft answer

Looking for an answer on learning.microsoft.com, I found this article:
[Bundle and minify static assets in ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/client-side/bundling-and-minification?view=aspnetcore-10.0)  

In summary, it says:
- ASP.NET does not care about bundling.
- Use Gulp or WebPack.

This made me cry for a bit.

Then I went on.

## Alternatives

### Use the Built-In ASP.NET Core Static Asset Pipeline

Or something like that? What is a Static Asset Pipeline?  

I could use npm scripts for Task automation like bundling and minification.  
I can use MSBuild to call npm run build on every build.  

I am not sure. It is a valid approach, but I am not sure if it is the best one.

Just a thought. Can't I use the MSBuild, combined with DART (AspNetCore.SassCompiler) and the Microsoft.TypeScript.MsBuild stuff?

### BuildBundlerMinifier

As per SyncFusion docs, there is a Nuget package called BuildBundlerMinifier.  
[How do you bundle and minify the CSS and JS files in Blazor applications?](https://www.syncfusion.com/faq/blazor/general/how-do-you-bundle-and-minify-the-css-and-js-files-in-blazor-applications)

Looks fine to me. However, it was last updated in 2020.  
As by Zane Claes: It's unmaintained, does not work with dotnet tool, and has a hard dependency on .NETCore 2.0

### Heft

For Sharepoint, microsoft migrated from Gulp to Heft.  
[Heft](https://www.npmjs.com/package/@rushstack/heft)

Not sure if I can do that for a Blazor project. I will have to investigate.

### WebOptimizer

For any .NET <=7.0, Microsoft recommends using WebOptimizer.  
[WebOptimizer](https://github.com/ligershark/WebOptimizer)  

WebOptimizer uses [NUglify](https://github.com/xoofx/NuGet.Nuglify) under the hood, which is a fork of the Microsoft Ajax Minifier. It is a .NET library that can minify JavaScript and CSS files.
AjaxMin was updated in 2015, and is not maintained anymore.

### Grunt

Grunt still seems to be maintained.
I always thought it was old...  
[npm grunt](https://www.npmjs.com/package/grunt)  
[Using Grunt in ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/client-side/using-grunt?view=aspnetcore-10.0&source=recommendations)  

### Microsoft.TypeScript.MsBuild

Updated in 2026.

Creates js files from ts, using a nuget package and MSBuild.  
From [Blazor train Ep. 78](https://www.youtube.com/watch?v=I_zFlBKgl5s)  
[Compile TypeScript code (ASP.NET Core)](https://learn.microsoft.com/en-us/visualstudio/javascript/compile-typescript-code-nuget?view=visualstudio)

## Vite

[Vite as tool du jour](https://khalidabuhakmeh.com/posts/running-vite-with-aspnet-core-web-applications/)  

## *Outline*

Packages, licenses, updated in.


| Package                                                                           |    License | Health score | Last updated | Comment                                                             |
|-----------------------------------------------------------------------------------|-----------:|-------------:|-------------:|:--------------------------------------------------------------------|
| [npm scripts](https://docs.npmjs.com/cli/v12/using-npm/scripts)                   |          - |            - |            - | Handles life cycle events in npm                                    |
| [npm Heft](https://www.npmjs.com/package/@rushstack/heft)                         |        MIT |           ?? |       7-2026 | maintained, 4 high alerts                                           |
| [npm Grunt](https://www.npmjs.com/package/grunt)                                  |        MIT |           82 |       7-2026 | Popular, maintained, security review needed, 5 high alerts.         |
| [npm WebPack](https://www.npmjs.com/package/webpack)                              |        MIT |           95 |       7-2026 | Key ecosystem project, maintained, active, supply chain risk.       |
| [npm Gulp](https://www.npmjs.com/package/gulp)                                    |        MIT |           76 |         2025 | Key ecosystem project, abandoned?, 6 high alerts.                   |
| [NuGet WebOptimizer](https://github.com/ligershark/WebOptimizer)                  | Apache 2.0 |           ?? |       3-2025 | Documentation outdated, recommended .NET <7.0 only, abandoned?      |
| [NuGet BuildBundlerMinifier](https://www.nuget.org/packages/BuildBundlerMinifier) | Apache 2.0 |           ?? |       6-2020 | Documentation outdated, recommended .NET Core <3.0 only, abandoned? |

And..


| Feature                | Gulp.js                     | npm scripts                   | Grunt                     | WebPack        | Heft      | 
|:-----------------------|:----------------------------|:------------------------------|:--------------------------|:---------------|:----------|
| Main purpose           | Task automation             | Task automation               | Task runner               | Module bundler | Toolchain |
| Platform/framework     | Agnostic                    | Agnostic                      | Agnostic                  | Agnostic       | ??        |
| Approach               | Gulp-file, code over config | Shell commands in config file | Grunt-file, config & code | Config-driven  |           |
| Asset optimization     | Plugins                     | CLI tools                     | Plugins                   |                |           |
| Sass                   | Plugin                      | CLI tool                      | Plugin                    |                |           |
| TypeScript             | Plugin                      | CLI tool                      | Plugin                    |                |           |
| Hot module replacement | Manual/plugins              | Manual/MSBuild                | Manual / watch plugin     |                |           |
| Azure devops pipeline  | Gulp Task                   | npm Task                      | Grunt task                | ??             | ??        |
| Learning curve         | Moderate                    | Low                           | Low-Moderate              | Moderate-Steep |           |

## Requirements?

The perfect solution depends heavily on the requirements.
- sass
- copy css files
- hot sass replacement watch
- clean typescript
- generate ts from cs
- browserify
- copy js files
- formvalidationtranslations
- copy assets
- create sprites
- 



## Resources
[webfield](https://webfield.io/gulp/alternatives)