# Adapter pattern

*13-11-2024*

Status: Work in progress  
Type of post: Guide


## *Outline*

Convert one class/object into another class/object.

## Implementation

The User class is the adaptee, the class that needs to be adapted:

```csharp	
public class User
{
	public string FirstName { get; set; }
	public string LastName { get; set; }
	public string Email { get; set; }
}
```

The Account class is the class I need in my application:

```csharp
public class Account
{
	public string FullName { get; set; }
	public string EmailAddress { get; set; }
}
```
### Use an interface or an extension?

#### Interface
Adapter class:

```csharp
public interface IAccountAdapter
{
	Account ToAccount(User user);
} 
```

```csharp
public class AccountAdapter : IAccountAdapter
{
	public Account ToAccount(User user)
	{
		return new Account
		{
			FullName = $"{user.FirstName} {user.LastName}",
			EmailAddress = user.Email
		};
	}
}
```

#### Extension 
I could also use an extension method to convert the Account to a User.

```csharp
public static class UserExtensions
{
	public static Account ToAccount(this User user)
	{
		return new Account
		{
			FullName = $"{user.FirstName} {user.LastName}",
			EmailAddress = user.Email
		};
	}
}
```

### Rationale

The dogma will tell you to always program against an interface. And not an implemented class.

However: what is the goal here?
- Convert User to Account.
- Test this dependency separately.

#### Option 1: Interface

Benefits:
- Clear separation of concerns, an adapter only converts.
- Ability to mock the adapter in tests

Disadvantages:
- More code (dependency injection, interface)
- A bit slower due to dependency injection that needs to find the service
- Harder to follow in IDE and debug

#### Option 2: Extension

Benefits:
- Cleaner code, easier to read, follow and debug
- Faster, no dependency injection needed

Disadvantages:
- Harder to test classes pointing to the extension.

### Conclusion

Use the interface if you need to mock the adapter in tests. Use the extension method if you do not need to mock the adapter.

If the logic is simple, use extension.


## Resources

No external resources used, just my own thoughts and some inspiration from Kevin Docx on Pluralsight.