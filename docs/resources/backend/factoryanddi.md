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

## Context: 

### Problem domain

- The application uses Blazor as a front-end.
- The user has one "session", the app should show this one state, regardless the number of (Blazor) connections for this user.
- The state needs to be persisted. If the hosted application is restarted, the state should be restored.
- It sends data to an API asynchronously.

The user can have multiple tabs in the browser. All these tabs should show the same data.

### Questions

- How to identify the user.
- Where to store state information?

#### How to identify the user

By using the localstorage. Using the ProtectedLocalStorage from Blazor. Store a unique identifier in the localstorage. This identifier is used to uniquely identitfy the user. 

Benefits:
- Blazor package, no need to write my own code. (Which is simple javascript, but still)

Drawbacks:
- Access to localstorage is slow.
- The key to encrypt the data in localstorage revolves whenever the application is restarted, which is safe, but that means I can no longer reload state data. So I need to write my iwn key-revolving logic in C#.

Possible alternatives:
- Url-query with unique identifier. It is not possible to share the same url between tabs. Also less secure. Copying an url is easier than copying a localstorage key for most folks.
- HTTP Cookies, can be shared between tabs. This is the same idea as localstorage, but it is stored as cookie in your hard drive instead of the browsers storage.
- Session storage. Session storage is not shared between tabs.


#### Context: Where to store state information?

##### Alternative 1: Cookies

Cookies. They were invented for this purpose in 1994. Right? But they can store only small amounts of data. And often blocked by users as they are used to infringe privacy.


##### Alternative 2: Localstorage

You can store up to 5MB in the localstorage. This is more than enough for my purposes.
The data is stored in the browser, and is not sent to the server. This is a good thing, as I do not want to send the state data to the server. The server should be stateless.

However, the access to the localstorage is slow. Slower than the rate of changes in my application. Also the application back-end has state information, which is also dependent on the users state. 

##### Persist state on the server

As stated, the server should be stateless.
I need:
- Consistency. The state should be the same for all connections of one user. Every read receives the most recent write.
- There are multiple connections for one user to the front-end.
- There are multiple connections for one user from the back-end to other apps.

The state can change through actions by the user, or the state can change through events/instructions received by the back-end.

As stored in memory:
- There can be only one instance of the app (singleton) per user.
- The state is stored in memory. This is fast.
- The state is lost when the app is restarted. A fallback mechanism is needed to restore the state.

A database of file storage is too slow.

### Context: Solution

In comes the state machine.
This is a class keeping the state of the application.
On any state, behaviour can be different.

For example: For your computer, if you press the on/off button:
- If the computer is on, it will shut down.
- If the computer is off, it will start up.

The same button has different behaviour depending on the state of the computer.

In this case, as an example: The user can send messages if the back-end system can receive them.

There needs to be only one state (machine) per user.
The StateMachines are stored in a StateMachineStorage singleton.
The StateMachines are stored in a ConcurrentDictionary. It is possible to have access to this list from multiple threads. 

### Creating only one instance of the StateMachine per user

For the StateMachine itself there should only be one instance (per user).

I need a creational design pattern for this, like the singleton pattern: 

```cs
public class StateMachine : IStateMachine
{
    private StateMachine()
	{
		// It is impossible to create instances of this class, only through the Instance() method.
	}
    
    
	public static StateMachine Instance()
	{
        get{
			if(_instance == null)
			{
				_instance = new StateMachine();
			}
			return _instance;
		}
	}
}

```

The constructor is private, so it is not possible to create new instances.
- This makes it impossible to mock the class, and difficult to unit test as dependencies cannot be injected.
- The StateMachine is now a singleton, and there can be only one instance period. We need one instance per user.

#### Factory pattern

The solution for this is to use a factory pattern. The factory pattern is a creational pattern, and it is used to create objects. The factory pattern is used to create objects without exposing the creation logic to the client and refer to the newly created object using a common interface. The factory takes care that only one instance of the StateMachine is created.

The factory interface, for dependency injection and testability:
```cs
public interface IStateMachineFactory
{    
	StateMachine CreateStateMachine(Guid userId);
}
````

The factory implementation:
```cs
public class StateMachineFactory: IStateMachineFactory
{    
    private IStateMachineStorage _stateMachineStorage
	
    public StateMachineFactory(IStateMachineStorage stateMachineStorage, IDependency dependency, ITranslationProvider translationProvider)
    {
        _stateMachineStorage = stateMachineStorage;
    }
	
    public StateMachine CreateStateMachine(Guid userId){
        if(_stateMachineStorage.FindById(userId) != null)
        {
            return _stateMachineStorage.GetMachine(userId);
        }
		
        var stateMachine = StateMachineInitializeStateMachine(dependency, translationProvider);
        _stateMachineStorage.Add(userId, stateMachine);
        return stateMachine;
    }    
}
````

The state machine:

```cs
public class StateMachine : IStateMachine
{
    private bool _isRunning;
    private IDependency _dependency;
    private ITranslationProvider _translationProvider;
    
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