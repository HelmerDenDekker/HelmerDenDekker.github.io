 # Vitepress and GitHub Pages
*27-3-2023 - updated 31-8-2023*

 I wanted to try out GitHub Pages and VitePress so I just gave it a shot this afternoon. I have to say, starting it is very easy. This is my first page.

## GitHub Pages

 So I started out with the [Quickstart for GitHub Pages](https://docs.github.com/en/pages/quickstart).

It was really easy to setup the repo. I have done that many times before. However I spent a full ten seconds looking for the links *Under "Build and deployment", under "Source", select Deploy from a branch*.
That annoyed me, so for future reference:

![Under "Build and deployment", under "Source", select Deploy from a branch.](/assets/images/vitepress/vitepressgithubpages01.png "It is here!")

I won't forget that!

## Vitepress

Next: [Quickstart for GitHub Pages](https://docs.github.com/en/pages/quickstart).

Which was really really easy, since I work with vite on a daily basis, and I have everything installed on my laptop already. The documentation of VitePress is perfect for me, since it looks like the Vue documentation.


::: details Action plan (short version)
1. Install Node.js version 16 or higher
2. Open VS Code, terminal.
3. Install VitePress

```bat
 npm install -D vitepress
```

4. Setup VitePress

```bat
 npx vitepress init
```

And answer the questions, for help go to the quickstart mentioned above.

5. Run

```bat
 npm run docs:dev
```
:::


All settled, right? No!

First of all, for the first time in my life Visual Studio Code was bugging me not wanting to push to my repo (I think it wanted to say: workday is over Helmer!). This is really weird since I worked on this account with VS Code earlier today. I have Visual Studio for BackEnd development, so as a quick and dirty fix I fired up VS 2022, cloned and pushed without drama.

Nice!

## Gitignore

Wait up! There was no gitignore! I forgot to tell you I added it.
So I ~~stole~~ copied one from [erresen](https://erresen.github.io/vue/js/git/2020/07/08/vue-js-gitigore.html). Thanks! And I added some extra lines because I need to ignore some more.

Thats it, right? Wrong!

## Publishing VitePress to GitHub pages

Because it is not your everyday static website, of course it will not be automatically published and showing up. You need a pipeline. As a senior web developer I know all about pipelines, in Azure DevOps, publishing to Azure. This is a tiny bit different, with the help of the [VitePress deploy documentation](https://vitepress.dev/guide/deploy) I had the pipeline ready in no time.

Next go to your repository settings. You have to change the build and deployment setting here to "GitHub Actions":

![Under "Build and deployment", under "Source", select GitHub Actions.](/assets/images/vitepress/vitepressgithubpages02.png "Change to GitHub Actions")

If you forget about this, there will be double deployments, one with the "Deploy from branch", just showing your readme, and one with "Vitepress" with your website. Whichever one comes last is deployed on the server.

## Access Control

For Enterprise subscribers, GitHub Pages now has [access control](https://github.blog/changelog/2021-01-21-access-control-for-github-pages/)