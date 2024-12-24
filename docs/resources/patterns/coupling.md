# About coupling

*13-11-2024*

Status: Idea  
Type of post: Resource

## *Rapid fire thoughts*

[//]: # ( ToDo: Write!)

## *Outline*

About complexity, a very nice podcast/book/idea

### Different types of complexity

You have got the necessary complexity and the unnecessary complexity.

For example, the description of a business domain can be complex, which is necessary.

And you can add unnecessary complexity by adding too many dependencies, or making your code too complex.

1. Simple. Input = output
2. Chaos. A small change in input can lead to another outcome.
3. Disorder. You do not know what the outcome will be. (This is complexity according to Vlad Khononov)

### Coupling

four types of coupling:
1. Intrusive coupling
2. Functional coupling
3. Model coupling
4. Contract coupling

## Integration strength

There are two dimensions:
1. Knowledge sharing
2. Distance

Knowledge sharing high && distance high = lots of effort to change.  

If there is lots of knowledge sharing between two systems, and the distance is big. Any change in one system, will demand a change in the connected system. For example two microservices that share the same models. An update in one, will change the contract, demanding a change in the other.

Knowledge sharing low && distance high = couldn't care less.

Knowledge sharing low && distance low = High cognitive load.
For example a monolith, with lots of classes that are not connected. You have to wade through lots of code in order to make a change.

Knowledge sharing high && distance low = ideal
Whenever you have things with high complexity, make sure the distance is low.


## Resources

[dotNET rocks Vlad Khononov](https://www.dotnetrocks.com/details/1923)