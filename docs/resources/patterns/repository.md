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
- Over-generalization (too abstract)
- Performance (specific can be faster)
- Complexity (more layers)

### About Specific repository

Benefits:
- Specific (tailored)
- Clear intent
- Performance (sometimes)

Drawbacks:
- Duplication of code across interfaces
- Learning curve
- Maintenance concerns (update in multiple places)



## Generic repository

```csharp
public interface IRepository<T>
{
    Task<T?> GetAsync(int id);
    Task<IEnumerable<T>> GetAsync();
    void Add(T entity);
    void Delete(T entity);
    void Update(T entity);
    Task SaveChangesAsync(); // Or in Unit of Work
}
```

Additional methods can be added as needed. For example a Find with a filter method like this:

```csharp
public interface IRepository<T>
{
    Task<T?> GetAsync(int id);
    Task<IEnumerable<T>> GetAsync();
    void Add(T entity);
    void Delete(T entity);
    void Update(T entity);
    Task SaveChangesAsync(); // Or in Unit of Work
    Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate);
}
```

That last one is really smart!! It allows me to filter on the repository, from the Service where the filter is used.
So I think (!) that this allows me to test my filter in the service, and both have a performant query on the DB side. I want to benchmark this so bad!


Concrete implementation

```csharp
public class EntityFrameworkRepository<T> : IRepository<T> where T: class
{
    private readonly MyDbContext _context;
    private DbSet<T> _dbSet;
    
    public EntityFrameworkRepository(MyDbContext context)
    {
        _context = context;
        _dbSet = _context.Set<T>();
    }
    
    public async Task<T?> GetAsync(int id)
    {
        return await _dbSet.FindAsync(id);
    }
    
    public async Task<IEnumerable<T>> GetAsync()
    {
        return await _dbSet.ToListAsync();
    }
    
    public void Add(T entity)
    {
        _dbSet.Add(entity);
    }
    
    public void Delete(T entity)
    {
        _dbSet.Remove(entity);
    }
    
    public void Update(T entity)
    {
        // no code is required in the update method as changes are tracked by the context
    }
    
    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
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

    public Task AddUser(User user)
    {
        _userRepository.Add(user);
        await _userRepository.SaveChangesAsync();
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
public class UserRepository : IUserRepository
{
    private readonly MyDbContext _dbContext;
    
    public UserRepository(MyDbContext context)
    {
        _dbContext = context;
    }

    public User GetByEmail(string email)
    {
        return _dbContext.Users.FirstOrDefault(u => u.Email == email);
    }
}
```

## Combined

Just implement the generic interface in the specific repository.

```csharp
public interface IUserRepository : IRepository<User>
{
    User GetByEmail(string email);
}
```


The resulting implementation

```csharp
public UserRepository : EntityFrameworkRepository<User>, IUserRepository
{
    private readonly MyDbContext _dbContext;
    
    public UserRepository(MyDbContext context) : base(context)
    {
    }

    public User GetByEmail(string email)
    {
        return _dbSet.FirstOrDefault(u => u.Email == email);
    }
}
```






## Resources
