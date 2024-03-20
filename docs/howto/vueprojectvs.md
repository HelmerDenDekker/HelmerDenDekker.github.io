# How to start a vue project in Visual Studio 2022

*20-9-2023*

Status: Work in progress

## Start a vue project

Start the vue project the normal way as described in the vue [quickstart guide](https://vuejs.org/guide/quick-start)

## Add to Visual Studio

Choose "File" in the top menu.  
Go to "New" and choose "Project".
In the search bar, type Node.
Choose "From existing Node.js code", the TypeScript or JavaScript, depending on your Vuejs setup.

### Configure your new project - wizard

In the following wizard, the order is very, very important, otherwise it will reset fields.

- Start with add to solution, if you already have a solution.
- Next enter your project name (you cannot choose the vue name here, which is a shame)
- Next select the location of the root of the project.

Please check the "Project will be created in "< Your Location >". This should be a concat of the location and project
name.

Click Create, this will take you to the next wizard.

### Create New Project From Existing Node.js Code - wizard

In the next wizard you need to select:

- the source folder with the existing node code (where you created the vue project)
- the language
- filter for the files you want to add

Click Next.

!! This is an absolute disaster, because it will not add to solution, it will create a njsproj in the right folder and
add it to a new solution.

## Solved it

Solved it by just adding the existing (njsproj) project to the existing solution manually.

njsproj seems old, esproj is the new way forward in VS2022

