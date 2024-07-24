# On the cutting edge of Blazor

*24-7-2024*

Status: Work in progress
Type of post: Opinion piece & Guide & Resource

## *Rapid fire thoughts*

Experience

What works, what does not.

## *Outline*

### About

Tech stack
- Blazor-server  
- dotNET 8
- ReactiveX

### The good

- works  
- stable
- one stack, no language-switching for devs.

### The bad

- signalR is for limited amount of users (limited amount of connections)
- very chatty with the server (lots of requests and responses)
- scaling issues
- slow when calling js interop
- Threat model. The threat model is different from front-end compared to backend. I have seen backend developers doing things they should never do in FE-side. It requires a mind-set switch! And I think that this is the more dangerous side of Blazor.
- No guarantee on data delivery with signalR. 
  - There is no guarantee that the data from the user will be delivered to the server.
  - There is no guarantee that the data from the server will be delivered to the user. 
  - This is not a theoretical problem, I have seen it happening in my empirical tests. 

### The ugly

- signalR connection lost. Shows ugly default dialog modal.
- server = down: means no website.
- no persistance


## Where to persist?

Suppose the user loses connection (swipes to another tab in the browser, or internet connection is lost), how do we persist the data?

We can reload the page for the user from the backend (which is default behaviour, see the ugly).
Or we can persist the data in the browser, and reload the data from the browser.

Or we can persist the data in the browser, and reload the data from the backend.

### LocalStorage

Going to the localstorage from the server is slow. So in a chatty application, this is not a good idea. You are never going to keep up.

So, my solution is to simply store a userId in the localstorage, and save the data in the backend.

So, we store the userId in the localstorage, and as we load a page, we take the userId from the localstorage, and load the data from the backend belonging to that userId. 

### Server goes down

Suppose the server goes down and comes back up. 
Whenever the user comes back, if using ProtectedLocalStorage, your key will be gone. You have to make arrangements for this.

So, suppose we tackled that, we need to get the data from the backend. Where is this data persisted? Not in memory, because then it is gone. The data needs to be stored in a persistent storage. Whenever the server restarts, gets a userId, it can get that data from the persistent store.





## Resources
