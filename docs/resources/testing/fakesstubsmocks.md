# Mocks, Stubs and fakes in unit testing

*15-01-2025*

_Status: Work in progress_  
_Type of post: Resource_

## *Rapid fire thoughts*

[//]: # ( ToDo: Write!)

- Problem statement => I just can't keep them apart, can you?
- Boundary conditions
- Solution


## *Outline*

## Mocks

Use mocks to verify interactions the interaction with dependencies.
This is ideal for command-style operations, like Add(), which adds the user to the database.

## Stubs

Use stubs to provide responses to queries.
A stub simulates a real dependency and give a simplified, predetermined response.

Use Stubs for testing query-style methods. Like FindById() which returns a user.

## Fakes
Provide realistic but simplified behaviour.
For example: Instead of interacting with a Blob storage, I used the file system to simulate the Blob.

## Resources
[Unit testing, Fakes, Stubs and Mocks](https://www.softwaretestingmagazine.com/knowledge/unit-testing-fakes-mocks-and-stubs/)  
[Understanding Mocks, Stubs, and Fakes in Software Testing](https://medium.com/@keploy1/understanding-mocks-stubs-and-fakes-in-software-testing-ef7848741a48)  
[Mocks, Stubs, and Fakes](https://docs.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices)  
[Mocks Aren't Stubs](https://martinfowler.com/articles/mocksArentStubs.html)  

