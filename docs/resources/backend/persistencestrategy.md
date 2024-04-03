# Persistence strategy - Resource

*18-7-2023*

Where to place responsibility for the mapping?

1. Make the Entity itself responsible for the mapping
2. Use a separate class to do the mapping.

## Active Record pattern

The object wraps a row in a database table or view.
It encapsulates database access
It adds business logic on that data.

In domain driven design (DDD) terms, the active record puts the persistence methods directly on the Entity object.

This is the Entity Framework way of working, the entities are wrapped and mapped to the tables in the database.
Mapping is the responsibility of the Entity.

The persistence model, persistence logic and business logic are tightly coupled.

### When to use?

- Applications with simple domain models
- Applications which are are CRUD-intensive. (create, read, update and delete).
- Applications where the domain model and persistence model are the same.

## Data Mapper pattern

Data is mapped using the adapter pattern. Loosely coupling the Persistence model from the Domain model.
Data is accessed through the repository pattern. Separating the concern of the persistence logic from the business
logic. Using interfaces for persistence loosely couples the business logic to the persistence logic.

### When to use?

- Complex domain logic
- Layered architecture and test driven design
- Iterative / incremental development

## Choosing an OR/M

Choose your Object Relational Mapper for the system you are modeling.
Data access is shaped by the needs of its consumers.

For example:

- Reporting application: Use SQL and datasets
- Data entry application: Active Record Tool (like Entity Framework)

