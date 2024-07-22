# Blazor, events and Rx

*13-11-2023 - updated 15-7-2024*

Status: Work in progress  
Type of post: Resource

## *Rapid fire thoughts*

ReactiveX in Blazor.

[//]: # (	ToDo: My example of how to in Blazor and with Rx. )

## Rx clock example

In the [Github demo](https://github.com/HelmerDenDekker/HelmerDemo.BlazorServer), I created an example with a simple clock.

### Event delegates

For a "real life" example I created a simple clockProvider, where I could've just used Timer. But, whatever, I just
wanted it to be clear that you need a provider for raising events. You could also listen to the front-end as is done in
a lot of examples, but that misses my point of how to raise events.

So: the provider raises the TimeUpdate event, a second has passed.

Another thing normally provided by the UI framework (or Timer) is the EventArgs. I decided to do this myself, so the
TimeHandlerEventArgs inherits from the EventArgs, making it possible to send the DigitalTime as an object with the
event. Again, I could've done this a lot simpler, by just having the time update in the frontend, and send an simple
event on every second (like you do with the timer). That misses the point here, as I wanted to demo how to send an
object.

The third ingredient is the EventHandler TimeHandler, which is the subject, or observable in Rx. The TimeHandler has a
delegate you can make a callback to, and a method to raise the event.

In the frontend I create a listener (Observer) listening to the event. This listener is subscribed to the observable at
initialization with the +=.
On initialization, I start the clock, making it raise an event every second.

I understand this is completely over-engineered this way. A timer is much simpler, but that is not the point. It is a
simple understandable case of how event handling works with delegates.

### From delegate to Rx example

So, how to turn these delegate-example into a working Rx example?

For this I used the subject, because, honest to God, despite it not "being according the dogma", after a few days trying
to get the Observable and observers to do what I wanted them to, I just flipped the bird to them, and tried it my way.

In the demo, you can compare the CounterRxEv, using the CounterSubject and the CounterEv using old school events for a
good idea of what was done.

I could spend a day writing it down here, but I think you can read the code and see what I did.

I was inspired by an [old blogpost by Mark Heath](https://markheath.net/post/reactive-extensions-observables-versus).

## Resources

[Github demo](https://github.com/HelmerDenDekker/HelmerDemo.BlazorServer)  
