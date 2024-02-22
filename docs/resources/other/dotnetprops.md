# Solution structure: central build properties

*6-11-2023*

Status: Work in progress  
Type of post: {Opinion piece} {Guide} {Resource}

## *Rapid fire thoughts*

Pros and cons of central build property files

## *Outline*

Solution structure

Part of the solution helpers kind of knowledge.
Like the:

```
+-- .azuredevops
+-- .documentation
+-- .gitignore
+-- .dockerignore
+-- adr.config.json
+-- Directory.Build.Props

```

.azuredevops contains azure devops templates
And Github templates!!

## Directory Build props

You can add a Directory.Build.Props file per directory

How to update the nuget packages?

Running an auto-update in VS results in the update being added to every csproj.

Directory.Packages.props?
However, do not do this on a project with lots of packages already.

Pro

+ One file for solution wide settings (error/warning handling, editor configuration)
+ Central version management means the version of all the project nugets stays the same

## Directory packages props

Only works fo VS2022>=17.2 & .NEt SDK >=6.0.3 & nuget.exe >=6.2.0

This is a lot of refactoring work, especially if you use a lot of packages in an existing solution.
However, it does pay of if you do a lot of patching in an existing solution.

Pro

+ Always the same nuget package version
+ Updating one means updating all (consolidating is a thing of the past)

Cons

- If you want that one project in a huge solution to be out of the loop, you need extra decentralized central
  directory.packages.props files to manage this, and I do not want to burn my fingers n that..
- One size fits all (Mostly one size fits small, which is the case here as well.)
- What problem did we solve here again?

## Resources

[Customize the build by folder](https://learn.microsoft.com/en-us/visualstudio/msbuild/customize-by-directory?view=vs-2022)

[Central Package Management (CPM)](https://learn.microsoft.com/en-us/nuget/consume-packages/Central-Package-Management)