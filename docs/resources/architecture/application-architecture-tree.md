# The tree of application architecture

*31-8-2026*

This is about application architecture, the design of software applications.

Back to [the architecture tree for a full overview](architecture-tree.md)

- [Design principles](application-design-principles.md)
  - YAGNI
  - SOLID
  - DRY
  - CUPID
  - Hollywood principle
  - Law of Demeter
  - Tell, don't ask
  - Composition over inheritance
  - Encapsulate what varies
  - Program against abstractions, not implementations
- Programming paradigms
  - Structured programming
  - Procedural programming
  - Object-oriented programming
  - [Reactive programming](../patterns/reactiveprogamming.md)
    - [ReactiveX](reactivex.md)
  - Functional programming
  - Test-driven design
  - Domain-driven design
- Architectural
  - Patterns (a pattern belongs to a certain style determined by the solution architect)
    - Vertical Slice
    - Horizontal Slice
    - MVVM
    - MVC
    - MVU
    - MVP
    - A-frame
    - Actors
    - Microkernel
    - Blackboard
    - Serverless
    - Microservice
    - Web API
    - SPA
    - Service-oriented
    - Event sourcing
  - Principles (like DDD)
    - Component principles
    - Policy versus detail
    - coupling and cohesion
    - Boundaries
- Design Patterns
  - [Gang of four (GoF) patterns](gang-of-four-design-patterns.md)
    - Creational
      - Factory Method
      - Abstract Factory
      - Builder
      - Prototype
      - Singleton
    - Structural
      - [Adapter](../patterns/adapter.md)
      - [Bridge](../patterns/bridge.md)
      - Composite
      - Decorator
      - Facade
      - Flyweight
      - Proxy
    - Behavioral
      - [Chain of Responsibility](../patterns/chain-of-responsibility.md)
      - Command
      - Iterator
      - Mediator
      - Memento
      - Observer
      - [State](../patterns/statepattern.md)
      - [Strategy](../patterns/strategy.md)
      - Template Method
      - Visitor
  - POSA patterns (Pattern-Oriented Software Architecture)
    - Partitioning 
    - Placement
    - Routing
    - Federation
  - Other
    - Specification pattern (DDD)
    - CQRS (Command Query Responsibility Segregation)
    - Null Object pattern
    - [Repository pattern](../patterns/repository.md)
    - Unit of Work pattern
    - Data Transfer Objects
    - Identity maps
    - [Active Record pattern versus Data Mapper pattern](../patterns/persistencestrategy.md)
    - [Flux pattern for Blazor](../blazor/fluxor-pattern-for-blazor.md)
    - [Actor pattern for Blazor](../blazor/actor-pattern-for-blazor.md)
- Clean Code
  - Organize code by the actor/domain it belongs to.
  - CQS: Command Query Separation
  - Create abstractions carefully.


