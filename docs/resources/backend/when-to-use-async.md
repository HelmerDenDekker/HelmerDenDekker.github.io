# When to use async

*13-10-2025*

_Status: {Work in progress} {Idea}_  
_Type of post: {Opinion piece} {Guide} {Resource}_

## *Rapid fire thoughts*

[//]: # ( ToDo: Compare the methods. However, do add some examples. When to use what.)

- Problem statement
- Boundary conditions
- Solution

I think async is over-used.  
Sometimes things are more like events.

## When Async?

- Network operations. Like a call to a web-API.
- Read or write to a database.
- Read or write files.

Async operations have a clear beginning and end.

## When event or RX?

When data is a stream.

## When use Parallel?
CPU-bound work.

## Async to sync

If you are in a situation where you have to call async code from sync code:
1. Consider if you really need to do that. 

### The blocking hack

If you really have to, you can use this blocking hack:

```csharp
var result = SomeAsyncMethod()).GetAwaiter().GetResult();
```

quote
Unfortunately, that code wouldn’t actually work. It results in a common deadlock described in my “Best Practices in Asynchronous Programming” article I mentioned earlier.
This is where the hack can get tricky. A normal unit test will pass, but the same code will deadlock if called from a UI or ASP.NET context. If you use the blocking hack, you should write unit tests that check this behavior. The code in Figure 5 uses the Async-Context type from my AsyncEx library, which creates a context similar to a UI or ASP.NET context.

### The threadpool hack

```csharp
var result = Task.Run(() => SomeAsyncMethod()).GetAwaiter().GetResult();
```

## The flag argument hack
...




## *Outline*

What is this "thing" doing?  

Async should be used for I/O-bound operations.  

Depending on the application, CPU-

## Resources

[Async Programming - Brownfield Async Development](https://learn.microsoft.com/en-us/archive/msdn-magazine/2015/july/async-programming-brownfield-async-development)