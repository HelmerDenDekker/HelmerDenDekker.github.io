# About the repository pattern

*15-10-2024*

_Status: {Work in progress} {Idea}_  
_Type of post: {Opinion piece} {Guide} {Resource}_

## *Rapid fire thoughts*

Never test the database.

Think about the database as persistence.

The data should be persisted through the repository.

Use the repository pattern to abstract persistence.

For example: about the User Entity, this has the IUserRepository.

This may be implemented by a SqlServerUserRepository, a MongoUserRepository, a InMemoryUserRepository, FileUserRepository, TestFakeUserRepository, etc.


## *Outline*

## Generic versus Specific

The generic repository is a good fit for simple CRUD operations.

When specific queries are needed, a specific repository is a better fit.

### About Generic repository

Benefits:
- Reusability
- Reduced repetition (DRY)
- Consistent API

Drawbacks:
- Not specific
- Overgeneralization (too abstract)
- Performance (specific can be faster)
- Complexity

### About Specific repository

Benefits:
- Specific (tailored)
- Clear intent
- Performance (sometimes)

Drawbacks:
- Duplication of code accross interfaces
- Learning curve
- Maintenance concerns (update in multiple places)



## Generic repository

```csharp
public interface IRepository<T>
{
	T GetById(int id);
	IEnumerable<T> List();
	void Add(T entity);
	void Delete(T entity);
	void Update(T entity);
}
```

Concrete implementation

```csharp
public class MyEntitySqlServerRepository : IRepository<MyEntity>
{
	public MyEntity GetById(int id)
	{
		// Implementation
	}

	public IEnumerable<MyEntity> List()
	{
		// Implementation
	}

	public void Add(MyEntity entity)
	{
		// Implementation
	}

	public void Delete(MyEntity entity)
	{
		// Implementation
	}

	public void Update(TMyEntity entity)
	{
		// Implementation
	}
}
```

Using in a service

```csharp
public class UserService
{
	private readonly IRepository<User> _userRepository;

	public UserService(IRepository<User> userRepository)
	{
		_userRepository = userRepository;
	}

	public void AddUser(User user)
	{
		_userRepository.Add(user);
	}
}
```

## Specific repository

```csharp
public interface IUserRepository
{
	User GetByEmail(string email);
}
```

Concrete implementation

```csharp
public class UserSqlServerRepository : IUserRepository
{
	public User GetByEmail(string email)
	{
		// Implementation
	}
}
```

## Combined

```csharp
public class UserRepository : IRepository<User>, IUserRepository
{
	private readonly IRepository<User> _repository;

	public UserRepository(IRepository<User> repository)
	{
		_repository = repository;
	}

	public User GetByEmail(string email)
	{
		// Implementation
	}

	public User GetById(int id)
	{
		return _repository.GetById(id);
	}

	public IEnumerable<User> List()
	{
		return _repository.List();
	}

	public void Add(User entity)
	{
		_repository.Add(entity);
	}

	public void Delete(User entity)
	{
		_repository.Delete(entity);
	}

	public void Update(User entity)
	{
		_repository.Update(entity);
	}
}
```









## Resources
