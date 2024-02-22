# Programming paradigm

*20-11-2023*

Status: Work in progress  
Type of post: Resource

## *Rapid fire thoughts*

Different programming paradigms:

- Object oriented
- Procedural
- Declarative
- Reactive
- Functional

## *Outline*

What to use when?

### Imperative programming

The programmer instructs the machine how to change its state.

#### Procedural

This describes the control flow, in an orchestration manner.

So, there is a bunch of tasks that need to be done in a certain order, like an orchestra playing a piece of music.

It describes a workflow, where all the steps are dependent on one-another.

Modules to keep things apart.
Scopes (namespaces) to keep the procedures in the modules.
Methods with arguments as inputs, that return value (or perform a command).
`returnvalue method(argument)`

#### Object oriented

Groups instructions with the part of the state they operate on.
It expresses / describes the problem domain.
It creates the opportunity to handle the control flow in a choreography manner.

This is more about choreography (but so are functional and reactive I think)
There are a bunch of classes to describe a problem, or problem domain.

The classic big 3:

- Encapsulation (hide details)
- Inheritance
- Polymorphism

##### Encapsulation:

You "hide" logic in a class that has a name that makes perfect sense. Math.Square will tell you it does the square and
you can use it to do math. (Scope, method)

Use interfaces so you know what you CAN do.

##### Object design:

Keep in mind:

- Responsibilities
- Roles

What objects are responsible for:

- Knowing things
- Deciding things
- Doing things

YAGNI (You ain't gonna need it)
KISS (Keep it simple stupid)

Small abstractions are way better!

Keep input and output type operations separate from the other logic in the application.

Seperate decisions from doing. So, logic should DECIDE what should be printed in UI, printer should DO printing to the
screen or paper or wherever.

[Rebecca Wirfs Brock](https://www.wirfs-brock.com)

Keep

The flow needs not to be clear. The objects just do work as it is asked of them. In the end the objects and logic in
them get the work done.

### Declarative programming

It expresses the logic of computation without describing its control flow.

Any style that is not imperative.

#### Functional

The desired result is declared as the value of a series of function applications

For example the lambda functions in C#.

Like mathematical functions: output maps to input. Functions need to be pure.
So a method (or function) like Math.Random can return any
Does not change the state or mutable data.

The major difference is the way data is processed.

#### Logic

The desired result is declared as the answer to a question about a system of facts and rules

#### Reactive

The desired result is declared with data streams and the propagation of change.

#### Constraint programming

The constraint programming approach is to search for a state of the world in which a large number of constraints are
satisfied at the same time. A problem is typically stated as a state of the world containing a number of unknown
variables. The constraint program searches for values for all the variables.

It is paradigm for solving combinatorial problems that draws on a wide range of techniques from artificial intelligence,
computer science, and operations research. In constraint programming, users declaratively state the constraints on the
feasible solutions for a set of decision variables. Constraints differ from the common primitives of imperative
programming languages in that they do not specify a step or sequence of steps to execute, but rather the properties of a
solution to be found. In addition to constraints, users also need to specify a method to solve these constraints. This
typically draws upon standard methods like chronological backtracking and constraint propagation, but may use customized
code like a problem-specific branching heuristic.

Basically any of your mechanical engineering problems are high-level described as combinatorial problems with
constraints on the feasible solutions.

These are described in the numerical methods book.

### Declarative programming

Example:
You want some data, and don't care about the workflow as in SQL. Describing the problem domain is minimized.

SQL: `Select * from source where filter.`

Linq

## Resources
