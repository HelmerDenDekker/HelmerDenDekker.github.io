# MSTest versus NUnit versus MSTest
*10-10-2023*

Status: Work in progress

## Differences

What is the difference compared to MSTest and XUnit?

### NUnit  
287 million downloads on nuget (10-10-2023)  
Suitable for Test Driven Development (TDD), because of "automated"  test scenarios.  
Attribute-rich, there is an attribute for every situation and otherwise create custom ones yourself  

### xunit
370 million downloads on nuget (10-10-2023)  
Cleanest framework: Has the least amount of attributes possible.  
For me: I like the Fact and Theory attributes. Fact is comparable to the Test attribute and Theory is for parametrized tests. 
Default test isolation, since it creates an instance per test. Nice, because this is one of the properties of a good unit test, and you get it for free here!
You might need to write a lot of "your own" code in xunit, in the constructor or using IDisposable. You may have opinions about the readability of the code in the different frameworks. Some like the attributes making it clear what the piece of code is for. Others find it annoying and cluttering, so it is up to you.

### MSTest
218 million downloads on nuget (10-10-2023)  
Used to be the "default" test framework shipped with Visual studio.
This is "in the middle" compared to the other two,


### Attributes

The most important differences between the testing frameworks:

| Description                               | NUnit              | MSTest                 | xunit                       |
|-------------------------------------------|--------------------|------------------------|-----------------------------|
| Individual Test                           | [Test]             | [TestMethod]           | [Fact]                      |
| Test Class                                | [TestFixture]*     | [TestClass]            | N.A.                        |
| Test Initialization                       | [SetUp]            | [TestInitialize]       | Constructor                 |
| Test Cleanup                              | [TearDown]         | [TestCleanup]          | IDisposable Dispose         |
| Test Class Initialization                 | [OneTimeSetUp]     | [ClassInitialize]      | IClassFixture<T>            |
| Test Class Cleanup                        | [OneTimeTearDown]  | [ClassCleanup]         | IClassFixture<T>            |
| Per-collection fixture setup and teardown | -                  | N.A.                   | ICollectionFixture<T>       |
| Ignore a test                             | [Ignore("reason")] | [Ignore]               | [Fact(Skip="reason")]       |
| Categorize                                | [Category("name")] | [TestCategory("name")] | [Trait("Category","name")] |

In NUnit you are free to create all the custom attributes you want based on NUnit interfaces, and it has the [TestFixtureSetUp] and [TestFixtureTearDown] attributes for code to be called before executing a test. The [TestFixture] attribute in NUnit is optional.

In MSTest there are the [AssemblyInitialize] attribute and the [AssemblyCleanUp] attribute to call before and after execution of tests in the assembly.

MsTest uses [ExpectedException] attribute, versus Assert.Throw in xunit and Throws() in NUnit. For MSTest/NUnit you might miss exceptions, while xunit catches them all.

NUnit and xunit can both test multiple scenarios on one test using the [Theory] attribute for xunit and a range of specific attributes for specific cases in NUnit.

## Resources

[NUnit vs. XUnit vs. MSTest: Comparing Unit Testing Frameworks In C#](https://www.lambdatest.com/blog/nunit-vs-xunit-vs-mstest/)
[Test code examples in HelmerDemo.WebShopDemo repo](https://github.com/HelmerDenDekker/HelmerDemo.WebShopDemo)