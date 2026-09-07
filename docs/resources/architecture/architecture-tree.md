# The tree of architecture knowledge

*31-8-2026*

## Enterprise architecture

- Enterprise
  - Business
  - Information
  - Software
    - Application
    - Infrastructure

Business is about the business processes, strategies and goals.
Information is about the information and services needed to support the business.
Software is about the applications supporting the business and information.

For example in city planning:
- Business is the city, the goals and the processes of the city.
- Information architecture: Healthcare, education, water, electricity, transport, garbage collection, etc.
- Software application: Hospitals, police, library, schools etc.
- Software Infrastructure: Roads, bridges, tunnels, electricity, water, sewage, harbour.

In architecture, there are similar roles.

- Enterprise architect
  - Solution architect
    - Application architect
    - Infrastructure architect

So, the enterprise architect knows about the business processes and information. This is the highest level.  
Solution architect knows how the different applications, and the infrastructure work together. Transforms business needs into an application landscape.
Application architect knows about styles and patterns to implement, and how to connect with other resources or applications. This is the lowest level.

The application architect and solution architect should be developers inside the teams to prevent ivory tower architects.

## Tree of architecture knowledge

It is more like a multidimensional venn-diagram, but I think a tree gives a better overview.

- [Architecture principles](architecture-principles.md)
- Find the correct architecture for your application or solution.
- [Application architecture >](application-architecture-tree.md) 
- Solution architecture
  - [Structural architecture](structural.md)
    - Client-Server
    - Peer-to-Peer
    - Monolith
      - Component-based
      - Layered
    - Serverless/FaaS
    - Distributed
      - Microservices
      - [Event-driven](eventdrivenarchitecture.md)
      - Service-oriented
      - Stream
  - Data management
    - CAP
    - ACID
    - Large dataset processing (Hadoop, Spark, MapReduce)
    - ETL, Datawarehouses
    - [Event sourcing](event-sourcing.md)
    - Database types
      - Relational
      - Key-Value
      - Column Family
      - Document
      - Graph
  - Integrations
    - API design and management [API](../backend/api.md)
    - Integration patterns
      - [Web API](../backend/standardswebapi.md)
        - [REST](../patterns/rest.md)
          - [HATEOS](../backend/hateos.md)
        - GraphQL
      - gRPC
      - Enterprise Service Bus
      - SOAP
      - Message Queue
      - BPM, BPEL
      - [Kafka](../backend/kafka.md)
      - [Azure service bus](../backend/azure-service-bus.md)
- Standards
- Documentation
  - Architecture Decision Records
  - Architecture diagrams
    - UML/PUML
    - C4-diagrams
  - Application architecture diagrams
  - Solution architecture diagrams
  - Infrastructure architecture diagrams
- Management
  - SaFE
  - LESS
  - Scrum
  - Kanban
- Networks
  - OSI, TCP, HTTP, HTTPS
  - [Internet](internet.md)
- Operations
  - Cloud providers
  - CI/CD: Continuous Integration - Continuous Deployment
  - Containers
- Tools for software development
  - DevOps Pipelines
  - Backlog/kanban/issue boards/lists
  - Team communication
  - Wiki/Documentation
  - Code Repositories
- Security
  - Identity and Access Management (IAM)
  - Network Security Architecture
  - Application Security Architecture
  


