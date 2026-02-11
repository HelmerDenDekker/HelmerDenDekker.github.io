# Blazor app architecture

*9-2-2026*

Status: Work in progress Idea  
Type of post: Guide

## *Rapid fire thoughts*

[//]: # ( ToDo: Write!)

This is about Blazor-Server.

## Problem statement

In the past, when using html-api style apps, state was simple.  
For the backend, the state was simply persisted in the database.  
For the FrontEnd the state was in the DOM / browser.

You could just work anywhere, and the state of the application and the state of the database were decoupled.

### Fading boundaries

In a Blazor application, these boundaries are fading. The old way of thinking about DI and services is no longer valid. A service is scoped to the lifetime of the component.

### Compared to MAUI / MVVM

Suppose you have an application with a navigation tree on the left in a partial view, and a view to add some folder, or whatever to the navigation tree.  
If you change the AddNavigationViewModel, I want the navigation tree to also change.  

However, these are two different components, so they have different Models, each representing the state.

In MVVM the ViewModel is the abstraction of the view, with the Model and the Commands.

The state of the object is stored in the Model. This is where the logic is.

In this case, the problem is that the state of the navigation tree and the state of the add navigation view are not shared. They are in different components, and they are not aware of each other. This is a problem, because we want them to be aware of each other.

In many MAUI courses, state is moved further up for this reason. They will end up with Domain Driven Design (probably).

### Current way in Blazor

In Blazor, all logic and the model are inside the component. It is vertical slices to the max.    
The model is the state, and it lives in a single instances, subject to the lifetime of the circuit. There is no real persistence of this state by default. Where the state in an old html-api style app always saves the current state in the browser tab, no such mechanism reliably exists in Blazor. The state is only kept in memory, and if the circuit is lost, the state is lost.

Also, for multiple tabs in the browser, for the same page, multiple states can exist. This might be desirable, or it might not, depending on the use case. However, this is no different from a html-api style app.

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
