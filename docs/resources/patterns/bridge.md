# Bridge Pattern

*13-11-2024*

_Status: {Work in progress}_  
_Type of post: {Guide} _

## *Rapid fire thoughts*

[//]: # ( ToDo: Review!)

If you have multiple notification mechanisms in a notification system, the bridge pattern is a good fit.

For, in this case, the client does not have a choice. It just wants to receive a notification.

Think about Woof! from The Office, send one message, get a fax, email, phone call, etc.

So, basically, it sounds about the same as the strategy pattern. It is not. In this case the client just sends. 

The bridge pattern is about decoupling the abstraction from the implementation.

The Service interface may look like this:

```csharp
public interface IService
{
	void Send(string message);
}
```

For the client, it is just about sending. The implementation is abstracted away.

Next the mechanisms, the concrete implementations:

```csharp
public class NotificationService
{
	private readonly INotificationSender _notificationSender;

	public NotificationService(INotificationSender notificationSender)
	{
		_notificationSender = notificationSender;
	}

	public void SendNotification(string message)
	{
		_notificationSender.Send(message);
	}
}
```


## *Outline*

## Resources
