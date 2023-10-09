# 0 Domain-driven design: Introduction
*17-7-2023*

Everything starts at zero, right? In the aftermath of designing the webshop, I became aware of some thing(s) missing. First I will tell you a story.

## Context of Domain-driven design

I mean, why do domain-driven design? I started my journey in web design in 2001, creating some webpage in Microsoft FrontPage (which was mandatory for that course...). I screamed in agony. So instead I wrote my own stuff in notepad, using HTML and CSS. Later I escaped to dreamweaver, which was a bit better. And before I knew it, I was into web design.

### Pull design: start at Frontend

At that time web technology (for me) was about the looks. We now know this as "frontend". All of my subsequent designs, including those for Xerbutri were started from sketches of what the pages would look like.

My designs were developed in the following order:

::: info Frontend-first
Frontend -> controllers -> logic -> infra -> database
:::

The controllers are MVC-controllers. Frontend were HTML-templates (the view of MVC).

At first the guys from Xerbutri and some other smaller pages were happy. Because you can deliver very fast, having to dive into the piping later. So at first they were happy, later a bit less happy since resolving bugs could take a long time. Having design-on-the-go does not lead to the most maintainable or efficient logic and database design.

This is called pull design, because you pull the code from business requirements on demand. Also known as Lean programming, building features or vertical development.

### Push design: Start the design from the database

As I found my first job, the way of working in the company was to start with the database design, because storing and retrieving data was slowest. Having this piece optimized was giving large gains in performance. Remember, this was the webforms/MVC era. So performance-wise backend-to-frontend was a non-issue.

Other names are data-centric approach or push design, 

The way of designing is inverted:

::: info Database-first
Database -> infra -> logic -> controllers -> frontend.
:::

Starting with the database meant a long time-to-market. The first months were spent with determining database design, normalization, data-types, models and lots of discussions about optimization.

This is called push design, or horizontal development. In push design you think about all of the functionality there should be somewhere in the future, and push that into a horizontal layer.

### Calculation services

As I started with my first design of a calculation module, I just couldn't handle the data-driven way off working, so I went back to the way of working as I learned at the University. First define your problem-domain.

::: info Start with the logic
Logic
:::

And now what? Let's first show the results to the user. Because I had to convince the guys my tool was working right? So I build this orchestrator and called it a service.

::: info Next define an orchestrator
Service -> Logic
:::

How to show this in the front end? That is quite easy, right?
::: info Show in the frontend
Frontend -> Controllers -> Service
:::

Now Helmer, how should we save the stuff calculated? Because your calculation is quite slow (HTTP-call!) and we want some caching of some sort. 'Let's use the database for that!' And so we started building models and the database (with Entity Framework this time, which made me quite happy).

::: info Conclusion
Frontend -> Controllers -> Infra -> Database
AND
Frontend -> Controllers -> Service -> Logic
:::

It was nice to be able to show our users real calculation results (no matter how "slow" they were) in a shorter time than normal.
In the following month we could bring updates to the users increasing performance bit by bit.

## Domain-driven design

In the Software Architecture course Domain-driven design was explained (in short). Domain driven design is a software design approach starting with the problem domain.
Wait! I know that from my calculation services! However, there is a bit more.

![Domain-driven design](/assets/images/domaindrivendesign/domaindrivendesign.svg "Domain-driven design; strategic and tactical design patterns")

### Ubiquitous language

We have all heard that difficult word, right? I always have to look up how to write it. Do not ask me how to pronounce it! The meaning of the word: being clear, existing, or being everywhere. A bit like God. Right? Or not?
I know this! The language in the code uses the language as used in the domain. As I was well aware of in my calculation modules.

And we used to do this all of the time. Because otherwise the domain experts did not know what we talked about. 
However, because of the universal containing-all-and-true-everywhere data model, fights used to break out. Because one domain expert was talking about User, the other one was talking about Customer, etc. The experts were demanding changes to model not agreed by others, it quickly became one big ball of spaghetti-mud. 

Which brings us to the next topic I think is most important:

### Bounded Context

In the past, I was used to look at relations between data, and modeling these relations like I was thought in University. There are boundary conditions and there is a set of complicated equations that relate to each other. Having both solves all problems. Being object oriented means we have to inherit all these objects in order to find the single source of truth. 
Aside from that we used to build models containing only properties. These are called "Anemic models". The business logic was contained in the business logic layer (BLL).

Not only were our models anemic, they were also abstracted to the maximum for the best reuse-ability, because that is the ultimate goal. Write one application to rule them all!!

Sounds good right, having one application for a thousand things? Soon we discovered that first of all it was really hard to maintain. One change leads to multiple questions because it effects everything, since everything is related. Second of all it did not satisfy the domain experts, nor the users.

This is where domain-driven design kicks in. We humans are not good at making these big universal truth applications, which contain all the information. So why not do the complete opposite?

So instead of having as many relations as possible, what is the minimum amount of relations the domain expert is happy with? 

In domain-driven design this is about finding the bounded context and the aggregates, as I will discuss in my [next blog](1domaindrivendesignwebshop).

### Isolation

In my opinion the last important property of domain-driven design is isolation.

The Domain layer is for the domain experts, business logic, entities, value objects and aggregates. 
The Presentation layer is for the users.
The Infrastructure layer is for persistence of data and integration to other services.

The Application layer connects the different layers with each-other.


![Domain-driven design: Architectural layers](/assets/images/domaindrivendesign/domaindrivendesignlayers.svg "Domain-driven design; Architectural layers")

These layers live in isolation, and have interfaces to talk to each other.

## Conclusion

I have to adopt some new manners about application design. 

Most importantly:
- look for the minimum amount of relations (keep it simple)
- go for eventual consistency in persistence, instead of a single source of truth (loose coupling)
- use of isolation between the layers, instead of reuse-ability (loose coupling)











