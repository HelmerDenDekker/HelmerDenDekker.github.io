# Standards: Unit testing
*19-11-2020 - updated 6-9-2023*

Status: Work in progress

## About Unit testing

### Definition of the unit

On the internet, and in developer communities there is lots of discussion about what a unit is.  

Definition:

The “Unit” is a single method or function. This method or function does one thing in a predictable manner.  

### Properties

- Fast
    - A unit test should take milliseconds to run. Mature projects can contain thousands of unit tests, and you should be able to check quickly if your changes broke the application code.
- Isolated
    - Unit tests are standalone, can be run in isolation and have no dependencies on any outside factors
- Repeatable
    - Running a unit test should be consistent with its results, that is, it always returns the same result if you don’t change anything in between runs
- Self-checking
    - The test should be able to automatically detect if the test passed or failed without human interaction
- Timely
    - Writing an unit test shouldn’t take a long time to write compared to the code being tested. If you find testing the code taking a large amount of time compared to writing the code, consider a design that is more testable.

## Naming Conventions

The name of your test should consist of three parts:
- Method name: The name of the method being tested.
- State under test: The scenario under which it's being tested.
- Expected behaviour: The expected behavior when the scenario is invoked.

```cs
MethodName_StateUnderTest_ExpectedBehavior
```

### For Example

Bad example:

```cs
[Fact]
public void Test_Single()
{
    var stringCalculator = new StringCalculator();
    var actual = stringCalculator.Add("0");
    Assert.Equal(0, actual);
}
```
The naming conventions for the test name are not implemented, when Test_Single fails as a developer you have no idea what fails.

Better example:

```cs
[Fact]
public void Add_ZeroToZero_ReturnsZero()
{
    var stringCalculator = new StringCalculator();
    var actual = stringCalculator.Add("0");
    Assert.Equal(0, actual);
}
```

If this test fails, as a developer you can directly see what functionality fails: Adding the number zero to the number zero does not return zero.

## Test structure

Follow the “Arrange, Act, Assert”-pattern. By applying this we ensure that the different steps are separated. 

- Arrange
    - Arrange your objects, create and set them up as necessary
- Act
    - Act on an object
- Assert
    - Assert that something is as expected.

The testdata is in the Arrange part of the test.

In this case you can immediately find what data is tested in this test. In some examples on the internet you will find centralized test data. We will not centralize testdata, because when someone changes this testdata, you have no idea which tests it will affect, and in the test you have to look up what the testcase is.

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

## Code coverage

A high code coverage isn’t an indicator of success, nor does it imply high code quality. It represents the amount of code that is covered by unit tests. That’s why we don’t set a minimum percentage for the code coverage. It’s important to cover the logic code.

## Code for unit testing: Create code with small units

There are two types of main functionality in functions: Either you give a command for something to execute, or you do a query to retrieve results.

The UserLogic in the TestDemo project has a good example:

```cs
public interface IUserLogic
	{
        public UserInfoDto GetUserInfo(int userId);

        public void AddNewUser(NewUserDto newUser);

        public UserInfoDto UpdateUserInfo(UserInfoDto userInfo);

    }
```

IUserLogic has a query-style method called GetUserInfo, returning UserInfo in a data transfer object (DTO) model.

It has a command-style method called AddNewUser, which adds a new user.

And for the sake of explaining why it is wrong, a mixed-style UpdateUserInfo is also added, which has a misleading name, since it updates and returns, so it should be named UpdateAndGetUserInfo instead, since it does these two things. (remember CUPID, code should do only one thing)

Developers write this type of code, because (they say) it is faster. It will return you a user immediately, instead of having to do another call to the backend. 

However these compound methods introduce complexity. Because in the front end also simplicity is the best. If the user updated a single record, a front end developer can just make the overview table data refetch, so all new info is shown. If the back-end developer returns the updated info, because it is faster, the user might miss out on other info changed while the user was updating the info, and more similar problems. So most of the time, making things complex to make them faster does not work. Like I now need to type a lot of lines to convince you why this is wrong, it would have saved me a lot of time just keeping things simple. Right? Please keep this in mind.

