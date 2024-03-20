# Standards: Unit testing

*7-9-2023*

Status: Work in progress

//ToDo: What do you want to tell about XUnit, and stick to this AND the standards

## Why use XUnit?

//ToDo: XUnit versus MsTests
I like the fact that XUnit has theory and facts

AND it has isolation-by-default because it creates an instance of the test class for each test
//ToDo: Rewrite!!

## Fact attribute

The most basic test method is a public parameterless method with the [Fact] attribute.

Example:

```cs
[Fact]
public void Add_ZeroToZero_ReturnsZero()
{
    // Arrange
    var stringCalculator = new StringCalculator();
    // Act
    var actual = stringCalculator.Add("0");
    // Assert
    Assert.Equal(0, actual);
}
```

## Working with Test data in XUnit

### InlineData

By using [Theory] you’ll get the opportunity to use test data in different ways. The most common attribute here
is [InlineData]

Example:  
example:

```cs
[Theory]
[InlineData(1, 2, 3)]
[InlineData(-4, -6, -10)]
[InlineData(-2, 2, 0)]
public void Add_NumberToNumber_ShouldReturnTheoryResult(int firstNumber, int secondNumber, int expected)
{
    //Arrange
    var calculator = new Calculator();
    //Act
    var result = calculator.Add(firstNumber, secondNumber);
    //Assert
    Assert.Equal(expected, result);
}
```

This eliminates the need to add test data in the test method itself. In addition, this gives you the opportunity to test
the method several times with different test data.

When you execute the test you will see that every test will create separate instances
//ToDo: Add a picture of the test performing

-----------------------------------------------------------------------------------------

//ToDo: NOT ACCORDING TO STANDARDS!!

### ClassData

If the values are not constant values you can use [ClassData] to specify the data. This attribute takes a Type which
xUnit will use to get the data.

An example of a type could be:

```cs
public class CalculatorAddTestData : IEnumerable<int[]>
{
     public IEnumerator<int[]> GetEnumerator()
     {
        yield return new int[] { 1, 2, 3 };
        yield return new int[] { -4, -6, -10 };
        yield return new int[] { -2, 2, 0 };
     }

     IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
}
```

You can implement the type like this:

```cs
[Theory]
[ClassData(typeof(CalculatorAddTestData))]
public void Add_NumberToNumber_ShouldReturnTheoryResult(int firstNumber, int secondNumber, int expected)
{
    //Arrange
    var calculator = new Calculator();
    //Act
    var result = calculator.Add(firstNumber, secondNumber);
    //Assert
    Assert.Equal(expected, result);
}
```

I am not a big fan of ClassData, because it centralizes your testdata, making it unclear what the test is about.

### MemberData

This attribute can be used to load data in the test.

Example:

```cs
public class CalculatorTests
{
    [Theory]
    [MemberData(nameof(CalculatorAddTestData))]
    public void Add_NumberToNumber_ShouldReturnTheoryResult(int firstNumber, int secondNumber, int expected)
    {
        //Arrange
        var calculator = new Calculator();
        //Act
        var result = calculator.Add(firstNumber, secondNumber);
        //Assert
        Assert.Equal(expected, result);
    }

    public static IEnumerable<int[]> CalculatorAddTestData =>
        new List<int[]>
        {
            new int[] { 1, 2, 3 },
            new int[] { -4, -6, -10 },
            new int[] { -2, 2, 0 },
        }
}
```

You can implement this in different ways. So, it’s also possible to create another class to split the data from the
testclass, like:

```cs
public class CalculatorTests
{
    [Theory]
    [MemberData(nameof(CalculatorTestData.CalculatorAddTestData), Membertype = typeof(CalculatorTestData))]
    public void Add_NumberToNumber_ShouldReturnTheoryResult(int firstNumber, int secondNumber, int expected)
    {
        //Arrange
        var calculator = new Calculator();
        //Act
        var result = calculator.Add(firstNumber, secondNumber);
        //Assert
        Assert.Equal(expected, result);
    }
}

public class CalculatorTestData
{
    public static IEnumerable<int[]> CalculatorAddTestData =>
        new List<int[]>
        {
            new int[] { 1, 2, 3 },
            new int[] { -4, -6, -10 },
            new int[] { -2, 2, 0 },
        }
}
```

Again, this centralizes your tes tdata, making it unclear what the test is about

//ToDo: Name some other unique features of XUnit

## Resources

[XUnit](https://xunit.net/)