# Strategy pattern in dotNET

*13-11-2024*

_Status: Idea_  
_Type of post:Guide_

## *Rapid fire thoughts*


## *Outline*

Benefits of the strategy pattern
- Offers an alternative to subclassing
- New strategies can be added without changing the context
- Eliminates conditional statements (death by a thousand ifs)
- Composition over inheritance

Drawbacks of the strategy pattern
- Clients must be aware of the strategies
- Overhead in communication between the context and the strategy

Only use it for scenarios:
- where you have multiple algorithms that can be used interchangeably.
- These algorithms can be selected at runtime.
- The client should be able to choose the algorithm.

THIS IS KEY! The client should be able to choose the algorithm. For example, the payment method of choice. The shipping method of choice.

## Strategy pattern

The strategy pattern is a behavioural design pattern that enables selecting an algorithm at runtime.

### Example storing data

Say, you need to save some data.

Suppose the product-owner wants the user to choose whether to save the data to a database, or a file or a Blob.  

The strategy pattern is a good fit for this.

#### The interface

The interface defines the contract for the strategy.

```csharp
public interface IStorageStrategy
{
	void Save(MyObject data);
}
```

#### Concrete implementations

There are three concrete implementations of the `IStorageStrategy` interface.

```csharp
public class DatabaseStorageStrategy : IStorageStrategy
{
	public void Save(MyObject data)
	{
		// Save to database
	}
}
```

```csharp
public class FileStorageStrategy : IStorageStrategy
{
	public void Save(MyObject data)
	{
		// Save to file
	}
}
```

```csharp
public class BlobStorageStrategy : IStorageStrategy
{
	public void Save(MyObject data)
	{
		// Save to blob
	}
}
```

#### The MyObject class

The `MyObject` class has a property of type `IStorageStrategy`.

```csharp
public class MyObject
{
	public string Name { get; set; }
	public string Description { get; set; }
    
    // The storage strategy, set externally so it can be null
    public IStorageStrategy? StorageStrategy { get; set; }
    
    public MyObject(string name, string description)
	{
		Name = name;
		Description = description;
	}
    
    // Save the object implementation
	public void Save()
	{
		StorageStrategy?.Save(this);
	}
}
```

#### Usage

Orchestration is done by the Service layer pattern. 

```csharp
public class MyObjectService
{
	public void Save()
	{
        var myObject = new MyObject("My object", "My description");
        myObject.StorageStrategy = new DatabaseStorageStrategy();
		myObject.Save();
        
        myObject.StorageStrategy = new FileStorageStrategy();
        myObject.Save();
	}
}
```

This is cutting a lot of corners. This is not really what strategy pattern is about, because in this case we as developer choose the strategy. Key of the strategy pattern is the client having the choice.

### Variation by Helmer, using Dependency Injection

just my thoughts about the subject.

Introducing a type, for the client to choose from, a StorageEnum

```csharp
public enum StorageEnum
{
	Database,
	File,
	Blob
}
```

#### The MyObject class

The `MyObject` class has a property of type `StorageEnum`.

```csharp
public class MyObject
{
	public string Name { get; set; }
	public string Description { get; set; }
    public StorageEnum StorageType { get; set; }
    
    public MyObject(string name, string description, StorageEnum storageEnum)
	{
		Name = name;
		Description = description;
        StorageType = storageEnum;
	}
}
```

#### The interface

Also, the strategy should be aware of the type.

```csharp
public interface IStorageStrategy
{
		void Save(MyObject data);
    	StorageEnum Type { get; }
}
```

#### Usage

You need to know at this point the strategy the user wants to use in order to inject the right strategy.

Factory pattern is a good fit for this: (or is it overkill?)

```csharp
public class StorageStrategyFactory : IStorageStrategyFactory
{
    public StorageStrategyFactory(IEnumerable<IStorageStrategy> strategies)
	{
		_strategies = strategies;
	}
    
	public IStorageStrategy GetStorageStrategy(StorageEnum type)
	{
		return _strategies.FirstOrDefault(s => s.Type == type);
	}
}

```


Orchestration is done by the Service layer pattern.

```csharp
public class MyObjectService : IMyObjectService
{
    private readonly IStorageStrategyFactory _storageStrategyFactory;
    
    public MyObjectService(IStorageStrategyFactory storageStrategyFactory)
	{
		_storageStrategyFactory = storageStrategyFactory;
	}
    
	public void Save()
	{
        var myObject = new MyObject("My object", "My description", StorageEnum.File);
        var storageStrategy = _storageStrategyFactory.GetStorageStrategy(myObject.StorageType);
	    storageStrategy.Save(myObject)
	}
}
```


Something like that should work. I guess.

## Resources

[Kevin Docx, C# design patterns, pluralsight ](https://app.pluralsight.com/ilx/video-courses/8b818464-7d56-4f32-a307-04c7049540e1/ed810986-dc27-48ec-b386-efd773bcb6b5/e0a469f0-ed1c-43ac-8ed4-82724f5070bf)  
[Strategy pattern on Refactoring.Guru](https://refactoring.guru/design-patterns/strategy)  