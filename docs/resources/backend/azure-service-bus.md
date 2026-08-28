# Azure Service Bus

*25-8-2026*

_Status: {Work in progress} {Idea}_  
_Type of post: {Opinion piece} {Guide} {Resource}_

## *Rapid fire thoughts*

[//]: # ( ToDo: Write!)

- Problem statement
- Boundary conditions
- Solution

## Commands versus events

Command: only once.
Events: can subscribe to.

## Queues and topics

A queue is for point-to-point communication. A queue is a temporary storage for messages that are waiting to be processed. 
The idea of a queue is that one message is sent by one producer, and one consumer consumes it and handles completion.
A message is sent to a queue by a producer and received from a queue by a consumer. A message is removed from the queue when it is received by a consumer.
A topic is for publish-subscribe communication. A topic is a temporary storage for messages that are waiting to be processed. A topic can have multiple producers and multiple consumers.

smart endpoints and dumb pipes: Use the broker for reliable transport and broad routing, but handle complex decision logic within the consuming service.

## *Outline*

## Resources

[Asynchronous messaging options](https://learn.microsoft.com/en-us/azure/architecture/guide/technology-choices/messaging)
