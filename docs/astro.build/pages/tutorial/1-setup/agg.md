Check in: Unit 1 - Setup
========================

Now that you know what you’re going to build, it’s time to set up all the tools you’ll need!

This unit shows you how to set up your development environment and deploy to Netlify. Skip ahead to [Unit 2](/en/tutorial/2-pages/) if you are already comfortable with your environment and workflow.

Take the tutorial in an online code editor

Want to complete this tutorial in an online code editor instead? Follow the instructions below for getting started on Google IDX.

Using Google IDX: Follow these instructions, then go directly to Unit 2!

**Set up IDX**

1.  Follow the external link to [open the “Empty Project” template in a new workspace on IDX](https://astro.new/minimal?on=idx).
    
2.  Follow the prompt to log into your Google account if you are not already logged in.
    
3.  Enter a name for your project if you want to change it from the default “Empty Project”. Click **Create**.
    
4.  Wait for the workspace to be created. This may take 30 - 60 seconds. If all goes well, you will see the Astro project loaded in an online code editor.
    
5.  Wait for IDX to run two scripts: one to install Astro and another to start the development server. Note that you may briefly see a message that your workspace “couldn’t find Astro” if your workspace loads before Astro has finished installing. This message can be ignored and cancelled if it does not clear itself.
    

**Make a Change**

If all goes well, you should see the code for the file `src/pages/index.astro` opened in split screen with a live preview of the website. Follow the instruction to [“Write your first line of Astro”](/en/tutorial/1-setup/3/) to make a change to this file.

**Create a GitHub Repository**

1.  Navigate to the “Source Control” navigation item in the vertical menu bar, or open with CTRL + SHIFT + G.
    
2.  Select the option to Publish to GitHub. This will create a new repository in your GitHub account.
    
3.  Follow the prompts to sign in to your GitHub account.
    
4.  Once you are signed in, return to the IDX tab and you will be given the choice to name your new repository, and whether you want to create a private or public repository. You can choose any name and either kind of repository for this tutorial.
    
5.  IDX will make an initial commit and publish to your new GitHub repo.
    
6.  Going forward, whenever you have changes to be committed back to GitHub, the Source Control navigation icon will show a number. This is the number of files that have changed since your last commit. Navigating to this tab and performing two steps (commit and publish) will allow you to enter a commit message, and update your repository.
    

**Deploy your Site**

If you’d like to deploy to Netlify, and have a live published version of your site while you work, go ahead in Unit 1 to [Deploy your site to the web](/en/tutorial/1-setup/5/).

Otherwise, skip to [Unit 2](/en/tutorial/2-pages/) to start building with Astro!

Where are you going?
--------------------

[Section titled Where are you going?](#where-are-you-going)

In this unit, you will **create a new project** that is **stored online in GitHub** and **connected to Netlify**.

As you write code, you will periodically commit your changes to GitHub. Netlify will use the files in your GitHub repository to build your website, and then publish it on the internet at a unique address where anyone can view it.

Every time you commit a change to GitHub, a notification will be sent to Netlify. Then, Netlify will automatically rebuild and republish your live site to reflect those changes.

Checklist
---------

[Section titled Checklist](#checklist)

 *    I’m ready to prepare a development environment for an Astro project!

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/1-setup/index.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
About this Tutorial](/en/tutorial/0-introduction/1/) [Next  
Prepare your dev environment](/en/tutorial/1-setup/1/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/tutorial/1-setup/1
Prepare your dev environment
============================

Get ready to…

*   Install any tools that you will use to build your Astro website

Get the dev tools you need
--------------------------

[Section titled Get the dev tools you need](#get-the-dev-tools-you-need)

### Terminal

[Section titled Terminal](#terminal)

You will use a **command line (terminal)** to create your Astro project and to run key commands to build, develop, and test your site.

You can access the command line through a local terminal program for your operating system. Common applications include **Terminal** (MacOS/Linux), **Command Prompt** (Windows), and **Termux** (Android). One of these will probably already be on your machine.

### Node.js

[Section titled Node.js](#nodejs)

For Astro to run on your system, you will also need to have a compatible version of [**Node.js**](https://nodejs.org/en/) installed. Astro supports **even-numbered** Node.js versions. The current minimum supported versions of each are: `v18.20.8`, `v20.3.0`, and `v22.0.0`. (`v19` and `v21` are not supported.)

To check to see whether you already have a compatible version installed, run the following command in your terminal:

Terminal window

    node -v
    // Example outputv18.20.8

If the command returns a version number supported by Astro, you’re good to go!

If the command returns an error message like `Command 'node' not found`, or a version number lower than the required, then you need to [install a compatible Node.js version](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

### Code Editor

[Section titled Code Editor](#code-editor)

Additionally, you will need to download and install a **code editor** to write your code.

We’ll use…

This tutorial will use **VS Code**, but you can use any editor for your operating system.

1.  [Download and install VS Code](https://code.visualstudio.com/#alt-downloads) or another code editor of your choice.

### Test your knowledge

[Section titled Test your knowledge](#test-your-knowledge)

Which of the following is…

1.  A code editor, for making changes to your files and their content?
    
    1.  web browser
        
    2.  Terminal
        
    3.  VS Code
        
    
    Submit
    
    class s extends HTMLElement{#s;#i;#r;#e;#t;constructor(){super(),this.#s=this.dataset.correctLabel,this.#i=this.dataset.incorrectLabel,this.#r=Math.random().toString(),this.#e=this.querySelector(".submit"),this.#t=this.querySelector(".answer"),this.querySelectorAll(".opt-list > li").forEach(t=>this.#l(t))}#l(t){const e=t.querySelector('input\[type="radio"\]');e&&(e.removeAttribute("disabled"),e.setAttribute("name",this.#r),e.addEventListener("change",()=>{this.#n(),this.#c()}),e.checked&&this.#c())}#n(){this.#t.innerText="",this.#t.classList.remove("wrong","correct"),this.#t.classList.add("sr-only")}#o(t){const e=this.querySelector("input:checked ~ template");e?this.#t.replaceChildren(e.content.cloneNode(!0)):this.#t.innerText=t?this.#s:this.#i,this.#t.classList.remove("sr-only","wrong","correct"),this.#t.classList.add(t?"correct":"wrong")}#c(){this.#e.removeAttribute("disabled"),this.#e.classList.remove("sr-only"),this.#e.onclick=()=>this.#h()}#a(){this.#e.setAttribute("disabled",""),this.#e.classList.add("sr-only"),this.#e.onclick=null}#h(){const t=this.querySelector("input:checked");if(!t)return;this.#a();const e=t.dataset.isCorrect!==void 0&&\["","true"\].includes(t.dataset.isCorrect);this.#o(e)}}customElements.define("multiple-choice",s);
2.  An online version control provider for your repository?
    
    1.  GitHub
        
    2.  Terminal
        
    3.  VS Code
        
    
    Submit
    
3.  An application for running commands?
    
    1.  GitHub
        
    2.  Terminal
        
    3.  web browser
        
    
    Submit
    

Checklist for moving on
-----------------------

[Section titled Checklist for moving on](#checklist-for-moving-on)

 *    I can access the command line in a terminal.
*    I have Node.js installed.
*    I have a code editor like VS Code.

### Resources

[Section titled Resources](#resources)

*   [FreeCodeCamp.org](https://freecodecamp.org) external — a free educational site with full courses or quick refreshers in HTML, CSS, JS, and more.
    

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/1-setup/1.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Check in: Unit 1 - Setup](/en/tutorial/1-setup/) [Next  
Create your first Astro project](/en/tutorial/1-setup/2/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/tutorial/1-setup/2
Create your first Astro project
===============================

Get ready to…

*   Run the `create astro` setup wizard to create a new Astro project
*   Start the Astro server in development (dev) mode
*   View a live preview of your website in your browser

Launch the Astro setup wizard
-----------------------------

[Section titled Launch the Astro setup wizard](#launch-the-astro-setup-wizard)

The preferred way to create a new Astro site is through our `create astro` setup wizard.

1.  In the command line of your terminal, run the following command using your preferred package manager:
    
    (() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()
    
    *   [npm](#tab-panel-3393)
    *   [pnpm](#tab-panel-3394)
    *   [Yarn](#tab-panel-3395)
    
    Terminal window
    
        # create a new project with npmnpm create astro@latest
    
    Terminal window
    
        # create a new project with pnpmpnpm create astro@latest
    
    Terminal window
    
        # create a new project with yarnyarn create astro
    
    class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);
2.  Enter `y` to install `create-astro`.
    
3.  When the prompt asks you where to create the project, type in the name of a folder to create a new directory for your project, e.g. `./tutorial`
    
    Note
    
    A new Astro project can only be created in a completely empty folder, so choose a name for your folder that does not already exist!
    
4.  You will see a short list of starter templates to choose from. Use the arrow keys (up and down) to navigate to the minimal (empty) template, and then press return (enter) to submit your choice.
    
5.  When the prompt asks you whether or not to install dependencies, enter `y`.
    
6.  When the prompt asks you whether or not to initialize a new git repository, enter `y`.
    

When the install wizard is complete, you no longer need this terminal. You can now open VS Code to continue.

Open your project in VS Code
----------------------------

[Section titled Open your project in VS Code](#open-your-project-in-vs-code)

7.  Open VS Code. You will be prompted to open a folder. Choose the folder that you created during the setup wizard.
    
8.  If this is your first time opening an Astro project, you should see a notification asking if you would like to install recommended extensions. Click to see the recommended extensions, and choose the [Astro language support extension](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode). This will provide syntax highlighting and autocompletions for your Astro code.
    
9.  Make sure the terminal is visible and that you can see the command prompt, such as:
    
    Terminal window
    
        user@machine:~/tutorial$
    
    Keyboard shortcut
    
    To toggle the visibility of the terminal, use Ctrl + J (macOS: Cmd ⌘ + J).
    

You can now use the terminal built right into this window, instead of your computer’s Terminal app, for the rest of this tutorial.

Run Astro in dev mode
---------------------

[Section titled Run Astro in dev mode](#run-astro-in-dev-mode)

In order to preview your project files _as a website_ while you work, you will need Astro to be running in development (dev) mode.

### Start the dev server

[Section titled Start the dev server](#start-the-dev-server)

10.  Run the command to start the Astro dev server by typing into VS Code’s terminal:
    
    *   [npm](#tab-panel-3396)
    *   [pnpm](#tab-panel-3397)
    *   [Yarn](#tab-panel-3398)
    
    Terminal window
    
        npm run dev
    
    Terminal window
    
        pnpm run dev
    
    Terminal window
    
        yarn run dev
    
    Now you should see confirmation in the terminal that Astro is running in dev mode. 🚀
    

View a preview of your website
------------------------------

[Section titled View a preview of your website](#view-a-preview-of-your-website)

Your project files contain all the code necessary to display an Astro website, but the browser is responsible for displaying your code as web pages.

11.  Click on the `localhost` link in your terminal window to see a live preview of your new Astro website!
    
    (Astro uses `http://localhost:4321` by default if port `4321` is available.)
    
    Here’s what the Astro “Empty Project” starter website should look like in the browser preview:
    
    ![A blank white page with the word Astro at the top.](/tutorial/minimal.png)
    

Using the Astro dev server

While the Astro server is running in dev mode, you will NOT be able to run commands in your terminal window. Instead, this pane will give you feedback as you preview your site.

You can stop the dev server at any time and return to the command prompt by typing Ctrl + C in the terminal.

Sometimes the dev server will stop on its own while you are working. If your live preview stops working, go back to the terminal and restart the dev server by typing `npm run dev`.

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can create a new Astro project.
*    I can start the Astro dev server.

### Resources

[Section titled Resources](#resources)

*   [Getting Started with Visual Studio Code](https://code.visualstudio.com/docs/introvideos/basics) external — a video tutorial for installing, setting up and working with VS Code
    

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/1-setup/2.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Prepare your dev environment](/en/tutorial/1-setup/1/) [Next  
Write your first line of Astro](/en/tutorial/1-setup/3/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/tutorial/1-setup/3
Write your first line of Astro
==============================

Get ready to…

*   Make your first edit to your new website

Edit your home page
-------------------

[Section titled Edit your home page](#edit-your-home-page)

1.  In your code editor, navigate in the Explorer file pane to `src/pages/index.astro` and click on it to open the file’s contents in an editable tab.
    
    The contents of your `index.astro` file should look like this:
    
    src/pages/index.astro
    
        ------
        <html lang="en">  <head>    <meta charset="utf-8" />    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />    <meta name="viewport" content="width=device-width" />    <meta name="generator" content={Astro.generator} >    <title>Astro</title>  </head>  <body>    <h1>Astro</h1>  </body></html>
    
2.  Edit the content of your page `<body>`.
    
    Type in the editor to change the heading text on your page and save the change.
    
    src/pages/index.astro
    
        <body>  <h1>Astro</h1>  <h1>My Astro Site</h1></body>
    
3.  Check the browser preview and you should see your page content updated to the new text.
    

Congratulations! You are now an Astro developer!

The rest of this unit will set you up for success with version control and a published website you can show off.

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can make changes and see them in the browser.
*    I am an Astro developer!

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/1-setup/3.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Create your first Astro project](/en/tutorial/1-setup/2/) [Next  
Store your repository online](/en/tutorial/1-setup/4/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/tutorial/1-setup/4
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



# Aggregated from ./pages/tutorial/1-setup/5
Deploy your site to the web
===========================

Get ready to…

*   Add your GitHub repository as a new Netlify app
*   Deploy your Astro site to the web

Here, you will connect your GitHub repository to Netlify. Netlify will use that project to build and deploy your site live on the web every time you commit a change to your code.

We’ll use…

This tutorial will use **Netlify**, but you are welcome to use your preferred hosting service for deploying your site to the internet.

Create a new Netlify site
-------------------------

[Section titled Create a new Netlify site](#create-a-new-netlify-site)

1.  Create a free account at [Netlify](https://netlify.com) if you do not already have one.
    
    Make a note of your username. You will view your dashboard and any sites you create at `https://app.netlify.com/teams/username`
    
2.  Click Add new site > Import an existing project.
    
    You will be asked to connect to a Git provider. Choose GitHub and follow the steps onscreen to authenticate your GitHub account. Then, choose your Astro project’s GitHub repository from the list provided.
    
3.  At the final step, Netlify will show you your app’s site settings. The defaults should be correct for your Astro project, so you can scroll down and click Deploy site.
    

Congratulations, you have an Astro website!

Change your project name
------------------------

[Section titled Change your project name](#change-your-project-name)

On your site’s overview page in Netlify, you will see your randomly-generated project name, and your website URL of the form `https://project-name-123456.netlify.app`. You can change your project name to something more memorable, and this will automatically update your URL.

Visit your new website
----------------------

[Section titled Visit your new website](#visit-your-new-website)

Click on the URL in your site settings, or type it into a browser window to view your new website.

### Test your knowledge

[Section titled Test your knowledge](#test-your-knowledge)

You want to update the home page of your existing website. What steps do you take?

1.  I open a terminal, run `create astro`, and then visit my Netlify URL.
    
2.  I change a setting in my Netlify app, then start a new Astro project on astro.new.
    
3.  I make an edit to `index.astro`. I commit and push my changes to GitHub. Netlify will handle the rest!
    

Submit

class s extends HTMLElement{#s;#i;#r;#e;#t;constructor(){super(),this.#s=this.dataset.correctLabel,this.#i=this.dataset.incorrectLabel,this.#r=Math.random().toString(),this.#e=this.querySelector(".submit"),this.#t=this.querySelector(".answer"),this.querySelectorAll(".opt-list > li").forEach(t=>this.#l(t))}#l(t){const e=t.querySelector('input\[type="radio"\]');e&&(e.removeAttribute("disabled"),e.setAttribute("name",this.#r),e.addEventListener("change",()=>{this.#n(),this.#c()}),e.checked&&this.#c())}#n(){this.#t.innerText="",this.#t.classList.remove("wrong","correct"),this.#t.classList.add("sr-only")}#o(t){const e=this.querySelector("input:checked ~ template");e?this.#t.replaceChildren(e.content.cloneNode(!0)):this.#t.innerText=t?this.#s:this.#i,this.#t.classList.remove("sr-only","wrong","correct"),this.#t.classList.add(t?"correct":"wrong")}#c(){this.#e.removeAttribute("disabled"),this.#e.classList.remove("sr-only"),this.#e.onclick=()=>this.#h()}#a(){this.#e.setAttribute("disabled",""),this.#e.classList.add("sr-only"),this.#e.onclick=null}#h(){const t=this.querySelector("input:checked");if(!t)return;this.#a();const e=t.dataset.isCorrect!==void 0&&\["","true"\].includes(t.dataset.isCorrect);this.#o(e)}}customElements.define("multiple-choice",s);

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can view my updated website online.
*    I’m ready to get back to coding!

### Resources

[Section titled Resources](#resources)

*   [A step-by-step guide to deploying on Netlify](https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/) external
    

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/1-setup/5.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Store your repository online](/en/tutorial/1-setup/4/) [Next  
Check in: Unit 2 - Pages](/en/tutorial/2-pages/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



