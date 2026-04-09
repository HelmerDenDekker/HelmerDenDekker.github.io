# How to use SCSS in Blazor

*8-4-2026*

_Status: {Work in progress} {Idea}_  
_Type of post: {Opinion piece} {Guide} {Resource}_

## *Rapid fire thoughts*

[//]: # ( ToDo: Write!)

### Problem statement

I want scss support in blazor

### Boundary conditions

- I do NOT want gulp.
- I DO want it in the pipeline.
- It needs Rider AND VS support.
- As is, all scss-files are compiled into one css-file. This is not very vertically sliced. For the cause of consistency, this is the way I will go forward.

### Solution

#### WebCompiler

- Visual Studio extension.
- This compiles all files into one css-file.
- Compiles LESS, Scss, Stylus, JSX, ES6, (lced)CoffeeScript.
- MSBuild support (for pipeline)
- Minification support
- Watch for changes on sass, or compiler config file.
- Last updated 2016

[Web Compiler](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.WebCompiler)

#### CompileSass

Not updated since 2017.

#### AspNetCore.SassCompiler

- has a watcher
- compiles scss to single css file
- MSBuild support

Last updated 2 days ago (2026)

#### Delegate.SassBuilder

Last updated 2016

## And TypeScript?

[Compile TypeScript code (ASP.NET Core)](https://learn.microsoft.com/en-us/visualstudio/javascript/compile-typescript-code-nuget?view=visualstudio)

## *Outline*

## Resources
[How to add SCSS support to Blazor - Joren Thijs - 2021](https://joren-thijs.medium.com/how-to-add-scss-support-to-blazor-cd2a62995441)  
[How to work with SASS in Blazor](https://www.fresh-caffeine.com/blog/2024/blazor-2-working-with-sass/)
[Get Some Sass Into Your Blazor App - Chris Sainty - 2019](https://chrissainty.com/get-some-sass-into-your-blazor-app/)