### Use Stubs for unit testing query-style methods  

For query-style methods always use stubs.

```cs
[TestClass]
public class UsersLogicQueryTest
{
    /// <summary>
    /// For a query always use a stub. A stub is lightweight and very fast
    /// </summary>
    [TestMethod]
    public void GetUserInfo_UserExistsInPersistance_ReturnsUser()
    {
        //Arrange
        var userRepository = new UserRepositoryStub();
        userRepository.IsHappy = true;
        var logic = new UserLogic(userRepository);

        //Act
        var result = logic.GetUserInfo(1);

        //Assert
        Assert.IsNotNull(result);
        Assert.AreEqual("Helmer", result.UserName);
    }
}
```

You can also use Mocks, but they are much heavier, and 60-80 times slower. (for Mocking, see Advanced unit Testing)

#### The stub explained:

The UserLogic injects an IUserRepository.

The repository pattern decouples the dataprovider from your code. Logic points to the repository, the repository points to data. This data can be stored in a database, a file, a class, a stub, wherever. This is decoupling at work.

```cs
public class UserLogic : IUserLogic
{
    private readonly IUserRepository _userRepository;

    public UserLogic(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }
...
}
```


This means that instead of the real user repository, pointing to the database in this case, it can be replaced by a stub, which values we can control:

```cs
internal class UserRepositoryStub : IUserRepository
    {
        /// <summary>
        /// I added this extra boolean for an unhappy scenario, to show you can extend the sub.
        /// </summary>
        public bool IsHappy { get; set; }

        public User FindById(int id)
        {
            if (!IsHappy)
                return null;
            var user = new User { Id = 1, UserName = "Helmer" };
            return user;
        }
...
}
```
So what I have done, is introduce a Happy scenario, where the repositories' FindById method will return a user, and an unhappy scenario, where it will return null.

### Use Mocks for unit testing command-style methods

For command style methods, use mocks for testing.

To use mocking install the [NuGet Package “Moq”](https://www.nuget.org/packages/Moq)

 Install the Moq nuget package.

```cs
[TestClass]
public class UserLogicCommandTest
{
    [TestMethod]
    public void AddUser_should_AddUser()
    {
        //Arrange
        var userRepository = new Mock<IUserRepository>();
        var logic = new UserLogic(userRepository.Object);
        var newUser = new NewUserDto{UserName = "Vincent"};

        //Act
        logic.AddNewUser(newUser);

        //Assert
        userRepository.Verify(repo=>repo.AddUser(It.IsAny<User>()));
    }
}
```

In the arrange section, arrange the mock setup. In this case we try to add a new user Theo, in the Assert section it is verified that the user was added. This is a happy scenario.

//ToDo: Denk aan wat je wilt vertellen en wijk daar niet van af! Onderstaande is niet passend, en ik verwacht hier een soort conclusie, Dus: Kleine units code testen. Naamgeving. Test opzet. Command Query seperatie, zodat je goed kan testen. 

### Mocking

Sometimes you have to use mocking to isolate and focus on the code being tested and not on the behavior or state of external dependencies. With this technique the dependencies are replaced by closely controlled replacements objects that simulate the behavior of the real ones. 

Example:

```cs
[Fact]  
public async void GetEmployeebyId()  
{  
  mock.Setup(p => p.GetEmployeebyId(1)).ReturnsAsync("JK");  
  EmployeeController emp = new EmployeeController(mock.Object);  
  string result = await emp.GetEmployeeById(1);  
  Assert.Equal("JK", result);  
} 
```

Mocking is something you need to understand in order to apply it in your future unit tests. There is a information on the internet about this, so you won’t find a tutorial in this article.

## Resources

[Helmers GitHub](https://github.com/HelmerDenDekker/TestDemoProject)