# Factory and dependency injection

*24-7-2024*

_Status: Work in progress_  
_Type of post: Resource_

## *Rapid fire thoughts*

For the state machines, I created a factory to produce a new state machine.

Reason: I want to control the creation process. One session should have only one state. This state is stored in memory, and if I want access to this state, I do not want to create a new state. Solution: keep the constructors private and use Factory pattern.


Problem: I cannot mock the implementation...

Rule and solution:
- Program against an interface not an implementation

## *Outline*

```cs
public interface IStateMachineFactory
{
	StateMachine CreateStateMachine();
}
````

```cs
public class StateMachine : IStateMachine
{
    private bool _isRunning;
    private IDependency _dependency;
    
    private StateMachine(IDependency dependency)
	{
		_dependency = dependency;
	}
    
	internal static StateMachine InitializeStateMachine(IDependency dependency)
	{
		return new StateMachine(dependency);
	}

}
```

```cs
public class StateMachineFactory : IStateMachineFactory
{
	private IDependency _dependency;
	private IStateStore _stateStore;
	
	public StateMachineFactory(IDependency dependency, IStateStore store)
	{
		_dependency = dependency;
		_stateStore = stateStore;
	}
	
	public StateMachine CreateStateMachine()
	{
		if(_stateStore.Get("sessionId") != null)
		{
			return _stateStore.Get("sessionId");
		}

		return StateMachine.InitializeStateMachine(_dependency);
	}
}
```

That is the idea. I dependency-inject the store, any dependencies, and the factory takes care of the creation process logic. The stateMachine only does its state-machine things. And I can test stuff dependent on state machine logic, because I can mock my interface. 

I was writing this down, and thinking, what is dependent on the StateMachine? It is created through the factory, so any instance only needs the factory?  
Yes. True.  

For example: I have a blazor component that uses the state machine. Or, in this case, many tabs/windows in the users web browser have one backend session, and multiple component instances. I program against an interface, suppose I just want to use the StateMachine to send a message back to the server:

```cs
public interface IStateMachine
{
	void SendMessage(string message);
}
```

That is all I want to know. I do not want to tire my component (and brain) with all creation logic. Just inject the IStateMachine, and call the method.

So that is where the dependencies are. Wite the unit tests with bunit nd bob is your uncle!

## Resources

I used the pluralsight course on Desing patterns in C# by Keven Docx for some ideas. And I might have combined some stuff I read along the way, but nothing in particular. Just me and my brain. 