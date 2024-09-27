# Factory and dependency injection

*24-9-2024*

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
    
    private StateMachine(IDependency dependency, ITranslationProvider translationProvider)
	{
		_dependency = dependency;
        _translationProvider = translationProvider;
	}
    
    public void SendMessage(string message)
	{
		// Do stuff
	}
    
	internal static StateMachine InitializeStateMachine(IDependency dependency, ITranslationProvider translationProvider)
	{
		return new StateMachine(dependency);
	}
    
    internal string Translate(string key)
	{
		return _translationProvider.Translate(key);
	}

}
```

```cs
public class StateMachineFactory : IStateMachineFactory
{
	private IDependency _dependency;
	private IStateStore _stateStore;
	
	public StateMachineFactory(IDependency dependency, IStateStore store, ITranslationProvider translationProvider)
	
	{
		_dependency = dependency;
		_stateStore = stateStore;
        _translationProvider = translationProvider;
	}
	
	public StateMachine CreateStateMachine()
	{
		if(_stateStore.Get("sessionId") != null)
		{
			return _stateStore.Get("sessionId");
		}

		return StateMachine.InitializeStateMachine(_dependency, _translationProvider);
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

So that is where the dependencies are. Write the unit tests with bunit and bob is your uncle!

## About the states themselves and unit testing

The states have a dependency on the StateMachine. These states need access to shared internals.

Is that a good idea?

For example, in active state I want a translated welcome message sent. 
I COULD introduce a new interface, but interfaces are public, and the methods like translate are not meant to be public.

This causes a problem when I want to unit test states. I cannot mock the state machine as it is not an interface.

[//]: # ( ToDo: How to unit test states? States should be unit tested, they contain the logic!)

```cs
public class ActiveState : StateBase
{
	public override void EnterState(StateMachine stateMachine)
	{
		// Do stuff like:
        stateMachine.State = State.Active;
        stateMachine.Running = true;
        var welcomeMessage = stateMachine.Translate("Welcome");
        stateMachine.SendMessage(welcomeMessage);
	}
}

```


```cs
public class StateBase
{
	public abstract void Dispose();
    
    public abstract void EnterState(StateMachine stateMachine);
    
}
```


## Resources

I used the pluralsight course on Desing patterns in C# by Keven Docx for some ideas. And I might have combined some stuff I read along the way, but nothing in particular. Just me and my brain. 