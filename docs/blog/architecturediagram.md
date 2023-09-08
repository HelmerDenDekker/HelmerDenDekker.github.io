# How to choose an architecture diagram tool
*8-9-2023*

For one of the companies I worked for I investigated a number of tools for creating architecture diagrams. 

## Requirements

Maybe not as strict as requirements, but general ideas or guidelines:
- documentation should be part of the code
- agility: it must be easy to change, because architecture is alive

## Rationale

### Option 1: Microsoft Visio

[Microsoft Visio](https://www.microsoft.com/en-us/microsoft-365/visio/flowchart-software) is an application to create flowcharts and diagrams.

Benefits:
- Microsoft product, reliable party
- Collaboration is possible

Disadvantages:
- Commercially licensed as part of Microsoft 365, not installed by default for my company.
- Creating your architecture diagram takes a long time (in my experience, compared to C4)
- Agility, you need the application on your account, on your laptop.  

I have no experience with this program apart from the functionality advertised on the website.  

### Option 2: diagrams.net

[Diagrams.net](https://app.diagrams.net/), formerly known as draw.io, is an online free app to create diagrams and flowcharts, much like Visio.

Benefits
- Agility: Online application, easy access from any device
- Easy to learn, quick results
- Collaboration is possible (minus: with Google drive)  

Disadvantages
- Creating your architecture diagram takes a long time (in my experience, compared to C4)
- Agility: Altering small details can take up a lot of time.
- Versioning needs lot of attention.  

I have used draw.io in the past, and tried it for creating diagrams. You need to save multiple files to your repository, an SVG containing the newest data and the source file to alter it in draw.io. I kept forgetting to save, or update either one, leaving me with outdated files of either one or both of them. Or the SVG would look terrible. This does not work if you are busy or just a functioning chaotic like me.

### Option 3: Excalidraw

[Excalidraw](https://excalidraw.com/) is an application for sketching. It is fun and fast and I use it all the time (also for this blog).

Benefits
- Agility: Online application, easy access from any device
- Easy to learn, quick results
- Collaboration is possible
- Versioning, works with SVG

Disadvantages
- Creating your architecture diagram is faster than Visio and Diagrams.net, because it is a bit more intuitive. However, it is still slower than C4.
- It looks sketchy (I mean coarse, as in not official)

I have lots of experience with Excalidraw. I just save my pictures as SVG, and add them to the git repository. I let the repository do the versioning for me. You can just take the SVG-file, drag it into excalidraw, change it, export it as SVG, and: new version! For me, this works like a dream.
I use excalidraw to explain things quickly during meetings. Once, I did a full presentation just using Excalidraw. I quite like it.

### Option 4: C4 Model and plantUml

[UML: Unified modeling language](https://en.wikipedia.org/wiki/Unified_Modeling_Language). Sounds very cool when you are a programmer with a mechanical engineering background. Love it!  

With UML you can create diagrams using language. Creating something visual from plain text is what you do as a developer, right? So this sounds great.

Benefits
- Agility: You can just go to the repo and change the code, this will lead to a new diagram
- Picture-from-code generation
- Collaboration is possible through GIT
- Versioning through GIT
- Fast!
- Looks official
- Uniform way of modelling
- Uniform looks.
- You can generate diagrams from code

Disadvantages
- You need Java to generate the diagram, which may represent a problem for your company, or not. It is licensed. There are workarounds for this, but that blows away all of the benefits.
- Hard to learn if you are not a developer.

I have lots of experience, and I use the diagrams, sequence diagrams, database models, gantt charts and mind maps. It is fast. Change a detail, save, commit&push. Faster than anything else.  

However, since it is auto-generated it will never look perfect (as the picture in your head - kind of thing), but for all of the applications the diagrams will look the same. And that is a big benefit, since in my experience, it makes it a lot easier to communicate with the solutions architect, enterprise architect and the developers from the other teams. You do not have to explain the picture, since it is clear what you are talking about.

### Conclusion

It is a close call:
Excalidraw is easy for everyone, has sort of a uniform look and works with svg.
PlantUML is a lot faster once setup, has guaranteed uniform looks and is great for developers. However it needs Java to generate the SVG.

It is up to you to decide. 
Excalidraw is used extensively in [HelmerdenDekker.GitHub.io](https://github.com/HelmerDenDekker/HelmerDenDekker.github.io) for the SVG files in the blogs. The C4 model with plantUML is used less often.
The C4 model is used in a lot of my private repositories and [the webshop demo](https://github.com/HelmerDenDekker/HelmerDemo.WebShop)

## Resources

[PlantUML Quick start Guide](https://plantuml.com/starting)  