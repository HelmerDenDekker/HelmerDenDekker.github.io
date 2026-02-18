# Blazor app architecture

*9-2-2026*

Status: Work in progress Idea  
Type of post: Guide

## *Rapid fire thoughts*

[//]: # ( ToDo: Write!)

This is about Blazor-Server.

## Problem statement

Blazor gives you a lot of freedom. My problem is encountering different kinds of logic, in different (but scattered!) places in blazor apps.

In the past, when using html-api style apps, state was simple.  
For the backend, the state was simply persisted in the database.  
For the FrontEnd the state was in the DOM / browser.

You could just work anywhere, and the state of the application and the state of the database were decoupled.

The business logic was in the backend, and some logic like validation needed to be replicated to the frontEnd.
We had clear pattern for that.

### Fading boundaries

In a Blazor application, these boundaries are fading. The old way of thinking about DI and services is no longer valid. A service is scoped to the lifetime of the component.
In Blazor-server it is all mixed together in a huge cement-mixer, and scattered all over the place. Sometimes keep-it-simple is best,but what patterns to use here?

### Compared to MAUI / MVVM

Suppose you have an application with a navigation tree on the left in a partial view, and a view to add some folder, or whatever to the navigation tree.  
If you change the AddNavigationViewModel, I want the navigation tree to also change.  

However, these are two different components, so they have different Models, each representing the state.

In MVVM the ViewModel is the abstraction of the view, with the Model and the Commands.

The state of the object is stored in the Model. This is where the logic is.

In this case, the problem is that the state of the navigation tree and the state of the add navigation view are not shared. They are in different components, and they are not aware of each other. This is a problem, because we want them to be aware of each other.

In many MAUI courses, state is moved further up for this reason. They will end up with Domain Driven Design (probably).

- ViewModel, exposes the properties and commands to the view.
- View to bind the properties
- Model keeps state and raises change events.

My problem with the whole viewmodel thing is in most examples, the ViewModel and Model are mixed.


### What about MVU

Another pattern is the Model-view-update.

### Current way in Blazor

In Blazor, all logic and the model are inside the component. It is vertical slices to the max.    
The model is the state, and it lives in a single instances, subject to the lifetime of the circuit. There is no real persistence of this state by default. Where the state in an old html-api style app always saves the current state in the browser tab, no such mechanism reliably exists in Blazor. The state is only kept in memory, and if the circuit is lost, the state is lost.

Also, for multiple tabs in the browser, for the same page, multiple states can exist. This might be desirable, or it might not, depending on the use case. However, this is no different from a html-api style app.

## Back to the problem.

1. Problem of shared state in multiple tabs. => UserSession. == MessageBox example.
2. Problem of shared state in multiple components. This can be easily dealt with using ViewModels and INotifyPropertyChanged. This wil rerender the full component. I am not sure this is the best solution.
3. Problem of testability can be handled by using IViewModel interfaces. This decouples view from viewmodel.
4. Problem of logic scattered all over the place. MVVM 
5. Problem of persistence. Blazor-Server depends on websocket connections.

I have a problem with the combination of those.
Since I cannot rely on blazor because of 5 (no persistence), I need a mechanism to persist a shared state somewhere.
And retrieve it when the circuit is lost.

There is no need for View-ViewModel binding in Blazor, it already does that.
Blazor does not have a way to share state accross tabs.
Suppose I want this shared state, AND I want notification.
Back.
1. I want shared state between the different tabs AND notifications between these tabs.
2. I want shared state between the different components AND notifications between these components.

This is simple!
Store - manage - update.
Have subscriptions.

- UserSessionStore. (state persistence) Lifetime: singleton
- UserViewModel (bound to the view, should handle state changes both ways) Lifetime: circuit
- UserSessionState (the state of the user session, with all the properties and domain logic) Lifetime: custom
- UserSessionStoreManager => handles expiration of sessions etc. Lifetime: singleton

This is all I need? 
Suppose Logout => multiple tabs. I change the state, INotifyPropertyChanged will kick in for all other viewmodels and change the state.





## Order!

How do we bring back order, so we can have a clear architecture, and a clear way of thinking about the state and the logic?

- Service, has the Application logic (like persist, connection to external API etc)
- Actor/Binder (binds the State to the View and the Service)
- View (the razor component in Blazor, with only view logic)
- State (the model in MVVM)

Decouple views from the domain.

We have to discuss the lifetimes.  
Or, where do these things live?

- The view follows the circuit, which is fine.
- The actor can follow the circuit. It is responsible for binding the state to the view, and for calling the service.
- The service needs to be transient.
- The state may need to outlive the circuit.

The state is a bit difficult, and use-case dependent.

Suppose I have the navigation tree, I want that state to be shared. It should live as long as it is needed.
If I simply add a new navigation-link, once it is added to the tree (persisted), there is no need for this "state" to keep existing.









What about idempotency? 

> Idempotency means that multiple identical requests should have the same effect as a single request.






- Solution


## *Outline*

## Resources
