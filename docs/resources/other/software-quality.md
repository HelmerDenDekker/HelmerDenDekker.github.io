# Software quality

*15-10-2024*

Status: Work in progress  
Type of post: Opinion piece

## *Rapid fire thoughts*

THIS WILL BECOME A HUGE RESOURCE. like [Refactoring guru](https://refactoring.guru/)

Question: How to measure software quality?

AI answer: 
- Use the software quality metrics.
- Use the software quality models.
- Use the software quality .....

Yeah right!!

Useless answer as usual, probably have to ask it nicely.

Whatever. So. Suppose you come up to some project.

Most of the time: I look at the code, and feel a certain way about it. How it is organized, written, depth of inheritence. Lots of complexity? Is the complexity necessary?

But, I would rather look at numbers. So there are four code metrics that I use:
- Depth of inheritance (death by a thousand classes/interfaces)
- Class coupling (death by a thousand dependencies)
- Cyclomatic complexity (death by a thousand ifs)
- Lines of code (death by a million code lines)
- Maintainability index (death by a million code lines)


## *Outline*

I like Cupid.

## Depth of inheritance

Whahahaha depth is not Cupid.

Very deep inheritance is very OOP

Cupid: Depth =1 and never higher.

For OOP, depth < 10

## Cyclomatic complexity

=> indicates the level of branching

Should never become >7 in one method

How to prevent your code from becoming legacy?

You should look into individual methods.

0-7 is very good

7-24 is okay

24 is problematic


## Class coupling

The higher the number, the more complex.

Again, this is very OOP, and not very Cupid.

The higher number means the more classes are coupled, and you class may do too much work.

The single responsibility principle is either violated OR at work here!
1. the class does too much (too many responsibilities)
2. the class is too coupled (too many dependencies), because the logic/complexity is scattered all over the place.

Think about what you want to achieve with your class.

## Lines of code

My first real IDE told me to keep my methods under 20 lines of code. This was my goal ever since. Well. It depends.


## Maintainability index

0-9 is bad!

10-20 is problematic

20-100 is okay

## Thoughts about complexity

I think this whole complexity idea I heard of is important:
- How to measure complexity
- Where to place your complexity
- When to introduce complexity, and when NOT to introduce complexity





## Resources
