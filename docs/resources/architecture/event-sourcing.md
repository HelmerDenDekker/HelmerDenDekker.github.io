# Event sourcing with dotnet

*2-9-2026*

Status: Work in progress  
_Type of post: {Opinion piece} {Guide} {Resource}_

## *Rapid fire thoughts*

[//]: # ( ToDo: Write!)

## Problem statement

CRUD Data management stores the current state of the data. There is always one source of truth.

IF you need versioning, you CAN add a version colum or audit trail.

However, thinking about Content Management, versioning is much more complex.
- Content-versions: One "object" can have multiple versions for multiple users and languages.
- Template-versions: The template of the object can have multiple versions.
- One object can be in different states (for different users, languages, and templates). Published, draft, in review, ready for publish, to be published at a certain date, archived.

It is possible to handle this with CRUD, but there are many infliction-points:
- How to handle concurrent changes on the same object?
- How to handle concurrent changes on the same template? (if users are allowed to change them)
- How to handle concurrent changes on the same object, but with different templates?
- How to merge the different versions of the same content object?
- How to merge from old-template content to new template-content? This is complex.

## Event sourcing

With event sourcing, only the actions taken on the object are stored.  
So, in fact, the current state of the object is derived by replaying the events. In complex systems, this can improve audibility and write performance.

Take notice that when choosing for event sourcing, it is very difficult to change the architecture later on. 

When to use event sourcing:
- Your data is actually a stream of events.
- You need to be able to move through the changes easily to roll back of forward and take snapshots.
- You need a complete audit trail of all changes.
- You run into write-performance concurrency issues with CRUD, because of high load.

The write-concurrency problems can also be caused by bad architecture. For example, keeping DB-connections open for a long time before storing. If that is the case, please fix that first before considering event sourcing.

Advantages of event sourcing:
- audit trail
- events map better to the business domain than object-oriented programming / CRUD
- extensibility and flexibility due to decoupling of actions and state. Change is easy.

Disadvantages of event sourcing:
- Load. Because any change in the UI can be an event, the application handles a lot of events, and writes to the database instead of handling one object. Also replaying the events is computation-heavy.
- eventual consistency, there is no consistent state. But yeah, you use event sourcing, because you don't want a consistent state, right?
- Logic can be difficult to follow.
  - circular logic. Having events spawning from events can create circular logic, leading to infinite loops.
- Personal data and regulatory compliance. Because all events are part of this stream, it is very difficult to remove if not designed carefully.  


## *Outline*

## Resources

[Event Sourcing pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/event-sourcing)