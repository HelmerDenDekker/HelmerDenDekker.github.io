# API - Resource
*10-5-2023 - updated 8-9-2023*

API is the acronym for Application Programming Interface, which is a software intermediary that allows two applications to talk to each other.

In this broad sense, anything can be an API, as long as it is an interface for two applications to talk to each other.

[API- Wikipedia](https://en.wikipedia.org/wiki/API)

These are relevant implementations of the API:

## Web API

These days, most of the time when people are talking about API, they talk about the Server-side Web implementation of the API.

A Web API is a web development concept.
- A (server-side) Web API exists on a server
- It has endpoint(s)
- It has resources (REST-like API) or a service (Web Service)

For client side APIs and Server API, read the wikipedia:
[Web API- Wikipedia](https://en.wikipedia.org/wiki/Web_API)

### REST architecture

REST is the acronym of Representational state transfer. It is a software architectural style that describes the architecture of the Web.

REST is designed for client-server, network-based applications for internet-scale usage.

It was derived from the following constraints:
- Client-server communication
- Stateless communication
- Caching
- Layered system
- Code on demand (optional)
- Uniform interface: Identification and manipulation of resources, Self-descriptive messages and HATEOAS

A RESTful service can respond with JSON, XML or HTML.

Web APIs that adhere to the REST architectural constraints are called RESTful APIs.

#### Architectural properties

- performance in component interactions, which can be the dominant factor in user-perceived performance and network efficiency;
- scalability allowing the support of large numbers of components and interactions among components;
- simplicity of a uniform interface;
- modifiability of components to meet changing needs (even while the application is running);
- visibility of communication between components by service agents;
- portability of components by moving program code with the data;
- reliability in the resistance to failure at the system level in the presence of failures within components, connectors, or data


[REST- Wikipedia](https://en.wikipedia.org/wiki/Representational_state_transfer)

### Serverless Functions

A function is a serverless API endpoint. It is basically the same as a Web API, but it has serverless hosting, so it has better performance, through scalability and flexibility.


## Web services

A Web service is a method of communication between two electronic devices over a network. A web service is a way to implement an API.

The 2004 definition by W3C:
 A Web service is a software system designed to support interoperable machine-to-machine interaction over a network. It has an interface described in a machine-processable format (specifically WSDL). Other systems interact with the Web service in a manner prescribed by its description using SOAP messages, typically conveyed using HTTP with an XML serialization in conjunction with other Web-related standards.

A Web Service has:
- The ability to transfer data between two software applications
- One type of API
- Strict requirements

For me, this picture is so much clearer, and describes about everything:

![W3C Web service intro.](/assets/images/api/webservicew3c.gif "W3C web service intro")

There are two parties involved in a web service, and they both agree on standards along which to interact. They mold these into a protocol, describing semantics in a contract and discovery in a wsdl file. 
[Web Service- Wikipedia](https://en.wikipedia.org/wiki/Web_service)

### Requirements

A Web Service has strict requirements.
- Network communication (transport bindings)
- Protocol used (SOAP, WCF)
- Contracts regarding semantics
- Discoverability document


### SOAP protocol

SOAP stands for Simple Object Access Protocol.
The SOAP protocols are standardized by the W3C and mandate the use of XML as the payload format, typically over HTTP.
SOAP-based Web APIs use XML validation to ensure structural message integrity, by leveraging the XML schemas provisioned with WSDL documents. A WSDL document accurately defines the XML messages and transport bindings of a Web service.

[XML Soap - W3Schools](https://www.w3schools.com/XML/xml_soap.asp)
[SOAP- Wikipedia](https://en.wikipedia.org/wiki/SOAP)


## SignalR

SignalR is a free and open-source software library for Microsoft ASP.NET that allows server code to send asynchronous notifications to client-side web applications.
In other words, you can communicate with the user from the server in real-time, without the server blocking for a response by the user.
SignalR is a solution that provides an abstraction layer on top of WebSockets, making it easier and faster to add realtime web functionality to apps.  

SignalR provides an API for creating server-to-client remote procedure calls (RPC). The RPCs invoke functions on clients from server-side .NET Core code.
SignalR uses hubs to communicate between clients and servers. A hub is a high-level pipeline that allows a client and server to call methods on each other. 

## Remote Procedure call

A remote procedure call has a long history and is still in use today for client-server interaction. But most of the time RPC is regarded as an IPC (inter-process-call) instead of an API.
[Remote procedure call - Wikipedia](https://en.wikipedia.org/wiki/Remote_procedure_call)

### gRPC

gRPC is is a language agnostic, high-performance Remote Procedure Call (RPC) framework.
[gRPC - Wikipedia](https://en.wikipedia.org/wiki/GRPC)






