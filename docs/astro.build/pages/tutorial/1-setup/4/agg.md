Store your repository online
============================

Get ready to…

*   Put your project repository online

This tutorial will use GitHub to store our repository and connect to a web host. You are welcome to use the online git provider of your choice.

Note

If you are already familiar with git and have your own workflow, then create a new GitHub repository for your project using your preferred method. Skip ahead to the next page: [“Deploy your Site to the Web”](/en/tutorial/1-setup/5/).

Create a repository on GitHub
-----------------------------

[Section titled Create a repository on GitHub](#create-a-repository-on-github)

Although there are a few ways to get your local code stored in GitHub, this tutorial will guide you through a method that does not require using git in the command line.

1.  Log in to GitHub.com in a browser and click the + in the upper right of the screen to make a new repository.
    
2.  Choose a name for your repository. This does not have to be the same name as your project folder.
    
3.  You will be presented with options, but you do not need to change any of the defaults. Scroll down and click the button to Create Repository.
    
4.  You will be presented with various setup next steps, but you won’t need to use any of them. Make a note of the URL of your repository. You can now exit this page without doing anything.
    

Commit your local code to GitHub
--------------------------------

[Section titled Commit your local code to GitHub](#commit-your-local-code-to-github)

In the last section, you made a change to your page’s content. This means that your project files have changed, and VS Code should show a number on top of the “Source” menu icon. This source tab is where you will regularly go to update your files on GitHub.

1.  Click the Source Control tab in your VS Code to see a list of files that have changed. If you see a message that you need to install `git`, follow the instructions provided, then reload VS Code.
    
2.  Click the ••• “3 dots” menu above the commit message and choose Remote > Add Remote.
    
3.  Select Add remote from GitHub. If necessary, follow any authentication steps then return to VS Code and repeat this action.
    
4.  You should see a list of all your repositories on GitHub. Choose the one you created for this project. If you don’t see your project, paste in its GitHub URL directly. You may also be asked to give this repository a local name. You can select any name you like.
    
5.  At the top of the menu pane, there will be a place to enter a **commit message** (description of your file changes). Type in `initial commit` and press the Commit button to commit these changes.
    
6.  You may see a message telling you that you have no “staged” commits, and asking you if you want to stage them. Click Always and continue.
    
7.  Lastly, the list of changed files should be replaced with a Publish button. Click this to send your committed changes to GitHub.
    

### See your project on GitHub

[Section titled See your project on GitHub](#see-your-project-on-github)

To verify that your project is successfully stored on GitHub, visit GitHub.com and look under your account for a list of your repositories. Choose the new one you created, and verify that it contains your Astro project files.

Checklist
---------

[Section titled Checklist](#checklist)

 *    I have stored my project on GitHub.

### Resources

[Section titled Resources](#resources)

*   [Using Git Source control in VS Code](https://code.visualstudio.com/docs/sourcecontrol/overview#_git-support) external
    

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/1-setup/4.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Write your first line of Astro](/en/tutorial/1-setup/3/) [Next  
Deploy your site to the web](/en/tutorial/1-setup/5/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

