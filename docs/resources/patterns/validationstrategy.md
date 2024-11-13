# Using strategy pattern in dotNET for validation

*13-11-2024*

_Status: Idea_  
_Type of post:Guide_

## *Rapid fire thoughts*

ASP.NET Core MVC has a built-in validation mechanism.

Extend with the strategy pattern to add custom validation.

## *Outline*

ASP.NET Core MVC has a built-in validation mechanism. Data annotations are used to validate the model.

Custom attributes can be added to the model to extend the validation. Extend ValidationAttribute, implement IsValid.

Implement IValidatableObject to add custom validation to a class.


## Example

User model with custom validation.

```csharp
public class User : IValidatableObject
{
    [Required]
	public string Name { get; set; }
	
    [Required]
    [EmailAddress]
    public string Email { get; set; }

	public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
	{
		if (string.IsNullOrEmpty(Name))
		{
			yield return new ValidationResult("Name is required", new[] { nameof(Name) });
		}

		if (string.IsNullOrEmpty(Email))
		{
			yield return new ValidationResult("Email is required", new[] { nameof(Email) });
		}
	}
}
```

Default Validator strategy

```csharp
public interface IValidatorStrategy<T>
{
	bool IsValid(T model);
}
```

Default Validator strategy

```csharp
public class DefaultValidatorStrategy<T> : IValidatorStrategy<T>
{
	public bool IsValid(T model)
	{
		var results = Validate(model);
        
        return results.Count == 0;
	}
    
    private IList<ValidationResult> Validate(T model)
	{
		var context = new ValidationContext(model);
		var results = new List<ValidationResult>();
		Validator.TryValidateObject(model, context, results, true);
		return results;
	}
}
```


## Resources

[Kevin Docx, C# design patterns. Pluralsight](https://app.pluralsight.com/ilx/video-courses/8b818464-7d56-4f32-a307-04c7049540e1/ed810986-dc27-48ec-b386-efd773bcb6b5/e0a469f0-ed1c-43ac-8ed4-82724f5070bf)    
[Benjamin Day, Architecting an ASP.NET Core MVC for Unit testability. Pluralsight](https://app.pluralsight.com/ilx/video-courses/4129ac58-935c-4625-9b93-932cd0abd8ef/e5e84f06-3576-4f9d-a3e1-5b615cbe6213/68feddb1-5caa-49e2-a8ae-b375c061f522)
[Strategy pattern on Refactoring.Guru](https://refactoring.guru/design-patterns/strategy)  