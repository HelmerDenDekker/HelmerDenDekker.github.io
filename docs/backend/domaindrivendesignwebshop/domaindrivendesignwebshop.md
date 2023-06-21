# Domain-driven design: Designing a wWebshop
*19-6-2023*

Taking inspiration from the Software architecture course, I will be discussing the e-shop, or webshop for the demo.

## Rules and steps

Domain objects are an entity or a value object.

An entity is unique, it has a unique identifier and it is mutable.
Value object is immutable, and does not have a unique identifier.

### Aggregates

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

It is better to have small aggregates, because of rule 2.
Invariants are business rules that must always be consistent.

Questions
- Does the entity make sense without the other?
- Will it need to be looked up?
- Will it be referenced by other aggregates?

If the entity does not make sense without the other entity, it is a local entity and not an aggregateroot.
If the aggregate will be looked up or is referenced by other, it is an aggregateroot.


## Design iteration 1, starting point

The starting point is the course material, which looks a bit like this:

![Webshop as presented in the course](/assets/images/domaindrivendesign/DDDWebshopDomain.png "Webshop as presented in the course")


## Design iteration 2, Aggregates and feedback

While working on separating into aggregates, it was decided to:
- Scrap the reviews, as this is not minimum viable product. We can sell products without reviews
- Access management, payment and shipping is not our core business.

Entities:
- ShoppingCart (it is unique for a visitor)
- Product
- Order (unique for customer)
- Supplier
- Customer
- Account (external)
- Shipping (external)
- Payment (external)

Every entity is an aggregate, so it looks like this:

![Webshop aggregates](/assets/images/domaindrivendesign/DDDWebshopAggregates.png "Webshop aggregates")

## Design iteration 3, Aggregates and relations

Drawing the relations and adding entities and value objects leads to this rather complex domain model. I have a value object called Money, but having it in here would mess everything up to a degree that it is no longer readable.

![Webshop aggregates and domain](/assets/images/domaindrivendesign/DDDWebshopAggregateDomain.png "Webshop aggregates and domain")

## Design iteration 4, Split up into separate aggregates

In the course these were called services. In domain-driven design these are called aggregates:

![Webshop aggregates and objects](/assets/images/domaindrivendesign/DDDWebshopServices.png "Webshop aggregates and objects")

This takes us to modelling step two, the invariants.

In the team we discussed the business rules. You really need a domain expert on board for this, discussing with the product owner what rules are needed. 
For example: Can you select a product in the shopping cart, which is out of stock?

In that case, there is a business rule concerning the ProductAggregate and the ShoppingCartAggregate. 
For the product owner, eventual consistency is fine. So when the product is placed in the shoppingcart, the stock will not be altered.

Another example:
You cannot order a product which is not in stock.
In some webshops this is not possible to order a product not in stock. However, when ordering fresh groceries, in the Netherlands, it is quite common to be able to order groceries which are not in stock.

From a business point of view, orders are handled by the sales department, products are handled by the warehouse department. It makes no sense to merge these. It are separate activities.
Sales needs to know if the products are in stock. Warehouse needs to know when to order new products. This is reached by eventual consistency.

If you are not okay with eventual consistency here, you need to merge the Order and Product aggregates.

In this example eventual consistency is fine.

Looking at this sketch, we could put Customer in OrderAggregate. However, customer and order are also in Shipping, in Payment and Customer is in Account. These are third party services, needing to be connected. So it is better to keep Customer as a separate aggregate.

A valid option is to simplify Supplier and add it to the ProductAggregate. Because the Supplier entity is only related to Product.















