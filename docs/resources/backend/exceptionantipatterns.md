# Thoughts on Exception Anti Patterns

*30-8-2023*

Status: Work in progress

I listened to the .NET Rocks podcast "Exception Anti Patterns" with Matt Eland
Resource or standards for exceptions podcast

## Rapid fire thoughts

Matt Eland article resource, basically a summary of the podcast

## Tags

https://medium.com/new-devs-guide/top-10-dotnet-exception-anti-patterns-in-c-3827576d82a

## Headlines

## Outline

## Intro

## Main points

Avoid using exceptions if you can. Exceptions are expensive.

1. Do catch Exceptions in your code
2. Throw exceptions (sometimes) in order to stop the program from breaking down. t
3. Only catch specific or custom exceptions! Do not ever catch Exception
4. Do not ever throw Exception, because of number 3
5. Do not ‘throw ex’! Use ‘throw’. Throw ex will reset the call stack (you know what I mean, you cannot follow where
   exactly it happened)
6. Do not use an exception for flow control (see my comment)
7. Is nummer 8, heb er 1 gemist? Not using custom exceptions
8. Nummer 10! Trust the framework

t: Comment by Helmer on 2: Think about Result class and how you return success and an error code, instead of using
exceptions. #queue See the ADR in webshop demo project about when to use Exceptions.

When your logging infrastructure breaks, you are screwed. So take care (http Sink ) to handle errors well. Do not repeat
a request on a 400 error response for example

AppInsights / rollbar (?)
ELK stack for dotNet?

Configurationexception Als een custom exception toevoegen aan webshop demo #queue

Async changes stack traces
