# Blazor state management: the Actor pattern

*28-8-2026*

Status: Work in progress    
Type of post: Resource  

## Problem statement

The requirements where like:
- App can have multiple states, a bit like a wizard, step 1, step 2, step 3.
- Parts of this state are managed by third party backend systems. (They have state of their own).
- A single user always has a single state, this state should be synced across multiple tabs in the browser.
- It should be easy to add or alter steps.

## Solution

After some research, I came up with the idea of using state machines, and the actor pattern.

The state machines handles the state the actor is in.  
The actors react to events, and can send commands to the state machine.

It is a tree:
- RootActor
  - CategoryActor
    - EntryActor 
    - UserSessionActor
      - StepOneActor, or
      - StepTwoActor, or
      - StepThreeActor

The StepTwoActor can have many children of its own, connecting to external parties/API's, or actors that keep front-end components in sync.
- ThirdPartyConnectionActor
- ThirdPartyUserStateActor
- UpdateStepTwoComponentActor

Actor rules:
- The lifetimes of the actors are managed by themselves.
- Parents are responsible for creating children
- Parent-actors can close child-actors.
- When a parent-actor is closed, all children are closed.
- Parents listen to children.
- Parents watch the health of their children.
- Actors should be self-healing.
- Actors have an address, on which they are reachable. (I am still in doubt about this one, because this is what services and DI is for)

Customer journey:
- Visitor enters the websites => Home component and EntryActor.
- User logs in creating a UserSession. => UserSessionActor and Component.
- User starts a wizard => StepOneActor is created, StepOneComponent is rendered.
- User completes step one => StepOneActor is destroyed, StepTwoActor is created, StepTwoComponent is rendered.
- In step Two there is interaction with third party apps, so first a connection is created, when there is a secure connection (third party session), it sends the event active, so the parent knows this child-actor is active, triggering the creation of another connection, with another API (I do not make this up!), which goes through some states (disconnected, authentication, handshakes, active). When active, the StepTwoComponent is rendered.
- The third-party apps have the power to close a connection, or can go offline. This should be handled by the actors and their parents.



## Resources
