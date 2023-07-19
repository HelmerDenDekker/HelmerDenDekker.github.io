# 2 Domain-driven design: Implementation in code
*17-7-2023*

Status: Work in progress

## Architectural layers

In Domain-driven design there are five layers (in general). In my implementation there are four, because I integrated the integration layer with the persistance layer.

![Domain-driven design: Architectural layers](/assets/images/domaindrivendesign/domaindrivendesignlayers.svg "Domain-driven design; Architectural layers")

The layers in the application are isolated from eachother. 



### Domain layer

The Domain layer is for the Domain model. It contains the business logic.

![Domain-driven design: Model](/assets/images/domaindrivendesign/domaindrivendesignmodel.svg "Domain-driven design; Model")

- Persistance ignorance principle
- Infrastructure ignorance principle
- No dependencies
- Contains business rules

The domain model is instantiated through the [factory pattern](https://refactoring.guru/design-patterns/factory-method). During creation you (may) have business rules to be kicked off while creating a new object, so this makes sense.

For accessing the repository pattern is suggested in the original book, for object management and persistance. Which I guess is okay if we are talking mid- and end of lifecycle. However this is clashing with the persistance ignorance. 
What is the design goal? I want the business logic to be kicked off on an accesible object. So I do want an access mechanism. However, I want it to be persistance ignorant, since it could come from DB, from cach, service or file, or wherever, I do not care for that as long as the business logic works.


NB This is based on graph theory (object oriented programming)

### Presentation layer

The Presentation layer is for the users. So it should only expose user-relevant stuff.
It should contain logic and validation using the [Chain of responsibility pattern](https://refactoring.guru/design-patterns/chain-of-responsibility), also known as pipe and filter. This can contain basic validation (is the date entered as the correct type, are there required values which are empty).

The Controllers no longer are following the controller (mediator) pattern, but are just one-on-one sending to the application layer, which acts as a mediator.

### Application layer

The Application layer connects the different layers with eachother. It is an orchestration layer, so this contains task coordination logic.
Should be thin.
Preferable stateless. If it has state, this state is reflecting the progress of task coordination.

Use Service-Interface and DTO as a [Mediator pattern](https://refactoring.guru/design-patterns/mediator) to expose as an interface to the Presentation layer.
Use [adapter patter](https://refactoring.guru/design-patterns/adapter) to be able to use the Domain and Data Access interfaces.

### Infrastructure layer

The Infrastructure layer is for persistance of data and integration to other services.

#### Persistance layer

Data access.

https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/infrastructure-persistence-layer-design

#### Integration layer

Plumbing, like logging, messaging, SOAP, REST, File Access









