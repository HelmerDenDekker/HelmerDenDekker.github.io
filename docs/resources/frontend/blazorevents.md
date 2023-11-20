# Blazor, events and Rx
*13-11-2023*

Status: Work in progress  
Type of post: Resource

## *Rapid fire thoughts*

Event handling in blazor

Simple to complex.

Rx

Event handling - callbacks etc.

## RX, its place under the stars

I found the System.Reactive package in a solution I was using for some work project. I liked the idea, but was trying to figure out exactly what it was for.

|              | Pull                        | Push                        |
|--------------|-----------------------------|-----------------------------|
| One          | `object`                    | Callback                    |
| One - Async  | `Task<object>`              | Callback                    |
| Many         | `IEnumerable<object>`       | `IObservable<object>`       |
| Many - Async | `IAsyncEnumerable<object>`  | `IAsyncObservable<object>`  |

I was inspired by [Ian Griffiths](https://endjin.com/who-we-are/our-people/ian-griffiths/#blogs) diagram, and I extended it. [IAsyncObservable is in preview](https://github.com/dotnet/reactive) at the time of writing. 

Pull -> the consumer proactively looks for data changes (polling in case of events)
Push -> the consumer receives a value whenever it is available
Push-Pull -> the consumer receives a change notification as the push-part, and needs to pull the changes


## Reactive Programming

Reactive programming combines the Observer pattern with the Iterator pattern and Functional programming.

It is a programming paradigm oriented around data flows and propagation of change.

For example: Excel. If you update one cell, all cells dependent on this one cell are updated instantly.


### Observer pattern

The [observer pattern](https://en.wikipedia.org/wiki/Observer_pattern) is a behavioural design pattern in which an object (subject) maintains a list of dependents (observers) and notifies them of any state changes.

It addresses the following problems:
- An object (subject) can notify multiple other objects (dependencies)
- Tight coupling in case of one-to-many dependencies between objects
- On state change of the subject object, an open-ended number of dependencies needs updating

The observer design describes a subject and an observer.

Plus:  
- Loose coupling of subject and observer
- Single responsibility: Subject updates, observer reacts

Minus:
- Possible memory leak when implemented badly (lapsed listener) if the subject holds strong references to the observers, keeping them alive.

![Observer Pattern and ReactiveX](/assets/images/rx/observerpattern.svg "Observer Pattern and ReactiveX")

Here you see three implementations in dotNET.
The first one shows old school event handling with delegates, with a publisher and sunscriber. The Eventhandler has a delegate (callback), and a service to raise (multiple) events.

The second shows the observer pattern as implemented in plain dotnet.
The third shows the Reactive extensions pattern.

#### delegates

Each event is treated separately.

- Using the delegates looks quite clumsy syntax-wise (+=). 
- It is difficult to combine delegates or pass around them.
- The chaining and error handling is awkward (not as we are used to anymore... we are spoiled.)
- No history of events (no event sourcing)

#### Level up: Observer pattern

The Observer pattern is one level up, compared to the delegates.
There is a Observable subject, which has Subscribe and Unsubscribe methods, replacing the clumsy += and -=.
The observable has a list of observers registered to this observable, it can call its IObserver interface methods like OnNext to push values out.


The Observer has a Subscribe and Unsubscribe method, and the OnNext, OnError and OnCompleted. This is much more clear compared to eventhandling with delegates, where you could have created these yourself.
OnNext pushes the next value.
OnCompleted means it is ready.
OnError means an error occured.
With Subscribe and Unsubscribe the observer can register to an observable.

#### Another level up: Reactive Extensions

Build on top of the observer pattern are the reactive extensions. It is the same, but also very different.
Notice in the picture it does not look that different. It basically looks as a simplified layer on top of the observer pattern.

It is more, but more about that later.

### Iterator pattern

Foreach through a list.

### Functional programming



## Rx

Rx library consists of:
- Core: Flows, sequences and events, observables, observers and subjects
- Linq and extensions for filtering and querying 
- Schedulers and concurrency

### Marble diagram

Below the marble diagram explained.

![Marble diagram explained](/assets/images/rx/marblediagram.svg "Marble diagram explained")



## Rx example

In the Github demo, I created an example with a simple clock.

### Event delegates

For a "real life" example I created a simple clockProvider, where I could've just used Timer. But, whatever, I just wanted it to be clear that you need a provider for raising events. You could also listen to the front-end as is done in a lot of examples, but that misses my point of how to raise events.

So: the provider raises the TimeUpdate event, a second has passed.

Another thing normally provided by the UI framework (or Timer) is the EventArgs. I decided to do this myself, so the TimeHandlerEventArgs inherits from the EventArgs, making it possible to send the DigitalTime as an object with the event. Again, I could've done this a lot simpler, by just having the time update in the frontend, and send an simple event on every second (like you do with the timer). That misses the point here, as I wanted to demo how to send an object.

The third ingredient is the EventHandler TimeHandler, which is the subject, or observable in Rx. The TimeHandler has a delegate you can make a callback to, and a method to raise the event.


In the frontend I create a listener (Observer) listening to the event. This listener is subscribed to the observable at initialization with the +=.
On initialization I start the clock, making it raise an event every second.

I understand this is completely over-engineered this way. A timer is much simpler, but that is not the point. It is a simple understandable case of how event handling works with delegates.

### Rx example

So, how to turn these delegate-example into a working Rx example?

For this I used the subject, because, honest to God, despite it not "being according the dogma", after a few days trying to get the Observable and observers to do what I wanted them to, I just flipped the bird to them, and tried it my way.

In the demo, you can compare the CounterRxEv, using the CounterSubject and the CounterEv using old school events for a good idea of what was done.

I could spend a day writing it down here, but I think you can read the code and see what I did.

I was inspired by an [old blogpost by Mark Heath](https://markheath.net/post/reactive-extensions-observables-versus).

## Resources

[Github demo](https://github.com/HelmerDenDekker/HelmerDemo.BlazorServer)  
[ReactiveX](https://reactivex.io/)  
[Reactice extensions for dotnet developers](https://learn.microsoft.com/en-us/shows/on-net/reactive-extensions-for-net-developers)  
[Reactive extensions for dotnet](https://github.com/dotnet/reactive)  

[Reactive Extensions Observables Versus Regular .NET Events](https://markheath.net/post/reactive-extensions-observables-versus)  

[Async call httpclient](https://www.youtube.com/results?search_query=dotnet%20reactivex)  