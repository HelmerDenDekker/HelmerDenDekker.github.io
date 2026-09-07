# Structural architecture

*7-9-2026*

## Structure of the solution

There are several ways to structure solution to tackle a business problem.
What solution to choose depends on the business requirements, and for example, what the developement team looks like. How is it organized.

The other way round: the project-structure can tell you some things about the organizational structure.

### 1. Monolith

One database, one (layered) project for all code.

Strong points:

- Performance (distance is low, classes in memory, so it is fast)
- Security (only one way in)
- Data management (low distance)
- Easy to follow the process (as in debug possibilities)
- Simple communication (query commands to DB with EF)

Weak points:

- Complexity (low distance means it can grow into a big ball of mud)
- Difficult to work on with multiple teams/people at the same time
- All or nothing scaling
- Integration of new technology stacks is almost impossible
- Testability, because of the complexity


### 2. Modular monolith

There is one application, with components that are layered by domain. These components can have layers by themselves (integration, presentation, persistence)

Strong points:

- Performance (distance is low, classes in memory, so it is fast)
- Security (only one way in)
- Data management (low distance)
- Easier to follow the process due to better compartmentalization. Distance is still low, so easy to debug.
- Simple communication (query commands to DB with EF)
- Loose coupling due to components.
- Easier to work on with multiple teams/people at the same time

Weak points:

- All or nothing scaling
- Integration of new technology stacks is almost impossible


### 3. Service oriented architecture

A service oriented architecture has a central Enterprise Service Bus, which sorta manages the process. There can be smaller apps or services tied to the ESB.

Strong points:

- Process is defined by ESB, so it is very easy to follow from an architectural view. Less easy to follow from a debug point of view.
- Scales individually
- Individual deployment of services
- Easy to add new technology stacks (ESB is tech-independent)
- Flexible

Weak points:

- Performance: ESB is bottleneck, service communication is slow.
- Security, large attack surface
- Complexity. Every service itself is less complex, but the process management is unclear due to ESB design.
- Managing Data: needs eventual consistency
- Teams need to be managed by a central architect

### 4. Microservices

A cloud of micro services which talk to eachother through REST API’s. Needs lots of work to mitigate the risks. Only use this when you need the advantages of a loosely coupled set of services (like Netflix)

Strong points:

- Very easy to work on with multiple agile teams at the same time
- Scales individually
- Individual deployment of services
- Easy to add new technology stacks (REST is tech-independent)
- Loose coupling
- Small domains => low complexity inside the service
- Flexible

Weak points:

- Performance: Communication between microservices is very slow compared to monolith.
- Security, large attack surface
- Complexity. Every service itself is less complex, but the communication between the services is hard to follow, and very hard to debug.
- Managing Data: needs eventual consistency
- Resilience
- Difficult or impossible to follow the process, for developers, but also for architects

### 5. Stream based architecture

This is a combination of Microservices, the Blackboard and the Event driven architectures. Microservices where REST-centric. Stream-based combines the MicroServices with a ServiceBus, which gives the possibility to process async with events, queues and topics. In the BlackBoard architecture, every component adds information to the central Blackboard, so they can work together to solve the problem at hand. These three combined form the stream-based architecture.

Use this when there is a continuous stream of information. For example car navigation, social networks, stock market, streams of purchases in a web shop, chat, hotel booking system, user interactions on a web application.

Strong points:

- Real time data handling
- Very easy to work on with multiple agile teams at the same time
- Scales individually
- Individual deployment of services
- Easy to add new technology stacks (tech-independent)
- Loose coupling
- Small domains => low complexity inside the service
- Flexible

Weak points:

- Performance: Communication between microservices/via servicebus is very slow compared to monolith.
- Security, large attack surface
- Complexity. Every service itself is less complex, but the communication between the services is hard to follow, and very hard to debug.
- Managing Data: needs eventual consistency
- Resilience
- Difficult or impossible to follow the process, for developers, but also for architects

## More

### Client-Server

In a Client-Server application, the client is decoupled from the server. This architecture is applied widely in web applications.  
For example, a part of the application runs in the browser, the other part on the server.  

There used to be this more clear separation, with a Vue-application as front-end, running in the browser, making API calls to the server. However, do not forget, this vue-application was also downloaded from a server to the clients browser.  
The border between client and server is fading in for example Blazor applications. For a newbe, it is less clear what happens in the browser, and what happens on the server exactly. A lot of communication between server and client is hidden away.  

In short: if you are a web developer, you are working in client-server applications all the time., maybe without you knowing.

### Serverless/FaaS

This is a special kind of Client-Server, where you minimize the amount of complexity back to one function. Consider these nano-services, where you split apart the micro-services into even smaller parts, doing only one thing.

Strong points:

- The possibility that two people work on the same function at once approaches zero.
- Scales per individual method (pay per use)
- Individual deployment of functionality
- Easy to add new technology stacks (REST is tech-independent)
- Loose coupling
- No domains. Code what you need only.
- Flexible
- Very agile.

Weak points:

- Performance: Every function call becomes a network call. It is VERY slow!
- Security, HUGE attack surface
- Complexity, death by a thousand function apps. 
- Managing Data: needs eventual consistency
- Resilience, if one app fails, the whole process fails
- Impossible to follow the process, for developers, but also for architects

### Peer-to-Peer

From one computer to another, without a central server.
[//]: # ( ToDo: Write!)



## *Outline*

## Resources
