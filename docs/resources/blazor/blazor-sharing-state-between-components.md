# Blazor sharing state between components

*3-4-2026*

_Status: {Work in progress} {Idea}_  
_Type of post: {Guide} {Resource}_

## *Rapid fire thoughts*

[//]: # ( ToDo: Write!)

### Problem statement

How to share state between components?  

For example, I have three components about the user, and I want the name of the user to be shared, instead of requested every time.  


- Boundary conditions

### Solution

#### Shared App State

Have one shared AppState component, which is cascaded in the app. This is the solution described by Carl Franklin in [Managing Application State in .NET 8 Blazor Web Apps](https://github.com/carlfranklin/appstateserver)

I like the simplicity of this solution.  
The downside is that I need to store all stuff about stuff in this one place, and have to look it up there. It is not properly vertically sliced. And that is what I like.

#### Cascading parameters

I can also use cascading parameters, so ComponentA has PropertyA => ComponentB is part of ComponentB, and I can cascade the propertyA into ComponentB. This is a good solution if the components are in a parent-child relationship, but it is not good if they are in a sibling relationship.

[//]: # ( ToDo: The solution I am using for sharing state, makes it so that at rerendering, the appState seems to be empty?)
Answer: I think it can not cross rendering borders.
The UserProfile works because it is rendered S(tatic)S(erverSide)R(endering), and then the state was entered to cascade, but the page is probably InteractiveServerNoPrerender? Why will all components with cascading stuff IN the ssr-rendered part not have the cascading values anymore?

This is the problem with cascading, the crossing of the rendering border. Or: Thou shall not cross the rendering border! Thou shalt not pass!!!

### State persistence without crossing the rendering border

I think I saw this Blazortrain episode, where there was this one component, which contained the value. And all other components implemented this one component.



## *Outline*

## Resources

[Managing Application State in .NET 8 Blazor Web Apps](https://github.com/carlfranklin/appstateserver)  
[State management in Blazor](https://learn.microsoft.com/en-us/aspnet/core/blazor/state-management/?view=aspnetcore-10.0)
[Circuit state persistance](https://learn.microsoft.com/en-us/aspnet/core/blazor/state-management/server?view=aspnetcore-10.0)