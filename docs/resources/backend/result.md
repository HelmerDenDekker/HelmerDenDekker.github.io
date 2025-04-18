# About the Result object

*18-04-2025*

_Status: Work in progress_  
Type of post: Opinion piece

## *Rapid fire thoughts*

- Problem statement

Looking for a way to return a Result from logic. While brainstorming with Tejas, we came up with the idea of a Result object.
This object would contain:
- boolean indicating success
- a code for the parent to decide how to proceed (like an HTTP status code)
- a message, according to the minimum-information-principle, informing the user or developer about the error.
- possibly a value, if the operation was successful.

## The first iteration 2020-2025

Query-command separation.

Result type class with
- IsSuccess bool
- StatusCode
- Message

The query-type is a `Result<T>`  Result, but with a Value property of type T.

Simple and effective, right?

### What I did not like

- The logic involved, having to go to StatusCode to compare the result with the expected value.
- Object creation was a problem, because I did never want new Result() to be called, but this happened nonetheless.
- Because `Result<T>` and Result are the same classes, I needed a way to downcast for something that cannot be a result carrying a Value. Because only the OK Result can carry a value. I created a DownCast extension method, having to call this DownCast everywhere. I went mad refactoring code.


## The second iteration

Inspired by a geek-out podcast with Nick Chapsas, I realized an enum would probably use less memory than a class.

So I created a new Result class. This is just an enum.

`Result<T>` was replaced by a ValueTask, and all messages, statusCodes and IsSucces were replaced by a ResultExtension class, so only when you really want a message to be returned, it is fetched. And it is not carried around by the class all the time as heavy weight.

## Results

The enum test was twice as fast for the new iteration and used no memory allocation at all, compared to the 232 B for the class.


## Resources
