# How to: Advanced unit testing

*19-11-2020 - updated 13-10-2023*

This article discusses standards for advanced use cases.
I have not worked with these use cases for the past two years, so they might be rare.

## Context: Enforcing encapsulation

I used to work for this company that had a monolith with very complex business logic.

Encapsulation of the logic was very important.

The monolith was refactored into layers, a bit like the domain driven design, or onion model:

![Domain-driven design: Architectural layers](/assets/images/domaindrivendesign/domaindrivendesignlayers.svg "Domain-driven design; Architectural layers")

The layer we call the domain was organised like this:

![Domain layers](/assets/images/advancedunittest/domainunittesting.svg "Domain layers")

The public available methods were exposed through an interface. The Logic only contained the public methods. All
protected and private methods were contained in the LogicHelper. I do not want to discuss the what, how and why, but
this was the case. These protected and private methods had to be tested for quality assurance reasons.

I recreated the architecture in
the [AdvancedUnitTesting branch](https://github.com/HelmerDenDekker/TestDemoProject/tree/AdvancedUnitTesting) of Helmer
GitHub TestDemoProject repo.

## How to test protected methods

First of all I created a new class in the Unit test project to create an <code>Exposed...</code> class for the <code>
SomeProtectedLogicHelper</code>.

```cs
internal class ExposedSomeProtectedLogicHelper : SomeProtectedLogicHelper
{
    /// <summary>
    /// The Exposed method for IsDenumenatorNonZero, make sure it is properly encapsulated.
    /// </summary>
    /// <param name="denumerator"></param>
    /// <returns></returns>
    internal new bool IsDenumenatorNonZero(double denumerator)
    {
        return base.IsDenumenatorNonZero(denumerator);
    }
}
```

[Link to code snippet on GitHub](https://github.com/HelmerDenDekker/TestDemoProject/blob/ab9ae4d8a4f3c7de28895603422ff9b8f97d7f48/UnitTestProject/Helpers/ExposedSomeProtectedLogicHelper.cs)

In this class I expose the method I want to test: <code>IsDenumenatorNonZero</code>. In this exposed method I inherit
from the base method. For the test the derived method in the exposed class should hide the protected method from the
base class, so (for no reason whatsoever aside from abiding the coding standards) I added the new
modifier: [When to use override or new keywords - Microsoft](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/knowing-when-to-use-override-and-new-keywords)

Next I add
a [Test class](https://github.com/HelmerDenDekker/TestDemoProject/blob/ab9ae4d8a4f3c7de28895603422ff9b8f97d7f48/UnitTestProject/SomeProtectedLogicHelperUnitTest.cs#L1).
In this class I initialize the <code>ExposedSomeProtectedLogicHelper</code>:

```cs
private ExposedSomeProtectedLogicHelper _someProtectedLogicHelper;

[TestInitialize]
public void TestInitialize()
{
    _someProtectedLogicHelper = CreateSomeProtectedLogicHelper();
}

private ExposedSomeProtectedLogicHelper CreateSomeProtectedLogicHelper()
{
    return new ExposedSomeProtectedLogicHelper();
}
```

I like to use the <code>TestInitialize</code> attribute to initialize a new helper for each test. In some cases the
CreateSomeProtectedLogicHelper can become complex, so I am used to put the creation process in a separate method, but it
is not of much use here.

```cs
[TestMethod]
public void IsDenumenatorNonZero_WithZeroInput_ReturnsFalse()
{
    // Arrange
    var denumerator = 0;

    // Act
    var result = _someProtectedLogicHelper.IsDenumenatorNonZero(denumerator);

    // Assert
    Assert.IsFalse(result);
}
```

And there you are a clean and clear test.

## How to Test private methods

Testing <code>private</code> methods is considered an anti-pattern. You should consider your access modifiers. For
old-time's sake I will discuss how I did test <code>private</code> methods in the past.

### Setup for testing private methods

Since it being a code- or test-smell, it is no longer possible to test <code>private</code> methods using MSTest.
However, [someone placed a "fix"](https://github.com/microsoft/testfx/tree/664ac7c2ac9dbfbee9d2a0ef560cfd72449dfe34/src/TestFramework/Extension.Desktop)
from which I took the <code>PrivateObject</code> class.  
Using this class I can test my <code>private</code> methods.

```cs
internal class PrivateObject
    {
        private readonly object o;

        internal PrivateObject(object o)
        {
            this.o = o;
        }

        internal object Invoke(string methodName, params object[] args)
        {
            var methodInfo = o.GetType().GetMethod(methodName, BindingFlags.NonPublic | BindingFlags.Instance);
            if (methodInfo == null)
            {
                throw new Exception($"Method'{methodName}' not found is class '{o.GetType()}'");
            }
            return methodInfo.Invoke(o, args);
        }
    }
```

[Link to code snippet on GitHub](https://github.com/HelmerDenDekker/TestDemoProject/blob/573e64429b86284230fd00c1198fd62081db4f1a/UnitTestProject/Helpers/PrivateObject.cs#L6C1-L24C6)

In the unit test class, I create the "somePrivateLogicHelper" class as a <code>PrivateObject</code> so I can access
the <code>private</code> methods in the tests:

```cs
 private PrivateObject _somePrivateLogicHelper;

/// <summary>
/// Initialize each test with a new SomePrivateLogicHelper PrivateObject
/// </summary>
[TestInitialize]
public void TestInitialize()
{
    _somePrivateLogicHelper = CreateSomePrivateLogicHelper();
}
```

```cs
private PrivateObject CreateSomePrivateLogicHelper()
{
    var somePrivateLogicHelper = new SomePrivateLogicHelper();
    PrivateObject privateHelper = new PrivateObject(somePrivateLogicHelper);
    return privateHelper;
}
```

[Link to code snippet on GitHub](https://github.com/HelmerDenDekker/TestDemoProject/blob/53611280bde3db85507156a3a0c4b4948753a069/UnitTestProject/SomePrivateLogicHelperUnitTest.cs#L53C1-L58C10)

### Testing the private method

The private method is tested by calling the <code>Invoke</code> method on the <code>PrivateObject</code>. As you can see
in the <code>PrivateObject</code> class, it accepts a <var>methodName</var> as <code>string</code>, and the parameters
to be entered into the method as an <code>object[]</code>, and it returns an object.

So, in the test below you find an example of how to test the <code>private</code> method. The method-name to invoke and
the parameters are entered into the <code>Invoke</code> method. The result is asserted with AreEqual.

```cs
[TestMethod]
public void IsDenumenatorNonZero_WithZeroInput_ReturnsFalse()
{
    // Arrange
    var denumerator = 0;

    // Act
    double parameters = denumerator;
    var result = _somePrivateLogicHelper.Invoke("IsDenumenatorNonZero", parameters);

    // Assert
    Assert.AreEqual(false, result);
}
```

## How to test the logging framework

In a company I worked for it was requested to test if logging was in place. Fine, this is perfectly possible, and
therefore I added it to this advanced unit testing resource.
But right now, in hindsight, it is over-optimised, or over-tested if you like. That is my opinion.

I created a piece of logic weirdly
called [DependencyInjectedLogic](https://github.com/HelmerDenDekker/TestDemoProject/blob/AdvancedUnitTesting/Logic/DependencyInjectedLogic.cs)
where the log action takes place. I used Microsoft.Extensions.Logging, but you can do this for SeriLog the same way.

### Mock with Moq

Mocking should be used for testing behaviour of code, the command-style. And in this case the logger commands a log to
be written to a sink. So, Moq is used for verifying that this action took place.

### Setup of Moq and the logic

On every test I initialize a new mocked logger, and at the end of the test, I clean everything up. Or, I tell the
testing framework to do this for me with the following piece of code:

```cs
 private Mock<ILogger> _logger;

/// <summary>
/// On every test initialize a new environment (with a new mock)
/// </summary>
[TestInitialize]
public void TestInitialize()
{
    this._logger = new Mock<ILogger>();
}

/// <summary>
/// On every test clenup the environment by deleting all of the mocks data
/// </summary>
[TestCleanup]
public void TestCleanup()
{
    _logger = null;
}
```

For each test it creates a new <code>DependencyInjectedLogic</code>. This logic is dependent on the logger, which is fed
with the <code>_logger.Object</code>.

```cs
private DependencyInjectedLogic CreateDependencyInjectedLogic()
{
    return new DependencyInjectedLogic(_logger.Object);
}
```

### Testing the log creation

The actual writing of the log is tested by calling the method, and use <code>Verify</code> to check the log.

```cs
[TestMethod]
public void Multiply_withCorrectNumbers_VerifyLog()
{
    //Arrange
    var numberOne = 1;
    var numberTwo = 2;

    //Right here we can manipulate the mocks.
    var logic = CreateDependencyInjectedLogic();

    //Act
    var result = logic.Multiply(numberOne, numberTwo);

    //Assert
    _logger.Verify(log=>log.Log(It.Is<LogLevel>(l => l == LogLevel.Information),
    It.IsAny<EventId>(),
    It.Is<It.IsAnyType>((v, t) => v.ToString() == "Start multiplying"),
    It.IsAny<Exception>(),
    It.Is<Func<It.IsAnyType, Exception, string>>((v, t) => true)));
    Assert.AreEqual(2, result);
}
```

## Resources

[AdvancedUnitTesting branch](https://github.com/HelmerDenDekker/TestDemoProject/tree/AdvancedUnitTesting)  
[Mocking ILogger with Moq](https://adamstorr.azurewebsites.net/blog/mocking-ilogger-with-moq)