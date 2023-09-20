# Event driven architecture
*18-9-2023*

Status: Work in progress

## DDD - EDA
### Messages

Messages -> events & commands

### Event

Publish - subscribe

Producer publishes
Consumers react
Always in past tense!

### Commands

Actions
For example: Place an order

### Policy

Policy: whenever ....
So, whenever a client orders a taco, we send him an email



## Benefits

- Loose coupling (using broker)
- Encapsulation (Domain driven design)
- Speed (optimized for being as fast as possible)
- Scalability (You can scale independently)

## Disadvantages

- Steep learning curve
- No single source of truth, eventual consistency
- Complexity (distributed services)
- Loss of transactionality (It is impossible to rollback with eventual consistency)
- Lineage ()


## Typical architecture as was

Data driven, database-first.

## Now EDA

Revolves around events
