# Application Design Principles

*31-8-2026*

Status: Work in progress
Type of post: Resource

## How do we design our code?

Most of the time, we just start, don't we? And see where we end up? That is agile, isn't it.

I think we can do better. There are these code design guidelines, and most of them are there as a result of long hours of frustration while refactoring code.

And these are the guidelines we use. It is a bit like taking all the books describing the law, and saying: can't do that!
These books are there for judgment, not for guidance.

I think the rules below are guidelines for judgment. Heck, one of them is even called "law of..."!.

So first off: Do not use the guidelines as dogma. They are guidelines, not rules!

Always think about what the most important qualities of the software are.

## The guidelines one-by-one

These guidelines have these cool names, some of them are one guideline, some are a set:

- SOLID
- Cupid
- DRY
- YAGNI
- Law of Demeter
- Tell, Don't Ask
- Hollywood Principle
- Composition over inheritance
- Encapsulate What Varies
- Program against abstractions, not implementations.

### SOLID

SOLID is an old paradigm regarding object-oriented programming.  

- Single Responsibility Principle (SRP): A class should have only one reason to change, meaning it should have only one responsibility or job.
- Open/Closed Principle (OCP): Software entities (classes, modules, functions, etc.) should be open for extension but closed for modification.
- Liskov Substitution Principle (LSP): Objects of a superclass should be replaceable with objects of a subclass without affecting the correctness of the program.
- Interface Segregation Principle (ISP): Clients should not be forced to depend on interfaces they do not use.
- Dependency Inversion Principle (DIP): High-level modules should not depend on low-level modules. Both should depend on abstractions.

Use it when you are object-oriented programming.
Otherwise, think Cupid.

### Cupid

As Dan North is quoted: "Everything you know about SOLID is wrong."

He proposed a new set of principles called CUPID, which stands for:

- Composable - plays well with others
- Unix philosophy - does one thing, and does it well
- Predictable - does what you expect
- Idiomatic - feels natural
- Domain-based - in language and structure

### DRY

Don't Repeat Yourself!

I think this one is really old. There is no problem in repeating yourself.  
Making code repeatable creates complexity and makes it hard to change, or add to.

There is a reason for CTRL+C and CTRL+V.

That said, there is a point when repeating yourself will hurt maintainability.

So, before you shout DRY to a colleague, think hard about the software requirements. Is maintainability more important than other qualities of the software? do risk storming, what qualities are destroyed by not repeating ourselves?

For Microservices, Domain-driven-design or serverless:
DO REPEAT YOURSELF!  
It is better to repeat yourself than to create a dependency between services. This will create coupling and destroy the qualities of the software (being independently deployable).

### YAGNI

You ain't gonna need it!

So not prepare for eventual future requirements. Remember Cupid! Code should be composable. So if you need to add something in the future, it should be easy to add.

This is more of a rule than a guideline. Keep it simple.

### Law of Demeter

Principle of Least Knowledge

- Avoid chaining calls deep into the internals of other objects.
- Restrict communication to objects you directly manage

Reduce coupling between components and increase maintainability.
Move behaviour into the object itself.

This is more of a rule than a guideline. Keep it simple. Hide information you do not need.


### Tell, Don't Ask

Object should be told what to do rather than being queried for their state and having decisions made externally.
- Objects should be responsible for their own logic and state management
- Instead of pulling data out of objects to make decisions, push the behavior into the object itself.

This is like Law of Demeter, but more about the behaviour of the object.

### Hollywood Principle

"Don't call us, we'll call you."

This is the inversion of control-idea. High-level components control lower level components. Not the other way around. Increases decoupling and testability.

### Composition over inheritance

This means: prefer composition over inheritance.
I wrote a blog about this: [Composition over inheritance](composition-over-inheritance.md)

The take-away is that:  

Inheritance:
About the modelling of the object itself, answers the question: "What is it?"
- Makes for reusable classes and reusable code.
- Causes death by brain explosion when you are trying to comprehend the inheritance tree. 
- If reusability becomes leading, the classes become very complex.
- Where does this behaviour come from?

Composition:
About the modelling of the behaviour of the object, answers the question: "What does it do?"
- Makes for reusable behaviour.
- Leads to simpler classes, easier to understand and maintain.
- Leads to death by a thousand interfaces, but that is easier to understand than inherited classes.

I do not think this is a rule you should follow. I hope it is clear that "it depends" for this case.
Only use one of both when maintainability and reusability is important. In most cases business logic is unique and subject to individual change. In that case, stay away from both.

### Encapsulate What Varies

Another design guideline.  
This suggests to encapsulate the parts of your code that are likely to change, and keep them separate from the parts that are stable. This helps to reduce the impact of changes and makes the code easier to maintain.  

In my opinion: ARGHHHH! How does this make things easier to understand?

And this is in direct violation of the YAGNI principle, as well as the law of Demeter and Tell, Don't Ask.

I think what was meant is: Keep business logic apart from framework logic. That makes sense. 

### Program against abstractions, not implementations.

This makes sense. So use interfaces to abstract implementations. Hide information we do not need to know.  

Makes testing easier, as we can mock the implementation.

Design your interfaces carefully.

## Real guidelines.

So, what are the guidelines I use?  
Personally, I like Cupid. However, it always depends!

Before I start coding:

### Find the context
First of all, I want to know the context.
- Find business requirements.
  - Like what users will use it?
  - What problem does it solve?
- Find the business language, what words do they use to describe the business?
- Where does it live in the business world? What is the context?
- What qualities does the software need to solve this problem? Like, performance, availability, scalability etc.

This is the context: the users, the problem and integration with other systems.

### Find components

Next step is to see if we need to make it even simpler:
- For more complex processes or logic, find common components. Like objects in the business that always change together. Domain driven design can help here.
- Keep it simple. Go for the simplest, leanest components.
- Hide as much information as possible from the outside world. Expose only behaviour the user can interact with.



### Refactor often

Business needs change. 
Make sure your code is easy to change.
Do not care about future requirements. Composable code is easy to change.

  


## Resources
[Software Design & Architecture Roadmap](https://roadmap.sh/software-design-architecture)