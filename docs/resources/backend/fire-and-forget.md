# Fire and forget in dotNet

*10-12-2025*

_Status: {Work in progress} {Idea}_  
_Type of post: {Opinion piece} {Guide} {Resource}_

## *Rapid fire thoughts*

[//]: # ( ToDo: I think this is more of a fire-and-return PROBLEM and a fire-and-forget cancellation challenge. )

- Problem statement
- Boundary conditions
- Solution

## Problem

I have an async command.  
As long as I do not expect anything to return, I can run it in a fire-and-forget way.  

However, if I want to get back to the caller when the command is finished... That is where things go wrong.



## Solutions

Use Task.Run or Observable.FromAsync to run the async command in a fire-and-forget way.

## Problem with Task.Run

Look at my When to use async article! This describes the different hacks to use.

## Problem with Observable.FromAsync

I tried to solve the problem with Observable.FromAsync, but I ran into problems. 

Suppose I want a limited lifetime class to do something that is async. When the user(or client-app) closes this class, where does the result, or error go? You may want the whole thing to be canceled? Or not? 

Another problem is, that it does not chain and come back. With more complex code and multiple classes, it becomes opaque very quickly. You have no idea what you are doing, and if the code actually works at all times as you would expect. You successfully created a chaotic system.

Trying to explain:   
Whenever you use an Observable.FromAsync, it constructs a Task, and a scheduler. Behind it there is a lot of clever (or complex?) code that eyes the Task, and when it completes, returns the result or error to the subscriber.  
It is a static extension constructing a new object. So, it will start a new lifecycle for the async command, within the lifetime of the extension (which is static, so it lasts forever. Or until you stop the application).  
Important: it performs its task, and returns the result.  

So, when you nest these calls, you create multiple lifecycles. Each with their own scheduler, and own Task.  
When the outer class is disposed, the inner classes may still be running. And when they complete, they will try to return the result to the subscriber. But the subscriber may no longer exist! Or it may have been disposed already! Or it may be in an invalid state!
In this chain of cancellations and disposals, you will end up with exceptions that are hard to trace back (or explain!).

## Example of fire-and-return

Get user from the localstorage, and the user closes the page, or navigates away, causing Blazor to reload the page.

Yes, I know, this is due to poor choice of architecture. However, I am bound to Blazor-server here.

Step 1: Get user from localStorage.  
I do not want the user to wait for this check. So I use Observable.FromAsync while loading the page.

Step 2: No User found: Check if localStorage is enabled.  
IF localStorage is enabled, set the user in localStorage:  

Step 3: Set the user in localStorage.  

Step 1 => returns to Step 2 => returns to Step 3.

Where Step 1 is already a fire-and-return kind of operation.  
When the user navigates away, or closes the page, the Blazor component is disposed.  
When Step 1 returns to Step 2, it tries to set the user in localStorage. But the component is disposed already! Boom!

At least, I expected that to happen. But it does not...

What happens in reality:  
User navigates away in step 2, it finishes and returns. No errors whatsoever. I am not sure why, but in some point in time, when something decides to clean up old components maybe, at that point it throws an exception. But I have no idea when that is.  
It is hard to trace back where the error comes from. Also, the error is swallowed not reproducible.














## *Outline*

## Resources
