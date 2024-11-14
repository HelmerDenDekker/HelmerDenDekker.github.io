# Exception Patterns and Flow Control

*30-8-2023*

Status: Work in progress

I listened to the .NET Rocks podcast "Exception Anti Patterns" with Matt Eland
Resource or standards for exceptions podcast

## Rapid fire thoughts

Matt Eland article resource, basically a summary of the podcast

## Intro

I start off with some anti-patterns. As often what we do not want leads to what we do want.

## KEEP OUT: Exception Anti-patterns

What goes wrong when using exceptions?

1. Avoid using exceptions if you can. Exceptions are expensive.
2. Do catch Exceptions in your code
3. Do throw exceptions (sometimes) in order to stop the program from breaking down. *t
4. Avoid catching Exception. Only catch specific or custom exceptions! 
5. Never throw Exception, throw custom, specific exceptions.
6. Never ‘throw ex’! Use ‘throw’. Throw ex will reset the call stack (you know what I mean, you cannot follow where
   exactly it happened)
7. Avoid using an exception for flow control (see my comment)
8. Do trust the framework

*t: Comment by Helmer on 3: Think about Result class and how you return success and an error code, instead of using
exceptions.  

When your logging infrastructure breaks, you are screwed. So take care (http Sink ) to handle errors well. Do not repeat
a request on a 400 error response for example

AppInsights / rollbar (?)  
ELK stack for dotNet?  
Async changes stack traces

## Handling flow and exceptions: It depends

Flow control:

For user-oriented failures:

- Use a Result class

For developer-oriented failures:

- Use the custom exceptions

For example

- the user wants to create an account that already exists : Result
- the developer wants to access a property that should not be accessed -> Custom Error.

## Rationale

### Option 1: Custom exceptions

Use custom exceptions whenever something goes wrong (CustomerAlreadyExistsException for a Customer that already exists).

Benefits:
- Defensive. Whenever the code hits an exception we will not proceed and the domain object will not be created.
- Stack trace (in the upper layers.)
- Easier debugging.
- Clear clean-cut exceptions which will be clear to the Domain experts

Disadvantages
- Performance. The code will break, without the user knowing why. The program will not proceed and not give feedback.
- Does not obey minimum information principle
- It will be a lot of classes to generate

### Option 2: Use default asp.net validation

If we use it in the DTO's, a default specified, but generic exception will be thrown to the user from the controller. The validation is no longer in the domain model.

The default validation is fine for the user, but not for debugging as a developer.
Using multiple kinds of validation and their place is not clear for the developer, stick to one standard.
T
See validation strategies.


### Option 3: Custom validation with Result class

Benefits:
- Expressive, reading the code you know the Result of a method, so you know what happened (instead of it breaking due to thrown error)
- Performance (for the user) the application does not have a failure, it just continues and gives feedback
- Usability
- Self-documenting, if you add all of the errors to a single file with constants

Disadvantages
- There is no stack trace. So debugging is more difficult, you need a logging system to log the stack trace.

### Keep it simple!



### Notification pattern

What I was thinking: If I have to go to DB, and something fails there, I want to tell the user, by adding a notification.
This is not validation-related.





## Resources

[Top 10 .NET Exception Anti-Patterns in C#](https://medium.com/new-devs-guide/top-10-dotnet-exception-anti-patterns-in-c-3827576d82a)  
[Martin Fowler: Use Notifications instead of errors](https://martinfowler.com/articles/replaceThrowWithNotification.html)