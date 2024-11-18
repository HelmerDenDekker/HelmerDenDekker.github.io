# Problem types and patterns

*13-11-2024*

_Status: {Work in progress} {Idea}_  
_Type of post: {Opinion piece} {Guide} {Resource}_

## *Rapid fire thoughts*

What problems do we face?

- Saving stuff (crud = IO) => Repository & use async for freeing up threads
- Validation (data integrity) => Validator pattern (Data annotations)
- Filtering (data retrieval) => Specification pattern (weird AI did that). I meant to say LINQ
- Logging (debugging) and monitoring => 


Advanced solutions:

### Creational patterns

#### Singleton pattern  

- When you want to ensure a class has only one instance.

For example by making create method (static) and make the contructor private. Makes testing difficult.

#### Factory pattern
- When a class can't anticipate the class of objects it must create.
- When a class want its subclasses to specify the objects it creates.
- When classes delegate responsibility to one of several helper subclasses, and you want to localize the knowledge of which helper subclass is the delegate.
- Enable reusage of existing objects.

#### Builder pattern  

Is an advanced (abstract) factory.  

Building a database query.
Construct a UI or Form.
Use it for validation rules

#### Prototype pattern

When you want to create a new object by copying an existing object.

### Structural patterns

#### Adapter pattern

When you want to make two incompatible interfaces compatible.

#### Bridge pattern

When you want to separate abstraction from implementation.

#### Composite pattern

To compose objects into tree structures to represent part-whole hierarchies. Lets clients treat individual objects and compositions of objects uniformly.

#### Decorator pattern

When you want to add new functionality to an object without altering its structure.

#### Facade pattern

When you want to provide a simple interface to a complex subsystem.

#### Flyweight pattern

When you want to use sharing to support large numbers of fine-grained objects efficiently.

#### Proxy pattern

When you want to control access to an object.

### Behavioral patterns

#### Template method pattern

When you want to define the skeleton of an algorithm in a method, deferring some steps to subclasses.

#### Strategy pattern

Use can choose algorithm 




[//]: # ( ToDo: Write!)

## *Outline*

## Resources
