# Architecture principles

*31-8-2026*

A summary of the most important principles of software architecture.

## 1. The trade-off

Every decision has advantages and disadvantages.  
There is no silver bullet.  
Architecture is never perfect.

It is all about trade-offs, the answer is always: "It depends".

## 2. Quality attributes

In my opinion the most important quality attributes are:

1. Keep it simple
2. Business domain-based 

Furthermore:

3. Composable (plays well with others)
4. Unix philosophy (does one thing, and does it well)
5. Predictable (does what you expect)
6. Idiomatic (feels natural)

I think SOLID principles are old-fashioned. They are guidelines based on past experiences.  
We need a new set for the future, like CUPID.  
Somthing like: never mix infrastructural code with business code.

## Quality attributes backstory

In the Vijfhart course on architecture, I learned these quality attributes.

The utmost important quality attributes are:

1. Keep it simple
2. Loose coupling
3. Separation of concern

Furthermore:

4. Keep it flexible
5. Information hiding
6. Modularity
7. Open/closed principle

These qualities follow from the SOLID principles. These are a set of guidelines based on the experiences of software developers in the nineties.

### SOLID

The SOLID principles are a set of design principles that help software developers create maintainable and scalable software systems. They are:

- Single Responsibility Principle (SRP): A class should have only one reason to change, meaning it should have only one responsibility or job.
- Open/Closed Principle (OCP): Software entities (classes, modules, functions, etc.) should be open for extension but closed for modification.
- Liskov Substitution Principle (LSP): Objects of a superclass should be replaceable with objects of a subclass without affecting the correctness of the program.
- Interface Segregation Principle (ISP): Clients should not be forced to depend on interfaces they do not use.
- Dependency Inversion Principle (DIP): High-level modules should not depend on low-level modules. Both should depend on abstractions.

The SOLID principles are tied to object-oriented programming.  
What if I want to choose another programming paradigm, like functional programming? These rules should still apply?

### Cupid is the new SOLID

As Dan North is quoted: "Everything you know about SOLID is wrong."

He proposed a new set of principles called CUPID, which stands for:

- Composable - plays well with others
- Unix philosophy - does one thing, and does it well
- Predictable - does what you expect
- Idiomatic - feels natural
- Domain-based - in language and structure

## Related
- [architecture-tree.md](../architecture-tree.md)
- [software-quality.md](../other/software-quality.md)
- [composition-over-inheritance.md](composition-over-inheritance.md)