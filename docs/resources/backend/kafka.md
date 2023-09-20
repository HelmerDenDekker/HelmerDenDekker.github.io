# Kafka
*19-9-2023*

Status: Work in progress

## Architecture

In a publish-subscribe pattern, the consumer posts the message to message middleware. The messaging middleware stores the message. The consumer has a subscription on certain messages, and receives these messages from the messaging middleware.

This is analogue to you posting a message on the message board in the supermarket "Looking for a housekeeper". The consumers in the supermarket can look at the board. Someone may be looking for a second hand bike, and not react. A person doing housekeeping and looking for a job might react to your post. You did an async fire and forget (by sticking the post-it on the supermarket board). The supermarket board acts as a buffer, storing your message. In this case, the consumer has to actively look at the board for your message, and in messaging systems you can get a notification.

![Publish-subscribe pattern](/assets/images/kafka/messaging.svg "Publish-subscribe pattern")

### Benefits
- Asynchronous Fire and forget(loose coupling in time)
- Buffer, durable storage of messages

### Disadvantages
- Middleware needs to be maintained

### Messaging middleware

Several messaging middlewares:
- Apache kafka
- RabbitMQ
- ActiveMQ
- Mediatr (Is in fact a in-memory-queue, isn't it? correct me if I am wrong.)

MQ stands for message queue.

Problems:
- High volume of messages by all of the applications
- Large messages
- Single server (broker) for the messaging middleware
- Consumer down or slow
- Not fault tolerant

#### Consumer down or slow
The middleware needs to store the messages if the consumer is down or slow. This may cause the message broker to fail.
In the case of Mediatr, you will run out of memory.

#### Not fault tolerant
The middleware needs to store the messages. If it does not store the message, and the message is handled incorrectly, the message is gone from the middleware.

### Kafka

In comes Kafka, created by LinkedIn around 2010 to handle all messaging in the LinkedIn applications/

- Reliable (Fault tolerant)
- Fast
- Autonomous
- High throughput
- Distributed
- Scalable

Kafka is a high throughput distributed streaming platform.

It can handle high throughput.

- Publish/Subscribe pattern for messaging
- Distributed storage (store data in fault tolerant, durable way)
- Data processing, process events as they occur (event sourcing / event handling)

It is more than a messaging system.

![Publish-subscribe pattern for kafka](/assets/images/kafka/kafka.svg "Publish-subscribe pattern for kafka")

The Kafka middleware runs on a broker.
Kafka stores the messages, so it is fault-tolerant. However, what if the server breaks down, goes offline or becomes too busy. In order to guarantee 100% uptime multiple brokers on different servers are used in a cluster. 
Zookeeper manages the cluster so the consumer knows where to post.  

#### Point-to-point versus PubSub

If there is one producer and one consumer, you have the point-to-point pattern. 

If there are multiple consumers, there is publish-subscribe.


## How to start a Kafka project in C#



[Kafka quickstart](https://kafka.apache.org/quickstart)



## Resources

[Kafka apache website](https://kafka.apache.org/)