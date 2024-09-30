# Unit testing attributes

*30-9-2024*

Type of post: Resource

## It is possible to unit test attributes

Unit testing is very simple:

```csharp
[Test]
public void SomeController_Should_HaveAttribute(){
    // Arrange and act
    var attribute = Attribute.GetCustomAttribute(typeof(SomeController), typeof(AuthorizationAttribute));

    // Assert
    Assert.NotNull(attribute);
    var actual = attribute as AuthorizationAttribute;
    Assert.AreEqual("SomePolicy", actual.Policy); // for example
}
```

You can assert whatever you need.

## Why should one test attributes?

In my experience:
Because of quality assurance reasons. If you have a policy that all controllers should have an attribute, you can enforce this policy by writing a unit test.

In that case, if some developer forgets to add an attribute, the unit test will fail, and the developer and code reviewers will be notified.


