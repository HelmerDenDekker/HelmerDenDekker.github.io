# Domain-driven design (DDD)
*19-6-2023 - updated 17-7-2023*

Domain-driven design is a term introduced by Eric Evans in his book "Domain-driven design" from 2003.

But wait, that was 20 years ago! I hear you say. Yes, it was!

## What can we learn from it?

These abstract ideas are still relevant today:

Strategic patterns
- Ubiquitous language: The structure and language used in the code matches the business domain
- Bounded context: the discription of the boundary in ehich a model is defined or applicable

Tactical patterns:
- Entity object
- Value object
- Aggregate and factory
- Domain service
- Application service
- Infrastructure service

![Domain-driven design](/assets/images/domaindrivendesign/domaindrivendesign.svg "Domain-driven design; strategic and tactical design patterns")

## Trade-off

### Why use it?

- Communication with the bussiness is easier
- Improves flexibility: The domain is decoupled from application services and infrastructure services
- Domain over (user) interface: The application is build around the domain, and will be likely to produce an application better representing the domain at hand compared to a UI/UX-first approach.

### Why leave it?

- Domain Expertise: It requires domain expert to be involved, and some time needs to be invested by the team to design.
- There is no domain: Say your domain has low complexity, or is not important. In that case, there is no need for domain-drive design.

About that last one: I have experienced people driving for DDD without a (complex) domain. There is no use solving a technical complex sequential protocol with DDD.

## Conclusion
It is usefull only for complex domains. If you have an easy domain, or simple procedural program, there is simply no need for DDD.

## Resources

[Domain Driven Design blog by Felipe de Freitas Batista](https://thedomaindrivendesign.io/)  
[Code Opinion](https://codeopinion.com/)  
Julie Lerman - The intersection of Microservices, domain-driven design and entity framework core  
Milan Jovanovic  
Amichai Mantinband