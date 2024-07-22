# MAUI after one-hundred days

*22-7-2024*

Status: Idea  
Type of post: Opinion piece Resource

## *Rapid fire thoughts*

The idea is great, I have some remarks though.

- It works, but it is not easy. And the documentation is not helping. 
- Gerald Versluis is my new hero.
- Showing user images is a no go. It is very difficult
- Using any url in Blazor webview is a no go, it will not work
- Most of the things I tried in Hybrid Blazor, do not work in MAUI. And seriously, these things work faster and more stable in XAML.


// My frustrations with MAUI
- Case of overpromise, underdeliver (a bit like blazor), sometimes feels like a marketing stunt
- The things working for me in Blazor, do not work in MAUI (List editing, list order, drag and drop)
- MAUI is just too broad, which makes it difficult to get into, and to find the right documentation.
- While working on the project, my list of things not working in MAUI was ever expanding, it feels exponential.
- It is difficult to do things in MAUI that I can easily do in Web. (My lack of experience problem)
- Editing of a list does not seem to work.
- Adding pictures from external source does not work in MAUI Blazor Webview, because adding something from an url into MAUI is dangerous. This IS my use-case, and therefore I cannot use openlayers for example.
- Blazor webview seems slow.
- Pages do not always refresh when I expect them to.
- 

So, I did not spend a lot of hours AND I might have made a lot of mistakes. It just does not work for me. I expected a bit easier to develop this app, but it was a headache. I do miss experience in MAUI / desktop apps in general, but creating a console app, or WPF was way easier for me in the past.

Learning curve: very steep!




## *Outline*

About great expectations and huge disappointments. 

From an app developer point of view this might be great, and it probably is a great improvement.

From a web developer point of view, it is a nightmare. But developing separate apps for Windows, iOS and Android is a nightmare as well. So, this is your all-in-one nightmare.

Despite what they promise in podcasts and all, developing apps is very difficult in MAUI and requires specific knowledge web developers might not have.

The whole publish-experience is a bit 2010-ish. I remember struggling back then. This felt the same way.

## Publish.

O God! The publishing! I encountered a lot of problems.

I did do my research and looked some youtube videos (I mean, 20mins+ videos for a simple publish job? Get real, right?).

Maybe, I should have tried publishing a simpler app.






Problem: .net 8

.net8 uses a smaller RID-graph, so you need your 2010 publishing experience to look up this graph. The documentation and stack overflow are not helpfull at all. Anyways, you need to be pro for this, it does not work out of the box.

Problem packages:

I had some packages with no specific reference to .net 8. I think. I mean, the error was bananas. Looking through the jsons I did not find anything wrong with them, but I know, since I looked into the packages, there is no reference.

Problem: endless build errors

I keep having issues with the publish not being able to find projects that I reference.
I do this trick, where I first build as release. And next it says like "cannot find namespace". Open it. It is there. Clean. Rebuild. In release mode! No problem found. Try again and expect a different result. (definition of madness).

Problem restore nuget packages.[.gitignore](..%2F..%2F..%2F..%2Fteamxerbutri.cms.maui%2F.gitignore)

O God, no, I did not run restore. attempt ten. PMC, dotnet restore. Starting to hate the guy who wrote: You can just use Publish in Visual Studio. 

Problem: no .net8.0 target

Assets file 'Xerbutri.Cms.Shared\obj\project.assets.json' doesn't have a target for 'net8.0'. Ensure that restore has run and that you have included 'net8.0' in the TargetFrameworks for your project.
<TargetFramework>net8.0</TargetFramework>
Seriously??









## Resources
