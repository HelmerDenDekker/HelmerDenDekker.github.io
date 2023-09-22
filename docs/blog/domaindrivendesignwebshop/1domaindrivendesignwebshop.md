# 1 Domain-driven design: Designing a webshop
*19-6-2023 - updated 17-7-2023*

Taking inspiration from the Software architecture course, I will be discussing the e-shop, or webshop. I will use this as a demo for approaching and learning about domain-driven design. This is the first blog in a series.

## Starting point for the design

The starting point is the course material, which looks a bit like this:

![Webshop as presented in the course](/assets/images/domaindrivendesign/DDDWebshopDomain.png "Webshop as presented in the course")

## Step 1: Strategic design

In strategic design the subdomains are singled out that are most important or close to your business. This is the first step in domain-driven design.
- Identify subdomains in your domain model.
- Identify *core* sub-domains (most important), *supporting* and *generic* sub-domains.
- Identify bounded contexts
- Determine relations

### Identify subdomains

So for the webshop it was decided to:
- Scrap the reviews for the minimum viable product. Reviews are not our core business. We can sell products without reviews.
- Selling products, managing stock (warehouse) and order management (sales) are the core of our business.
- Access management, payment and shipping is not our core business, we can find third parties to support us in that.

The subdomains in the strategic design look like this:

![Webshop subdomains](/assets/images/domaindrivendesign/DDDWebshopAggregates.png "Webshop aggregates")

### Identify bounded context

The business has the following clear bounded contexts:
- Orders: handled by the sales department.
- Products: managed by the warehouse department.

The shoppingcart is a potential order and exists separately in the domain model because it has specific business rules.
The suppliers are handled by the warehouse stock acquisition team, its existence as a separate context is under investigation. For the sake of simplicity we keep it as a separate context.

The customers are part of sales department at this moment. In every connected sub-domain (account, payment, shipment), a different language is used for the customer (like user, accountholder, consumer). Customers is seen as separate context.

### Relations

The relations are shown with the overlapping circles in the picture above. 
The shopping cart has products. So there is a relation. 
The shopping cart may become an order. However, they do not have a relation.
The supplier supplies a product, and the product has a supplier.
The order has products and a customer. The order will be shipped and payed for, this is important for keeping status. So order has orderstatus, which relates to payment and shipment.
The customer uses an accountservice. The customer may have a preferred shipping- or payment-service (for educational purposes, I would not recommend this for MVP).

## Step 2: Tactical design

### Rules and steps

Domain objects are an entity or a value object.

An entity is unique, it has a unique identifier and it is mutable.
Entities focus on behaviour.
Value object is immutable, and does not have a unique identifier.

#### Aggregates

Aggregates have entities and value objects inside them.
It is a transactional boundary.

Rules:
- Reference other aggregates by id
- Changes are commited and rolled back as a whole (going to the DB)
- Changes to an aggregate are done via the (aggregate)root

The last rule is a soft rule, however value objects are immutable, so it is best to do any changes to your 

Aggregate modeling steps:
- Define each of the entities as an aggregate 
- Merge aggregates to enforce invariants
- Merge aggregates that cannot tolerate eventual consistency

It is better to have small aggregates, because of rule 2 (committing al changes to dtabase at once).
Invariants are business rules that must always be consistent.

Questions
- Does the entity make sense without the other?
- Will it need to be looked up?
- Will it be referenced by other aggregates?

If the entity does not make sense without the other entity, it is a local entity and not an aggregateroot.
If the aggregate will be looked up or is referenced by other, it is an aggregateroot.

### Defining Entities in the webshop
Entities:
- ShoppingCart (it is unique for a visitor)
- Product
- Order (unique for customer)
- Supplier
- Customer
- Account (external)
- Shipping (external)
- Payment (external)

Drawing the relations and adding entities and value objects leads to this rather complex domain model. I have a value object called Money, but having it in here would mess everything up to a degree that it is no longer readable.

![Webshop aggregates and domain](/assets/images/domaindrivendesign/DDDWebshopAggregateDomain.png "Webshop aggregates and domain")

### Split up into separate aggregates

In the course these were called services. In domain-driven design these are called aggregates. Every entity is an aggregate, and in the picture below you can see the sketch of how these are all related.

![Webshop aggregates and objects](/assets/images/domaindrivendesign/DDDWebshopServices.png "Webshop aggregates and objects")

This takes us to modelling step two, the invariants.

In the team we discussed the business rules. You really need a domain expert on board for this, discussing with the product owner what rules are needed. 
For example: Can you select a product in the shopping cart, which is out of stock?

In that case, there is a business rule concerning the ProductAggregate and the ShoppingCartAggregate. 
For the product owner, eventual consistency is fine. So when the product is placed in the shoppingcart, the stock will not be altered (in our case)

Another example of a business rule
You cannot order a product which is not in stock.
In some webshops this is not possible to order a product not in stock. However, when ordering fresh groceries, in the Netherlands, it is quite common to be able to order groceries which are not in stock.

From a business point of view, orders are handled by the sales department, products are handled by the warehouse department. It makes no sense to merge these. It are separate activities, in other words the bounded context is different.
Sales needs to know if the products are in stock. Warehouse needs to know when to order new products. This is reached by eventual consistency.

Looking at this sketch, we could put Customer in OrderAggregate. However, customer and order are also in Shipping, in Payment and Customer is in Account. These are third party services, needing to be connected. So it is better to keep Customer as a separate aggregate.

A valid option is to simplify Supplier and add it to the ProductAggregate. Because the Supplier entity is only related to Product and the bounded contexts are alike.


## Conclusion

Right now, I have my first design. If you check the code, you will see differences, because when you work on the code, you will find missing bits, have questions. That is okay, this is why we are using domain driven design, so we can change it quickly.
So the design below is just a snapshot, a frozen moment in time (23-06-2023 12:49). Reality will catch up. Your code is your documentation. 

![Proposed webshop domain model](/assets/images/domaindrivendesign/FinalWebshopDesign.png "Proposed webshop domain model")

## Github

This is work in progress, and the demo code can be found here:
[Demo webshop code on GitHub](https://github.com/HelmerDenDekker/HelmerDemo.WebShop)

## Resources

[Course Software Architecture by Vijfhart](https://www.vijfhart.nl/opleidingen/software-architectuur/)  
[Domain Driven Design blog by Felipe de Freitas Batista](https://thedomaindrivendesign.io/)  
[Code Opinion](https://codeopinion.com/)  
Julie Lerman - The intersection of Microservices, domain-driven design and entity framework core  
Milan Jovanovic

