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

Use Data Annotations.
Use attributes.

Rule 1: For validation rules, use the CustomAttribute. 
Rule 2: For (VERY!!) custom validation, use IValidatableObject.

## Validation rules

Use the custom validation attribute for shared validation rules.

For example a DateTimeCompareAttribute by Benjamin Day

```csharp
public class DateTimeCompareValidatorAttribute : ValidationAttribute
{
	private readonly DateTimeCompare _compareType;
	private readonly string _otherPropertyName;

	public DateTimeCompareValidatorAttribute(DateTimeCompare comparison, string otherPropertyName)
	{
		_comparison = comparison;
		_otherPropertyName = otherPropertyName;
	}

	protected override ValidationResult IsValid(object value, ValidationContext validationContext)
	{
		if (value == null)
			return ValidationResult("Value cannot be null");
        
        DateTime valueAsDateTime;
        
        if(!DateTime.TryParse(value.ToString(), out valueAsDateTime))
			return new ValidationResult("Value is not a valid date");
        
        object otherPropertyInfo = validationContext.ObjectInstance.GetType().GetProperty(_otherPropertyName);
        
        if(otherPropertyInfo == null)
            return new ValidationResult($"Invalid property name other property");
        
        var otherValue = otherPropertyInfo.GetValue(validationContext.ObjectInstance);
        
        if(otherValue == null)
			return new ValidationResult("Other value cannot be null");
        
        DateTime otherValueAsDateTime;
		
		if(!DateTime.TryParse(otherValue.ToString(), out otherValueAsDateTime))
            			return new ValidationResult("Other value is not a valid date");
		
		switch(_comparison)
		{
			case DateTimeCompare.LessThan:
				if(valueAsDateTime < otherValueAsDateTime)
					return ValidationResult.Success;
				break;
			case DateTimeCompare.LessThanOrEqual:
				if(valueAsDateTime <= otherValueAsDateTime)
					return ValidationResult.Success;
				break;
			case DateTimeCompare.Equal:
				if(valueAsDateTime == otherValueAsDateTime)
					return ValidationResult.Success;
				break;
			case DateTimeCompare.GreaterThan:
				if(valueAsDateTime > otherValueAsDateTime)
					return ValidationResult.Success;
				break;
			case DateTimeCompare.GreaterThanOrEqual:
				if(valueAsDateTime >= otherValueAsDateTime)
					return ValidationResult.Success;
				break;
			default:
				return new ValidationResult($"Comparison is not valid for {_comparison}");
		}

		return new ValidationResult($"Comparison is not valid for {_comparison}");
	}
}
```

And use it like this:

```csharp
public class User
{
	[Required]
	public string Name { get; set; }

	[Required]
	[EmailAddress]
	public string Email { get; set; }

	[DateTimeCompareValidator(DateTimeCompare.GreaterThan, "StartDate")]
	public DateTime EndDate { get; set; }

	public DateTime StartDate { get; set; }
}
```


## Custom validation

Use IValidatableObject to add custom validation to a class.

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
        if (Name == "admin")
        {
            yield return new ValidationResult("Name cannot be admin", new[] { nameof(Name) });
        }
    }
}
```

This adds the validation logic to the model.

## Custom validator

To have more control over the validation, for unit testing:

```csharp
public class DefaultValidator<T> : IValidator<T>
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

Implement like this:

```csharp
public class UserController : Controller
{
    private readonly IValidator<User> _validator;

    public UserController(IValidator<User> validator)
    {
        _validator = validator;
    }

    [HttpPost]
    public IActionResult Post(User user)
    {
        if (!_validator.IsValid(user))
        {
            return BadRequest();
        }

        // Save user
        return Ok();
    }
}
```



# Benjamin Day and the Strategy pattern

User model validation.

```csharp
public class User
{
    [Required]
    public string Name { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }
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
Controller

```csharp
public class UserController : Controller
{
    private readonly IValidatorStrategy<User> _validator;

    public UserController(IValidatorStrategy<User> validator)
    {
        _validator = validator;
    }

    [HttpPost]
    public IActionResult Post(User user)
    {
        if (!_validator.IsValid(user))
        {
            return BadRequest();
        }

        // Save user
        return Ok();
    }
}
```



## Conclusion

Why should I use the strategy pattern for this? I have no use case for multiple strategies.

Validation rules are about the object you are working with. See input/output validation.

I think it is very true and okay for object to be self-validating. Keeping the distance between this knowledge/business rules and the object as small as possible.

## My view and take on this


- Classes should be self-validating (from DDD)





## Resources

[Kevin Docx, C# design patterns. Pluralsight](https://app.pluralsight.com/ilx/video-courses/8b818464-7d56-4f32-a307-04c7049540e1/ed810986-dc27-48ec-b386-efd773bcb6b5/e0a469f0-ed1c-43ac-8ed4-82724f5070bf)    
[Benjamin Day, Architecting an ASP.NET Core MVC for Unit testability. Pluralsight](https://app.pluralsight.com/ilx/video-courses/4129ac58-935c-4625-9b93-932cd0abd8ef/e5e84f06-3576-4f9d-a3e1-5b615cbe6213/68feddb1-5caa-49e2-a8ae-b375c061f522)
[Strategy pattern on Refactoring.Guru](https://refactoring.guru/design-patterns/strategy)  