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

## Strategy pattern

The strategy pattern is a behavioural design pattern that enables selecting an algorithm at runtime.

### Example storing data

Say, you need to save some data.

Suppose the product-owner wants you to save the data in a database, and/or a file and/or a Blob.  

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

This is cutting a lot of corners.

### Variation

#### The MyObject class

The `MyObject` class has a property of type `IStorageStrategy`.

```csharp
public class MyObject
{
	public string Name { get; set; }
	public string Description { get; set; }
    
    public MyObject(string name, string description)
	{
		Name = name;
		Description = description;
	}
    
    // Save the object implementation
	public void Save(IStorageStrategy storageStrategy)
	{
        // Add null check
		storageStrategy.Save(this);
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
        
		myObject.Save(new DatabaseStorageStrategy());
        
        myObject.Save(new FileStorageStrategy());
	}
}
```
Newing up is not done. I would much rather inject the strategy in the constructor.

### Use Dependency Injection

.



```csharp
public class MyObjectService
{
	private readonly IStorageStrategy _storageStrategy;
	
	public MyObjectService(IStorageStrategy storageStrategy)
	{
		_storageStrategy = storageStrategy;
	}
	
	public void Save()
	{
		var myObject = new MyObject("My object", "My description");
		
		myObject.Save(_storageStrategy);
	}
}
```

## Resources

[Kevin Docx, C# design patterns, pluralsight ](https://app.pluralsight.com/ilx/video-courses/8b818464-7d56-4f32-a307-04c7049540e1/ed810986-dc27-48ec-b386-efd773bcb6b5/e0a469f0-ed1c-43ac-8ed4-82724f5070bf)  
[Strategy pattern on Refactoring.Guru](https://refactoring.guru/design-patterns/strategy)  