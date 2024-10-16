# Standards C-sharp

*8-9-2023*

Status: Work in progress

[//]: # (	ToDo: Rewrite!)

## Cupid is the new SOLID

A lot of programmers can tell you about the SOLID principles when coding. Dan Norths poses "Why every element in SOLID
is wrong", and developed something called CUPID:

[Cupid, the back story by Dan North](https://dannorth.net/2021/03/16/cupid-the-back-story/)

This needs to be elaborated on a bit, but basically:

- Composable - plays well with others
- Unix philosophy - does one thing, and does it well
- Predictable - does what you expect
- Idiomatic - feels natural
- Domain-based - in language and structure

## Architecture best practices

There are a set of rules to make sure your code applies to architecture best practices.

- Encapsulate third party dependencies
- Use [Design patterns](https://refactoring.guru/)
  -Always write simple code. CUPID is the new SOLID

From the CUPID-idea:

- Front-End should be dumb.
- Controllers should be dumb.
- Logic should be placed in Logic-files.
- Create vertical slices for your functionality
- Use the domain language (business driven words, so code is recognizable for the PO)

## Variables

Never use abbreviations.

//Do not

```cs
var cnt = 1;
```

//Do

```cs
var counter = 1;
```

Because cnt could be anything from counter, consultant or a curse word. Stick to CUPID: use the domain based language so
code is recognizable.

Try to use implicit typing (var instead of explicit type), but keep CUPID in mind. So whenever using an explicit type is
more clear, use the type:

```cs
var counter = 1;
bool hasName;
```

Do not prefix variables with the type:

//Do Not:

```cs
var intCounter = 1;
var stringName = "name";
```

//Do

```cs
var counter = 1;
var name = "name";
```

Because when refactoring you may decide to change the type, from integer to double.

For booleans use a verb, to make clear what it does, so isValid, instead of valid, and a better example: hasName instead
of Name.

## Interfaces

Use interfaces to define behavior.

Important security notice: Only expose methods or functions through an interface that ARE shared with other code.

```cs
public class HelmerLogic : IHelmerLogic
{
	/// <inheritdoc />
	public void AddColor(List<PrimaryColor> colors) 
	{
 		...
	}
}
```

The class implementing the interface always inherits the documentation from the interface (as part of standardization
and maintenance)

An interface uses the same name as the class, prefixed with an I.

```cs
public interface IHelmerLogic
{
	/// <summary>
    /// A clear description of the method (for example Adds a color, consisting of a mix of primary colors)
    /// </summary>
    /// <param name="colors">List of primary colors</param>
	public void AddColor(List<PrimaryColor> colors) {get; set;}
}
```

The interface always contains documentation in the summary about the method.

## Classes

Remember CUPID, write simple code. Most of the times the user will either give a command (add, save, delete, update) or
it will query (retrieve).

Commands are void. Queries return an object.

Keep your properties in Models and Methods wherever they belong. Properties define an object (for example a Car, which
has a property Color, EngineType, and more). The functionality of that car (UnlockDoor, StartEngine) should be in a
different class, because these are methods. And methods should be either a query, returning a result, or a command, and
never a mix of both.

Using statements should be outside the namespace. There is a lot of discussion on this topic. Having the using outside
the namespace, is the most clear for all involved.
Background:
This has to do with conflicting types. Suppose you have created a type named DatabaseContext, but there is also a type
with the same name in some NuGet package you are using. This will result in a compilation error, or the wrong type used,
or ambiguous behavior in Visual Studio, where it sometimes gives errors in the code, and sometimes not. In case the
using statements are outside the namespace, it will search for the type inside-out through the namespace, and next going
through the usings top to bottom. So if the type is defined in a lower namespace, it will use the type in that
namespace, instead of the type in the NuGet. When you move the usings inside the namespace, the search order will be
different, first it will try and find the type in the current namespace. Next it will go through the usings top to
bottom. So now it will take the DatabaseContext which is in the NuGet instead of the one in the namespace.

We have to try and not use conflicting types. Define which type you want:

```cs
using DatabaseContext = Helmer.DataAccessLayer;

namespace Helmer.Demo.Web;

public class HelmerLogic
{
	....
}
```

Model Class:

```cs
public class Car
{
	/// <summary>
	/// The Color of the car
	/// </summary>
	 public Color CarColor {get; set;}

	/// <summary>
	/// Constructor
	/// </summary>
	public Car()
	{
		//sometimes models can have a constructor, for example for validation, or autofill certain properties like a default Color
	}
}
```

Use correct order:

```cs
public class HelmerLogic : IHelmerLogic
{
	//Start with public member variables
	/// <summary>
	/// some Token (or a better desciption). But in fact we should use these sparingly.
	/// </summary>
	public string Token;
	
	// Next private fields
	private ILogger _logger;
    private readonly const int _zero = 0;

	//The methods defined in the Interface 

	/// <inheritdoc />
	public void AddColor(List<PrimaryColor> colors)
	{
		...
	}

	//The class should never have public methods not defined in the interface!
	
	//internal methods
	
	/// <summary>
	/// An internal access modifier means access is limited to the assembly, should have summary
	/// </summary>
	internal void AddInternal(Whatever whatever)
	{
	}

	//protected methods
	
	/// <summary>
	/// Access is limited to the containing type or types derived from the containing class
	/// </summary>
	protected void AddProtected(Whatever whatever)
	{
	}
	
	//private methods
	
    /// <summary>
	/// Access is limited to the containing type.
	/// </summary>
	private Whatever SomeHelper(Whatever whatever)
	{
	}	
}
```

## Documentation Conventions

[Documentation comments](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/documentation-comments)

As a summary I want to repeat the documentation conventions:

    Use a summary using the <summary> tag, use a clear description as a summary.
    All public (or protected virtual) members (so properties AND methods) are obliged to have a summary.
    Private methods should always have a summary.
    Private fields or properties are not required to have a summary.

Async

[Best practices in async programming](https://docs.microsoft.com/en-us/archive/msdn-magazine/2013/march/async-await-best-practices-in-asynchronous-programming)

When performing an async task, avoid using void. Because for an async task, the code expects a result. This is how async
is designed, you can tell the code to go do something, do something else, and fetch the stuff you need with an await. If
there is no result, how can we know it has happened or not? So this makes it difficult to test, or to handle Exceptions.

## Dependency injection

Using Dependency Injection (DI) decouples classes with their dependencies.

Pros:

    Much easier to unit test (because dependencies can be mocked, stubbed or faked, more on that later)
    Reduces boiler plate code
    Allows concurrent development
    Plug-and-play

Cons

    Difficult to trace (because it is not coupled anymore) NB, tracing in Visual Studio takes getting used to, debugging is no problem!
    For inexperienced coders, it is a bit more difficult to understand (learning curve)
    And some more in wikipedia, but I never encountered those

[Dependency Injection Wikipedia](https://en.wikipedia.org/wiki/Dependency_injection)

This link explains the idea

[Dependency injection in aspnetcore-5.0](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-5.0)

Look at this link how to implement DI in ASP.NET Core

[Dependency injection Tutorials Teacher](https://www.tutorialsteacher.com/ioc/dependency-injection)

Because I love tutorials teacher

[Video on dependency injection by Tim Corey (1h)](https://www.youtube.com/watch?v=Hhpq7oYcpGE)

Explanation for DI beginners (.NET6)
Language guidelines
String data type

Use string interpolation to concatenate short strings.

string displayName = $"{nameList[n].LastName}, {nameList[n].FirstName}";

Use the StringBuilder when appending strings in loops, especially with large strings.
LINQ Queries

Use meaningful names for LINQ queries

string displayName = $"{nameList[n].LastName}, {nameList[n].FirstName}";

## Nesting code

Coding if-statements

Use the exit-strategy, so nest you code as flat as possible (KISS and CUPID, so keep it simple, because deep nesting
explodes test cases!!)

Comparing apples to apples:

Say I would have to determine an apple, in a collection of fruit. The apple has a color (Green, Yellow, Red, or a
combination), a Flavor (Tart, sweet, mild, rich, tangy, spicy, or combination of 2), and a Texture (Crisp, Juicy, Firm,
or a combination of 3)

The figure above gives the idea of how to tackle this. If I would do this all in one method, the bifurcations would be
like:  color (7), Flavor (21), Texture (7). I have seen programmers try to catch this in one if:

An example of deep nesting:

```cs
if (fruit.Type == "apple")
{
	if(fruit.Color.Count <1)
	{
		if (fruit.Color[0] == "green")
		{
			return "Granny smith";
		}
		else if(fruit.Color[0] == "yellow")
		{
			if(fruit.Texture[0] == "Juicy")
			{
				return "Golden Delicious";
			}
			else if(fruit.Texture[0] == "Firm"){
				return "Crispin";
			}
		else
		{
			return "Red delicious";
		}
	}
	else if (fruit.Flavor.Count>1)
	{
		if(fruit.Flavor[0] == "Tart")
		{
			if(fruit.Flavor[1] == "Sweet")
			{
				if(fruit.Texture.Count>1)
				{
					if(fruit.Texture[0] == "Crisp")
					{
						if (fruit.Texture[1] == "Juicy")
						{
							return "Breaburn";
						}
						else...
					else...
				else...
			else...
		else...
	else...
//You will get the idea, right?
```

Suppose I would have to test this code. That would result in 1029 unit tests, because that will reflect all possible
test cases, in order to be able to determine like 20 apples. How about them apples, right?? So, consider this, we call
it the exit strategy.

```cs
if (fruit.Type == "apple")
{
	return DetermineApples(fruit);
}

private string DetermineApples(Fruit fruit)
{
	//Maybe refactor this into a method called DetermineMonoColoredApples
	if(fruit.Color.Count == 1 && fruit.Color.Contains("Green"))
	{
		return "Granny Smith";
	}
	if(fruit.Color.Equals(new List<string>{"Yellow"}) && fruit.Texture.Contains("Juicy"))
	{
		return "Golden Delicious";
	}
	if(fruit.Color.Equals(new List<string>{"Yellow"})&& fruit.Texture.Contains("Firm"))
	{
		return "Crispin";
	}
	//Maybe refactor this into DetermineMultiColoredApples
	var redAndYellow = new List<string> { "Red, Yellow" };
	var crispAndJuicy = new List<string> { "Crisp, Juicy" };
	var tartAndSweet = new List<string> { "Tart, Sweet" };
	if(fruit.Color.Equals(redAndYelllow) && fruit.Texture.Equals(crispAndJuicy) && fruit.Flavor.Equals(tartAndSweet)
	{
		return "Braeburn";
	}
//etcetera
}
```

So think of a specific scenario, and exit on that scenario. In this case we will have only twenty testcases to find the
twenty apples within their 1029 possible combinations.

For a nice video about this including some pointers on what to focus on when refactoring:
Watch ["Why you shouldn't nest your code" by Code Aestetics (08:30 min)](https://www.youtube.com/watch?v=CFRhGnuXG-4)

## Coding conventions

[Microsoft C# ](https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/coding-conventions)

Naming Conventions
Initial Capitals (PascalCase)

Use PascalCase (InitCaps or what they call Upper CamelCase or CamelHill) when naming a class, a record, or a struct

```cs
public class HelmerService
{
}
public record PostAddress
(
    string Street,
    string CityTownOrVillage,
    string Province,
    string PostCode
)
public struct HelmerCoordinate
{
}
```

When naming an interface, prefix an I.

```cs
public interface IHelmerService
{
}
```

When naming public members of types, such as fields, properties, events, methods, local functions:

```cs
public class HelmerService : IHelmerService
{
    /// <summary>
    /// A public field, use these sparingly
    /// </summary>
    public bool IsValid;
 
    /// <summary>
    /// An event
    /// </summary>
    public event Action EventPaint();
     
    /// <inheritdoc />
    public void AddColor(List<PrimaryColor> colors)
    {
        //Local Function
        static int GetWaveLength() => Color.WaveLength;
    }
     
    /// <summary>
    /// Method not existing in the interface, so it has a summary here (also notice it is sealed, so private)
    /// </summary>
    private Color CreateColor(List<PrimaryColor> colors)
    {
    }
}
```

Medial capitals

Use medial capitals (lower camelCase, I will call it medCaps) for naming private or internal fields, parameters going
into methods.

```cs
public class HelmerService
{
    /// <summary>
    /// A private field should be in snakeCase (medCaps with an underscore)
    /// </summary>
    private IHelmerLogger _HelmerLogger
 
    [ThreadStatic]
    /// <summary>
    /// A threadstatic private field should be in medCaps and have a small t and underscore: t_
    /// </summary>
    private static UnitConverter t_unitConverter;
     
    /// <summary>
    /// Constructor, injecting the logger. The parameter should be in medCaps
    /// </summary>
    public HelmerService(IHelmerLogger HelmerLogger)
    {
        _HelmerLogger = HelmerLogger;
    }
 
    /// <summary>
    /// Method parameters in medCaps
    /// </summary>
    private Color CreateColor(List<PrimaryColor> primaryColors)
    {
    }
}
```

Other naming conventions
Namespaces

Namespaces should use PascalCase for a single word, and a dot as a word separator. Because this is a bit cryptic, let me
give an example:

Helmer.Common.Tools

All the Helmer solutions start with the Helmer name, followed by a dot, next is the solution name (For example Common,
or SamlServiceProvider). So this is one name, without any dots separating it.

The third name is the project name.

In summary: Helmer.Solution.Project

Project type names are:
Data (Data access layer)
Web (web project)
Api (API project)
Logic (Contains Logic)
Client (A Client)
Service (A service)
Wpf (A wpf application)
ConsoleApp (Console app) (just using 'Console' will interfere with native console functionality like Console.WriteLine)
UnitTests (unit tests)
IntegrationTests (integration tests)
Folders and files

A project will contain folders and files. These have naming conventions as well

In old-style SOLID-like projects:
Attributes

Here you will find the attributes
Models

For storing models (viewmodels, data transfer objects, models)
Views

Stores the views in the mvc-model. The view-folder will contain subfolders with the controller prefix (So a folder
called Home, which belongs to the HomeController in the Controller folder)
Controllers

Stores all the controllers. The naming convention is to prefix the page-name for the controller. So the controller for
the homepage is called HomeController. Controllers should be dumb.
Logic

While expecting Logics, for some reason this is often just called Logic. The naming convention is the same as for
controllers, files should have the page-name prefixed. So HomeLogic belongs to the HomeController. However there cane be
shared logic as well, for example UserLogic, which has some user logic, and can be used by the HomeLogic to provide the
name of the user for a Welcome message. Most of the times this is about retrieving data from a database or the
HttpContext, so use the tablename or whatever info you retrieve as prefix.
Helpers

    Helpers are always static (do not change a class to be static, helpers should be static classes by themselves)
    Helpers will have a clear name, they will have the Helper suffix only when needed (EnvironmentHelper, ResultHelper, StandardResult).

Extensions

    Extensions will have the suffix Extensions, like ServiceCollectionExtensions.
    Extensions are always static
    Their first parameter (of a extension method) specifies which type the method operates on
        The parameter is preceded by the this modifier

Repositories

For repositories in a DAL projects
Enums

It is also possible to store all Enums in a separate folder, if there are many. Where Logic and Controller do have a
suffix, Enums normally do NOT have an Enum suffix.
Tests

There are two types of tests in the code. Unit tests will test a small piece of code (so one method). Integration tests
will test the integration of classes, or bigger chunks, please think before creating integration tests, because most of
the time these will be expensive. Helmer den Dekker will create a confluence entry on C# testing later. This is about
the naming conventions

In case of Tests the method should have names indicating the test goal:

```cs
[TestClass]
public UsersLogicQueryTest
    {
        /// <summary>
        /// Start with the method that is being tested, followed by an underscore, next the condition (UserRetrieved), underscore, should, underscore, followed by the expected result
        /// </summary>
        [TestMethod]
        public void GetUserInfo_UserRetrieved_Should_ReturnUserInfo()
        {
            //Arrange
            var userRepository = new UserRepositoryStub();
            userRespository.IsHappy = true;
            var logic = new UserLogic(userRepository); //or use resolver)
            // Act
            var result = logic.GetUserInfo(1);
            //Assert
            Assert.IsNotNull(result);
            Assert.AreEqual("Helmer", result.UserName);
        }
    }
```

Start with the method that is being tested, followed by an underscore, next the condition (UserRetrieved), underscore,
should, underscore, followed by the expected result. Because when you design a test, you know what it should do.

For Example:

```cs
[TestClass]
public UsersLogicQueryTest
    {
        /// <summary>
        /// Two Users in StubRepo, so Two users should be returned
        /// </summary>
        [TestMethod]
        public void GetAllUserso_WithTwoUsers_Should_ReturnTwoUsers()
        {
            //Arrange
            var userRepository = new UserRepositoryStub();
            userRespository.IsHappy = true;
            var logic = new UserLogic(userRepository); //or use resolver)
            // Act
            var result = logic.GetUserInfo(1);
            //Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(2, result.Count);
        }
    }
```

This name is clear in its goal. So whenever someone changes the 2 in the Assert to 1, because they made a mistake in the
code and change the test instead of the code (These things happen a lot!!), you will notice it when doing code review (
Weird, it should return 2, but returns one) OR you will notice it because they changed the testmethod name, which should
make alarm bells go ringing for you as code reviewer.
Layout conventions

Here are some general layout conventions, more about layout in Code Standardization

    Write only one statement per line
    Write one declaration per line
    Use parentheses to make clauses in an expression apparent.