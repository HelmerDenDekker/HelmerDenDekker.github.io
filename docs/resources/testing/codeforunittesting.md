# Code for unit testing: Create code with small units

*19-11-2020 - updated 10-10-2023*

Status: Work in progress

[//]: # (	ToDo :  This part is about writing testable code )

## Testing scenarios

What code to test?

- Business logic
- Code branches (for example if-statement)
- Bad data or input

My insider tips:

- Business logic is critical to your business, so it functioning correctly is important. Focus on good code coverage.
- Testing of all code branches as a dogma is a bad idea. Focus on the most important first, these with highest impact.
- Testing of bad data or input is best left to testers, these guys have the right (destructive) mindset to find
  scenario's you have never dreamt of. So leave the bad input/data up to the testers and users and whenever you find a
  bug, write a unit test for it.
- Only test things that were tested >2 times in a regression test. Regression or empirical testing has a high "return on
  investment" , you will find get a lot of results by just hitting the run-button in your IDE, much more than spending
  hours writing unit tests.

## Writing testable code

Write testable code.
There are two types of main functionality in methods: Either you give a command for something to execute, or you do a
query to retrieve results.

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

And for the sake of explaining why it is wrong, a mixed-style UpdateUserInfo is also added, which has a misleading name,
since it updates and returns, so it should be named UpdateAndGetUserInfo instead, since it does these two things. (
remember CUPID, code should do only one thing)

Developers write this type of code, because (they say) it is faster. It will return you a user immediately, instead of
having to do another call to the backend.

However these compound methods introduce complexity. The orchestration of what needs to happen should be seperated from
the concern of storing and fetching data.

## Use Stubs for unit testing query-style methods

For query-style methods always use stubs.

```cs
[TestClass]
public class UsersLogicQueryTest
{
    /// <summary>
    /// For a query always use a stub. A stub is lightweight and very fast
    /// </summary>
    [TestMethod]
    public void GetUserInfo_UserExistsInPersistence_ReturnsUser()
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

By the way: This is a very old example as you can see, stemming from the time, long ago, when my logic was dependent on
the repository pattern.

You can also use Mocks, but they are much heavier, and 60-80 times slower.

### The stub explained:

The UserLogic injects an IUserRepository.

The repository pattern decouples the data provider from your code. Logic points to the repository, the repository points
to data. This data can be stored in a database, a file, a class, a stub, wherever. This is decoupling at work.

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

This means that instead of the real user repository, pointing to the database in this case, it can be replaced by a
stub, which values we can control:

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

So what I have done, is introduce a happy scenario, where the repositories' FindById method will return a user, and an
unhappy scenario, where it will return null.

## Use Mocks for unit testing command-style methods

For command style methods, use mocks for testing.

Install the [NuGet Package “Moq”](https://www.nuget.org/packages/Moq)

In the arrange section:

- The user repository mock is initialized. Since mocking is only used for commands, you can use the interface. You only
  need to know what the method can do.
- The logic is created with the mocked object.
- The new user with the name Vincent is created, because I want to try to add a new user

In the act section, the <code>AddNewUser</code> method is called.

In the Assert section it is verified that the user was added. This is a happy scenario.

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

[//]: # (	ToDo: Denk aan wat je wilt vertellen en wijk daar niet van af!)
[//]: # ( ToDo: Onderstaande is niet passend, en ik verwacht hier een soort conclusie, Dus:) 
Kleine units code testen. Naamgeving. Test opzet. Command Query seperatie, zodat je goed kan
testen.

## Mocking Misuse

[//]: # (	ToDo :  Dit is dus een slecht voorbeeld, omdat het langzamer is. Laat dat ook zien in een test!)
Sometimes you have to use mocking to isolate and focus on the code being tested and not on the behavior or state of
external dependencies. With this technique the dependencies are replaced by closely controlled replacements objects that
simulate the behavior of the real ones.

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

Mocking is something you need to understand in order to apply it in your future unit tests. There is a information on
the internet about this, so you won’t find a tutorial in this article.
