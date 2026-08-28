# State management in Blazor: the Flux Pattern

*28-8-2026*

Status: Work in progress  
Type of post: Resource

## *Rapid fire thoughts*

[//]: # ( ToDo: Write!)

- Problem statement
- Boundary conditions
- Solution

Flux:
- Unidirectional data flow: Parents pass to children only
- Passing data up is forbidden.
- State should be immutable from outside.
- Store is responsible for storing the state, and emitting state changes.
- The Dispatcher dispatches actions, Actions are used to describe state changes.
- Reducers use actions to replace state.
- State is never modified, it is replaced.
- 

It is a bit mvu-stylish.


## *Outline*

## Resources

[Fluxor for state management in Blazor](https://code-maze.com/fluxor-for-state-management-in-blazor/)