# Composition over inheritance

*9-9-2025*

_Status: {Idea}_  
_Type of post: {Opinion piece}_

## *Rapid fire thoughts*

[//]: # ( ToDo: Write!)

## About inheritance, an example

As I grew up (as developer) I learned inheritance. That is THE way to go. Right?

However, lately I got more and more into trouble.

Let me sketch a simple scenario ripped from MPJ's video on composition over inheritance.

#### Sprint 1 Cat and Dog

The product owner wants a Dog and a Cat. Both should be able to make their sound:

``` csharp

public class Dog
{
	public void Bark() { ... }
}

```

``` csharp

public class Cat
{
	public void Meow() { ... }
}

```

#### Sprint 2 Eating

Next sprint, the product owner tells the client wants them to be able to eat.

``` csharp

public class Dog
{
	public void Bark() { ... }
	public void Eat() { ... }
	public void Walk() { ... }
}

```

``` csharp

public class Cat
{
	public void Meow() { ... }
	public void Eat() { ... }
	public void Walk() { ... }
}

```

##### Code review

However! The tech-lead says: "We should use inheritance!".  

Inheritance describes an "is a" relationship. A Dog is an Animal. A Cat is an Animal.
So we refactor:

``` csharp
public class Animal
{
	public void Eat() { ... }
	public void Walk() { ... }
}

public class Dog : Animal
{
	public void Bark() { ... }
}

public class Cat : Animal
{
	public void Meow() { ... }
}
```

#### Sprint 3 Pooping

This causes major problems in the program, since the animals are eating, gaining infinite weight, and eventually exploding.  
We know how to easily solve this! We add the pooping functionality to the Animal class, producing Shit:

``` csharp
public class Animal
{
	public void Eat() { ... }
	public void Walk() { ... }
	public Shit Poop() { ... }
}
```

And we let the Dog and Cat override Poop().

#### Sprint 4 Shit hits the fan

Because poops are all over the floor, the product owner demands a robot that cleans up all the poop.

``` csharp
public class CleaningRobot
{
	public void Drive() { ... }
	public void Clean() { ... }
}
```

#### Sprint 5 Murder robot

The next sprint there is this client that does not like dogs, and demand a killer robot for killing these.
At first you might have problems with that, personally, but since you are very afraid that the boss might replace you with AI, you put all ethics aside:  

``` csharp
public class MurderRobot
{
	public void Drive() { ... }
	public void Kill() { ... }
}
```

##### Code review

The tech-lead: "OMG, are you a junior? You forgot about inheritance, like I told you a million times!"

So you end up with this.

``` csharp
public class Robot
{
	public void Drive() { ... }
}

public class MurderRobot : Robot
{
	public void Kill() { ... }
}

public class CleaningRobot : Robot
{
	public void Clean() { ... }
}

```

#### Sprint 5 Killing spree

By accident the robot started killing cats. In order to prevent that, the product owner demands the MurderRobot to bark.

So, at first, you come up with this solution. As the problem is urgent...

``` csharp
public class MurderRobot : Robot
{
	public void Kill() { ... }
	public void Bark() { ... }
}

```

However. You are dreading the code review.... Bark exists in Dog, and you are repeating yourself. So you refactor like this?

``` csharp
public class MurderRobot : Robot, Dog
{
	public void Kill() { ... }
	public void Bark() { ... }
}
```

Also, this means that the Robot can also eat and poop, and robots cannot. And the code does not compile.

``` csharp
public class Barker{
	public void Bark() { ... }
}
public class MurderRobot : Robot, Barker
{
	public void Kill() { ... }
}

public class Dog : Animal, Barker
{
}
```

That's it! Nice and clean!   
However: the code does not compile. In C# you cannot inherit from multiple classes.  
Another refactor later:


``` csharp
public class Barker{
	public void Bark() { ... }
}
public class Robot : Barker
{
	public void Drive() { ... }
}

public class Animal : Barker
{
	public void Eat() { ... }
	public Shit Poop() { ... }
}
```

But now all robots and animals bark. So we need to override, or create a base class, where the bark has no functionality. And we override this functionality in Dog, where it barks.

``` csharp
public abstract class Barker{
	public virtual void Bark() { // Does nothing }
}
public class Robot : Barker
{
	public void Drive();
}

public class Animal : Barker
{
	public void Eat() { ... }
	public void Walk() { ... }
	public Shit Poop() { ... }
}

public class MurderRobot : Robot
{
	public void Kill() { ... }
	public override void Bark() { ... }
}

public class Dog : Animal
{
	public override void Bark() { ... }
}

```

Problem solved! We used inheritance! Which is good right?  
I think any C# senior used this solution at some point...  
It is very SOLID. Is it?  

The problems:
 - It grows out of control in larger solutions
 - Complex inheritance trees are very hard to understand (especially for junior developers onboarding)
 - Your mind will explode due to >7 things you need to remember.

I mean, look at this simple example. The cat has a bark-functionality. That does nothing. Why is it even there? If you have any idea about the context (cats) it does not make any sense. 
And here it is simple to follow because Cat -> Animal -> Barker.  
Expanding this game ends up with Cat -> Predator -> Jumper -> Walker -> Eater -> Pooper -> Animal -> Barker.  
Having to change something about the Cat becomes incredibly hard.

# Solution: Composition over inheritance

As inheritance describes an "is a" relationship, composition describes a "has a" relationship.  
Inheritance is about what it is.  
Composition is about what it does.  

The Cat does walk, does eat, does poop and does meow.
The Dog does walk, does eat, does poop and does bark.
The CleaningRobot does drive and does clean.
The MurderRobot drives, kills and barks.

Without any inheritance, the behaviours are composed into the classes:

``` csharp
public class Walking
{
	public void Walk() { ... }
}

public class Eating
{
	public void Eat() { ... }
}

public class Pooping
{
	public Shit Poop() { ... }
}

public class Barking
{
	public void Bark() { ... }
}

public class Meowing
{
	public void Meow() { ... }
}

public class Cleaning
{
	public void Clean() { ... }
}

public class Killing
{
	public void Kill() { ... }
}

public class Driving
{
	public void Drive() { ... }
}
```

As a very simple example, the cat:
``` csharp
public class Cat
{
	private readonly _walking;
	private readonly _eating;
	private readonly _pooping;
	private readonly _meowing;

	public Cat()
	{
		_walking = new Walking();
		_eating = new Eating();
		_pooping = new Pooping();
		_meowing = new Meowing();
	}
	
	public void Walk() => _walking.Walk();
	public void Eat() => _eating.Eat();
	public Shit Poop() => _pooping.Poop();
	public void Meow() => _meowing.Meow();
}
```

Don't you think this is easier to follow for junior developers? You still have all behaviour defined in only one class, so you do not repeat yourself.

No more base classes, where changes affect the inherited classes. No more loading all these classes into your brain. You just pick a behaviour whenever you need it, and add it to the class where it is needed.

This will look nicer using dependency injection (argh, inheritance!) and the new primary constructor in the latest C#.

## Resources

[Understanding Composition in C#: A Better Alternative to Inheritance](https://medium.com/@Code_With_K/understanding-composition-in-c-a-better-alternative-to-inheritance-2b46c1cdb821)  
