# Standards: Unit testing

*19-11-2020 - updated 10-10-2023*

Status: Work in progress

## About Unit testing

### Definition of the unit

On the internet, and in developer communities there is lots of discussion about what a unit is.

Definition:

The “Unit” is a single method or function. This method or function does one thing in a predictable manner.

### Properties of a unit test

Unit tests should have the following properties:

##### Fast

A unit test should take milliseconds to run. Mature projects can contain thousands of unit tests, and you should be able
to check quickly if your changes broke the application code.

##### Isolated

Unit tests are standalone, can be run in isolation and have no dependencies on any outside factors. You should be able
to run the tests in any order and independent of one another.

##### Repeatable

Running a unit test should be consistent with its results, that is, it always returns the same result if you don’t
change anything in between runs.

##### Trustworthy

The test outcome should be trustworthy. The test should indicate the software is correct. If you doubt about the outcome
of a test (for example 1+1=3), it has no added value.

##### Self-checking

The test should be able to automatically detect if the test passed or failed without human interaction. This is an open
door, since this article is about automated testing

##### Valuable

Tests should be valuable. They should add value, you should not write tests for the sake of code coverage.

##### Timely

Write testable code. Writing an unit test shouldn’t take a long time to write compared to the code being tested. If you
find testing the code taking a large amount of time compared to writing the code, consider a design that is more
testable.

### Naming Convention for the unit test

The name of your test should consist of three parts:

- Method name: The name of the method being tested.
- State under test: The scenario under which it's being tested.
- Expected behaviour: The expected behavior when the scenario is invoked.

```cs
MethodName_StateUnderTest_ExpectedBehavior
```

#### For Example

Do not:

```cs
[Fact]
public void Test_Single()
{
    var stringCalculator = new StringCalculator();
    var actual = stringCalculator.Add("0");
    Assert.Equal(0, actual);
}
```

The naming conventions for the test name are not implemented, when Test_Single fails as a developer you have no idea
what fails.

Do:

```cs
[Fact]
public void Add_ZeroToZero_ReturnsZero()
{
    var stringCalculator = new StringCalculator();
    var actual = stringCalculator.Add("0");
    Assert.Equal(0, actual);
}
```

On test failure, you see immediately what goes wrong: Adding the number zero to the number zero does not return zero.

### Test structure

Follow the “Arrange, Act, Assert”-pattern. This makes your tests much better readable for other developers

##### Arrange

Set up the "System under test", create the test objects, initialize test data.

Initialize the test data in your arrange section, so you see immediately what data is tested in this test. In some
examples on the internet you will find centralized test data. I never centralize test data, because when someone changes
this test data, you have no idea which tests it will affect, and in the test you have to look up what the testcase is.

##### Act

Cause an effect in the "System under test", call a method or set a property

##### Assert

Assert that the returned value or end state is as expected.

#### Example:

In this example the test is split up into the proper sections, making it easier to read.

```cs
[Fact]
public void AddValuesToList_AddFourValuesToList_ReturnsListWithFourItems()
{
    // Arrange
    var list = new List<int>();
    int[] initialIntegers = { 1, 2 };
    int[] chainedIntegers = { 3, 4 };

    // Act
    list.AddValuesToList(initialIntegers);
    list.AddValuesToList(chainedIntegers);

    // Assert
    Assert.IsTrue(list.Count == 4);
    Assert.IsTrue(list.Contains(1));
    Assert.IsTrue(list.Contains(4));
}
```

### Code coverage

A high code coverage isn’t an indicator of success, nor does it imply high code quality. It represents the amount of
code that is covered by unit tests. That’s why we don’t set a minimum percentage for the code coverage. It’s important
to cover the logic code.

## Resources

[Helmers GitHub](https://github.com/HelmerDenDekker/TestDemoProject)