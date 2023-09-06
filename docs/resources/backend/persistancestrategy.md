# Persistance strategy - Resource
*18-7-2023*

Where to place responsibility for the mapping?
1. Make the Entity itself responsible for the mapping
2. Use a seperate class to do the mapping.


## Active Record pattern

The object wraps a row in a database table or view.
It encapsulates database access
It adds business logic on that data.

In domain driven design (DDD) terms, the active record puts the persistance methods directly on the Entity object.

This is the Entity Framework way of working, the entities are wrapped and mapped to the tables in the database.
Mapping is the responsibility of the Entity.

The persistance model, persistance logic and business logic are tightly coupled.

### When to use?
- Applications with simple domain models 
- Applications which are are CRUD-intensive. (create, read, update and delete).
- Applications where the domain model and persistance model are the same.


## Data Mapper pattern

Data is mapped using the adapter pattern. Loosely coupling the Persistance model from the Domain model.
Data is accessed through the repository pattern. Seperating the concern of the persistance logic from the business logic. Using interfaces for persistance loosely couples the business logic to the persistance logic.

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

