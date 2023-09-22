# HATEOS
*6-9-2023*

This contains the resources I collected about HATEOS.

## About HATEOS

HATEOAS (Hypermedia as the Engine of Application State)  

HATEOS is part of the uniform interface constraint of REST application architecture.

Everything the browser needs to render the page, and ALL of the links, should be in the API!

Boils down to:
- Links
- State transitions

Idea: Hypermedia links drive the state of the application, and not the other way around.

So, I used to work with RPC-like API's with separate endpoints that fetch info from the backend. For a table: create, read, update, delete. And have the front-end figure out what state the application should be in. For example, the front-end logic decides when an admin is logged in this user can create-read-update-delete, otherwise it can just read. 

With HATEOS I let the API decide what to send back, so when the API detects a logged-in admin, it returns the table + links for create-update-delete. For other users, it returns nothing more than just the table. The frontend then decides how to build up it's frontend based on the API data.  

I think it is a real nice idea. I want to try it.


## Resources

[HATEOS - restfulapi.net](https://restfulapi.net/hateoas/)
[HATEOS - Wikipedia](https://en.wikipedia.org/wiki/HATEOAS)