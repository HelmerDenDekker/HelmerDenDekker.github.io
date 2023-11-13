# Standards: Web API
*6-9-2023*

Status: Work in progress

## Guidelines

The API must have:

- Clean plural nouns as endpoints
- Dumb controllers
- Versioning
- PascalCase for naming attributes

The API should:

- Use Swagger/ OpenApi
- return in JSON format


## Uniform interface

//ToDo: Check restfulapi guidelines [What is REST - restfulapi.net](https://restfulapi.net/)

### Clean nouns

Use the Http verbs for the actions, but not in the naming of your endpoint. So like this:

| Resource      | POST             | GET                 | PUT             | DELETE          |
|---------------|------------------|---------------------|-----------------|-----------------|
| /dogs         | create a new dog | return list of dogs | update dog(s)   | -               |
| /dogs/{dogId} | -                | return this dog     | update this dog | delete this dog |

Parent-child relations:

'owners/{ownerId}/dogs'

### Return these HTTP statuscodes

The table shows which action to return, but please stick to the logic that is described here: [Codes to return - restfulapi.net](https://restfulapi.net/http-status-codes/)

| When?         | POST                        | GET                         | PUT                         | DELETE                      |
|---------------|-----------------------------|-----------------------------|-----------------------------|-----------------------------|
| Success       | 201 - Created               | 200 - Ok                    | 201 - Created               | 204 - No content            |
| No data       | -                           | 204 - NoContent             | -                           | -                           |
| Bad request   | 400 - Bad Request           | -                           | 400 - Bad Request           | 400 - Bad Request           |
| Unauthorized  | 401 - Unauthorized          | 401 - Unauthorized          | 401 - Unauthorized          | 401 - Unauthorized          |
| Forbidden     | 403 - Forbidden             | 403 - Forbidden             | 403 - Forbidden             | 403 - Forbidden             |
| No resource   | 404 - Not found             | 404 - Not found             | 404 - Not found             | 404 - Not found             |
| Server error  | 500 - Internal Server Error | 500 - Internal Server Error | 500 - Internal Server Error | 500 - Internal Server Error |

200: Use when the API successfully carried out the request action, and there is not a more appropriate, more specific code in the 2xx series. SHOULD include response body. (GET + response resource, HEAD + response resource without message-body, POST + result, TRACE + request message received by server).  
201: Use whenever a new resource is created. The newly created resource can be referenced by the URI(s) returned in the entity of the response, with the most specific URI for the resource given by a Location header field. The origin server MUST create the resource before returning the 201 status code. If the action cannot be carried out immediately, the server SHOULD respond with a 202 (Accepted) response instead.
202: actions that take a long while to process. It indicates that the request has been accepted for processing, but the processing has not been completed. The request might or might not be eventually acted upon, or even maybe disallowed when processing occurs. The entity returned with this response SHOULD include an indication of the request’s current status and either a pointer to a status monitor (job queue location) or some estimate of when the user can expect the request to be fulfilled.  
204: Use when the REST API declines to send back any status message or representation in the response message’s body. The 204 response MUST NOT include a message-body and thus is always terminated by the first empty line after the header fields

400: use as generic client-side error status, used when no other 4xx error code is appropriate. Errors can be like malformed request syntax, invalid request message parameters, or deceptive request routing etc. The client SHOULD NOT repeat the request without modifications.
401: Indicates that the request requires user authentication information. The client MAY repeat the request with a suitable Authorization header field.
403: Unauthorized request. The client does not have access rights to the content. Unlike 401, the client’s identity is known to the server. Authentication will not help, and the request SHOULD NOT be repeated.
404: The server can not find the requested resource. So: The endpoint is not found on the server! If the endpoint exists, but there is no data available, send a 204 No content. The 410 (Gone) status code SHOULD be used if the server knows, through some internally configurable mechanism, that an old resource is permanently unavailable and has no forwarding address. 

500: The server encountered an unexpected condition that prevented it from fulfilling the request



## Versioning

//ToDo: check the restfulapi guidelines [Versioning - restfulapi.net](https://restfulapi.net/versioning/)
[SO - on versioning](https://stackoverflow.com/questions/42371582/asp-net-api-versioning)
### Example
In the Helmer.DemoWebshop it is implemented like this:
[Versioning in the base-controller](https://github.com/HelmerDenDekker/HelmerDemo.WebShop/blob/8398257caab7d848f3f679dc5e7ffca517621fed/HelmerDemo.WebShop.Presentation/Helpers/BaseApiController.cs#L9)

[Versioning in the controllers - ApiVersion attribute](https://github.com/HelmerDenDekker/HelmerDemo.WebShop/blob/8398257caab7d848f3f679dc5e7ffca517621fed/HelmerDemo.WebShop.Presentation/Controllers/CustomerController.cs#L7)

[Versioning in the Program](https://github.com/HelmerDenDekker/HelmerDemo.WebShop/blob/8398257caab7d848f3f679dc5e7ffca517621fed/HelmerDemo.WebShop.Presentation/Program.cs#L47-L52)

[Versioning in the Program - Swagger](https://github.com/HelmerDenDekker/HelmerDemo.WebShop/blob/8398257caab7d848f3f679dc5e7ffca517621fed/HelmerDemo.WebShop.Presentation/Program.cs#L71-L78)

## Resources

[What is REST - restfulapi.net](https://restfulapi.net/)