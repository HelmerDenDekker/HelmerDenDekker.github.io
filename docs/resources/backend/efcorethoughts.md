# Thoughts on Entity Framework core
*30-8-2023*

Status: Work in progress

Using Entity framework Core in your dotnet projects

I listened to the .NET Rocks podcast "Entity Framework Tooling" with Erik Elsjkov Jensen. He is right about this:

- It is a good idea to start with the schema first-approach.

Databases are optimised for persistence, entity framework is not. So your database-expert should design an optimal database. And you should use it. 

For example: If your EF-model defines a name as a string, it will code-first generate a varchar max (//ToDo: does it??)
Your DB-engineer will frown upon that, because it can take Gbs. (//ToDo: Is that true?) And make the database too big (//ToDo: Architecture course, splitting db's is a bad idea, distributed systems -> do not distribute)

//ToDo: I want to check this stuff, and I want to know what tools I can use to make my life easier.