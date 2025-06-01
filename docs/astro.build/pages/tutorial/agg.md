# Aggregated from ./pages/tutorial/0-introduction
Build your first Astro Blog
===========================

In this tutorial, you’ll learn Astro’s key features by building a fully-functioning blog, from zero to full launch! 🚀

Along the way, you’ll:

*   Set up your development environment
*   Create pages and blog posts for your website
*   Build with Astro components
*   Query and work with local files
*   Add interactivity to your site
*   Deploy your site to the web

Want a preview of what you’re going to build? You can view the final project on [GitHub](https://github.com/withastro/blog-tutorial-demo) or open a working version in an online coding environment such as [IDX](https://idx.google.com/import?url=https:%2F%2Fgithub.com%2Fwithastro%2Fblog-tutorial-demo%2F) or [StackBlitz](https://stackblitz.com/github/withastro/blog-tutorial-demo/tree/complete?file=src%2Fpages%2Findex.astro).

Note

If you would rather start exploring Astro with a pre-built Astro site, you can visit [https://astro.new](https://astro.new) and choose a starter template to open and edit in an online editor.

Checklist
---------

[Section titled Checklist](#checklist)

 *    Looks great! I’m ready to get started!

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/0-introduction/index.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Islands architecture](/en/concepts/islands/) [Next  
About this Tutorial](/en/tutorial/0-introduction/1/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/tutorial/0-introduction/1
About this Tutorial
===================

What do I need to know to get started?
--------------------------------------

[Section titled What do I need to know to get started?](#what-do-i-need-to-know-to-get-started)

If you have some basic familiarity with **HTML**, **Markdown**, **CSS**, and a little **JavaScript**, then you’re totally good to go! You’ll be able to complete the entire tutorial just by following the instructions. Astro is for everyone! 🧑‍🚀 👩‍🚀 👨‍🚀

You will also need a [GitHub](https://github.com) (or similar) account for publishing your project to the web.

How do I use the checklists at the bottom of each page?

You check them off!

At the end of each page, you’ll find a clickable checklist of tasks you should now be able to do. Check these items off to see your progress in the Tutorial Tracker.

Using the tracker is optional, but it can help you remember your place if you complete the tutorial over multiple visits. You can also leave some checklists blank as a reminder of units that you want to revisit later.

(This data is only saved to your browser’s local storage and is not available elsewhere. No data is sent to, nor stored by Astro.)

Unit 1 is things I already know how to do. Can I skip it?

You can use the lessons inside [Unit 1](/en/tutorial/1-setup/) to make sure you have the development tools and online accounts you’ll need to complete the tutorial. It will walk you through creating a new Astro project, storing it on GitHub, and deploying it to Netlify.

If you [create a new, empty Astro project](/en/install-and-setup/) and are comfortable with your setup, you can safely skip ahead to [Unit 2](/en/tutorial/2-pages/) where you will start making new pages in your project.

What if I need help, or want to learn more about Astro?

Our [friendly Astro Discord server](https://astro.build/chat) is the place to be!

Hop into the support forum channel to ask questions, or say hi and chat in `#general` or `#off-topic`.

Where can I leave feedback about this tutorial?

This tutorial is a project of our Docs team. You can find us on Discord in the `#docs` channel, or file issues to the [Docs repo on GitHub](https://github.com/withastro/docs/issues).

Checklist for moving on
-----------------------

[Section titled Checklist for moving on](#checklist-for-moving-on)

 *    I’m ready to build this thing!

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/0-introduction/1.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Build your first Astro Blog](/en/tutorial/0-introduction/) [Next  
Check in: Unit 1 - Setup](/en/tutorial/1-setup/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)





# Aggregated from ./pages/tutorial/1-setup
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





# Aggregated from ./pages/tutorial/2-pages
Check in: Unit 2 - Pages
========================

Now that you have a working site on the web, it’s time to add pages and posts!

Looking ahead
-------------

[Section titled Looking ahead](#looking-ahead)

In this unit, you will:

*   Create your first Astro pages with the `.astro` syntax
*   Add blog posts with Markdown (`.md`) files
*   Style an individual page with `<style>`
*   Apply global styles across pages

Along the way, you’ll learn how the **two sections of a `.astro` file** work together to create a page, and how to use variables and conditional rendering on your pages.

Checklist
---------

[Section titled Checklist](#checklist)

 *    I am ready to make some new pages for my Astro website!

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/2-pages/index.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Deploy your site to the web](/en/tutorial/1-setup/5/) [Next  
Create your first Astro page](/en/tutorial/2-pages/1/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/tutorial/2-pages/1
Create your first Astro page
============================

Now that you know that `.astro` files are responsible for pages on your website, it’s time to create one!

Get ready to…

*   Create two new pages on your website: About and Blog
*   Add navigation links to your pages
*   Deploy an updated version of your website to the web

Create a new `.astro` file
--------------------------

[Section titled Create a new .astro file](#create-a-new-astro-file)

1.  In the files pane of your code editor, navigate to the folder `src/pages/` where you will see the existing file `index.astro`
    
2.  In that same folder, create a new file named `about.astro`.
    
3.  Copy, or retype the contents of `index.astro` into your new `about.astro` file.
    
    Tip
    
    Your editor might show a solid white circle on the tab label for this file. This means that the file is not yet saved. Under the File menu in VS Code, enable “Auto Save” and you should no longer need to save any files manually.
    
4.  Add `/about` to the end of your website preview’s URL in the address bar and check that you can see a page load there. (e.g. `http://localhost:4321/about`)
    

Right now, your “About” page should look exactly the same as the first page, but we’re going to change that!

Edit your page
--------------

[Section titled Edit your page](#edit-your-page)

Edit the HTML content to make this page about you.

To change or add more content to your About page, add more HTML element tags containing content. You can copy and paste the HTML code below between the existing `<body></body>` tags, or create your own.

src/pages/about.astro

    <body>  <h1>My Astro Site</h1>  <h1>About Me</h1>  <h2>... and my new Astro site!</h2>
      <p>I am working through Astro's introductory tutorial. This is the second page on my website, and it's the first one I built myself!</p>
      <p>This site will update as I complete more of the tutorial, so keep checking back and see how my journey is going!</p></body>

Now, visit your `/about` page in your browser tab again, and you should see your updated content.

Add navigation links
--------------------

[Section titled Add navigation links](#add-navigation-links)

To make it easier to preview all your pages, add HTML page navigation links before your `<h1>` at the top of both of your pages (`index.astro` and `about.astro`):

src/pages/about.astro

    <a href="/">Home</a><a href="/about/">About</a>
    <h1>About Me</h1><h2>... and my new Astro site!</h2>

Check that you can click these links to move back and forth between pages on your site.

Note

Unlike many frameworks, Astro uses standard HTML `<a>` elements to navigate between pages (also called _routes_), with traditional page refreshes.

Try it yourself - Add a Blog page
---------------------------------

[Section titled Try it yourself - Add a Blog page](#try-it-yourself---add-a-blog-page)

Add a third page `blog.astro` to your site, following the [same steps as above](#create-a-new-astro-file).

(Don’t forget to add a third navigation link to every page.)

Show me the steps.

1.  Create a new file at `src/pages/blog.astro`.
2.  Copy the entire contents of `index.astro` and paste them into `blog.astro`.
3.  [Add a third navigation link](#add-navigation-links) to the top of every page:

src/pages/index.astro

    <body>  <a href="/">Home</a>  <a href="/about/">About</a>  <a href="/blog/">Blog</a>
      <h1>My Astro Site</h1></body>

You should now have a website with three pages that all link to each other. It’s time to add some content to the Blog page.

Update the page content at `blog.astro` with:

src/pages/blog.astro

    <body>  <a href="/">Home</a>  <a href="/about/">About</a>  <a href="/blog/">Blog</a>
      <h1>My Astro Site</h1>  <h1>My Astro Learning Blog</h1>  <p>This is where I will post about my journey learning Astro.</p></body>

Preview your entire site by visiting all three pages in your browser preview and check that:

*   Every page correctly links to all three pages
*   Your two new pages each have their own descriptive heading
*   Your two new pages each have their own paragraph text

Publish your changes to the web
-------------------------------

[Section titled Publish your changes to the web](#publish-your-changes-to-the-web)

If you’ve followed our setup in Unit 1, you can publish your changes to your live website through Netlify.

When you are happy with the way your preview looks, **commit** your changes to your online repository at GitHub.

1.  In VS Code, preview the files that have changed since your last commit to GitHub.
    
    *   Go to the **Source Control tab** in the left menu. It should have a small “3” displayed.
        
    *   You should see `index.astro`, `about.astro`, and `blog.astro` listed as files that have changed.
        
2.  Enter a commit message (e.g. “Added two new pages - about and blog”) in the text box, and press Ctrl + Enter (macOS: Cmd ⌘ + Enter) to commit the change to your current workspace.
    
3.  Click the button to Sync Changes to GitHub.
    
4.  After waiting a few minutes, visit your Netlify URL to verify that your changes are published live.
    

Commit and deploy regularly

Follow these steps every time you pause working! Your changes will be updated in your GitHub repository. If you’ve deployed to a Netlify website, it will be rebuilt and republished.

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can create a new page for my website and link to it from an existing page.
*    I can commit my changes back to GitHub and update my live site on Netlify.

### Resources

[Section titled Resources](#resources)

*   [File-based Routing in Astro](/en/basics/astro-pages/#file-based-routing)
    
*   [Astro page HTML](/en/basics/astro-pages/#astro-pages)
    

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/2-pages/1.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Check in: Unit 2 - Pages](/en/tutorial/2-pages/) [Next  
Write your first Markdown blog post](/en/tutorial/2-pages/2/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/tutorial/2-pages/2
Write your first Markdown blog post
===================================

Now that you have built pages using `.astro` files, it’s time to make some blog posts using `.md` files!

Get ready to…

*   Make a new folder and create a new post
*   Write some Markdown content
*   Link to your blog posts on your Blog page

Create your first `.md` file
----------------------------

[Section titled Create your first .md file](#create-your-first-md-file)

1.  Create a new directory at `src/pages/posts/`.
    
2.  Add a new (empty) file `post-1.md` inside your new `/posts/` folder.
    
3.  Look for this page in your browser preview by adding `/posts/post-1` to the end of your existing preview URL. (e.g. `http://localhost:4321/posts/post-1`)
    
4.  Change the browser preview URL to view `/posts/post-2` instead. (This is a page you have not yet created.)
    
    Note the different output when previewing an “empty” page, and one that doesn’t exist. This will help you troubleshoot in the future.
    

Write Markdown content
----------------------

[Section titled Write Markdown content](#write-markdown-content)

1.  Copy or type the following code into `post-1.md`
    
    src/pages/posts/post-1.md
    
        ---title: 'My First Blog Post'pubDate: 2022-07-01description: 'This is the first post of my new Astro blog.'author: 'Astro Learner'image:    url: 'https://docs.astro.build/assets/rose.webp'    alt: 'The Astro logo on a dark background with a pink glow.'tags: ["astro", "blogging", "learning in public"]---# My First Blog Post
        Published on: 2022-07-01
        Welcome to my _new blog_ about learning Astro! Here, I will share my learning journey as I build a new website.
        ## What I've accomplished
        1. **Installing Astro**: First, I created a new Astro project and set up my online accounts.
        2. **Making Pages**: I then learned how to make pages by creating new `.astro` files and placing them in the `src/pages/` folder.
        3. **Making Blog Posts**: This is my first blog post! I now have Astro pages and Markdown posts!
        ## What's next
        I will finish the Astro tutorial, and then keep adding more posts. Watch this space for more to come.
    
2.  Check your browser preview again at `http://localhost:4321/posts/post-1`. You should now see content on this page. It may not yet be properly formatted, but don’t worry, you will update this later in the tutorial!
    
3.  Use your browser’s Dev Tools to inspect this page. Notice that although you have not typed any HTML elements, your Markdown has been converted to HTML. You can see elements such as headings, paragraphs, and list items.
    

Note

The information at the top of the file, inside the code fences, is called frontmatter. This data—including tags and a post image—is information _about_ your post that Astro can use. It does not appear on the page automatically, but you will access it later in the tutorial to enhance your site.

Link to your posts
------------------

[Section titled Link to your posts](#link-to-your-posts)

1.  Link to your first post with an anchor tag in `src/pages/blog.astro`:
    
    src/pages/blog.astro
    
        ------<html lang="en">  <head>    <meta charset="utf-8"/>    <meta name="viewport" content="width=device-width" />    <title>Astro</title>  </head>  <body>    <a href="/">Home</a>    <a href="/about/">About</a>    <a href="/blog/">Blog</a>
            <h1>My Astro Learning Blog</h1>    <p>This is where I will post about my journey learning Astro.</p>    <ul>      <li><a href="/posts/post-1/">Post 1</a></li>    </ul>  </body></html>
    
2.  Now, add two more files in `src/pages/posts/`: `post-2.md` and `post-3.md`. Here is some sample code you can copy and paste into your files, or, you can create your own!
    
    src/pages/posts/post-2.md
    
        ---title: My Second Blog Postauthor: Astro Learnerdescription: "After learning some Astro, I couldn't stop!"image:    url: "https://docs.astro.build/assets/arc.webp"    alt: "The Astro logo on a dark background with a purple gradient arc."pubDate: 2022-07-08tags: ["astro", "blogging", "learning in public", "successes"]---After a successful first week learning Astro, I decided to try some more. I wrote and imported a small component from memory!
    
    src/pages/posts/post-3.md
    
        ---title: My Third Blog Postauthor: Astro Learnerdescription: "I had some challenges, but asking in the community really helped!"image:    url: "https://docs.astro.build/assets/rays.webp"    alt: "The Astro logo on a dark background with rainbow rays."pubDate: 2022-07-15tags: ["astro", "learning in public", "setbacks", "community"]---It wasn't always smooth sailing, but I'm enjoying building with Astro. And, the [Discord community](https://astro.build/chat) is really friendly and helpful!
    
3.  Add links to these new posts:
    
    src/pages/blog.astro
    
        ------<html lang="en">  <head>    <meta charset="utf-8"/>    <meta name="viewport" content="width=device-width" />    <title>Astro</title>  </head>  <body>    <a href="/">Home</a>    <a href="/about/">About</a>    <a href="/blog/">Blog</a>
            <h1>My Astro Learning Blog</h1>    <p>This is where I will post about my journey learning Astro.</p>    <ul>      <li><a href="/posts/post-1/">Post 1</a></li>      <li><a href="/posts/post-2/">Post 2</a></li>      <li><a href="/posts/post-3/">Post 3</a></li>    </ul>  </body></html>
    
4.  Check your browser preview and make sure that:
    
    All your links for Post 1, Post 2, and Post 3 lead to a working page on your site. (If you find a mistake, check your links on `blog.astro` or your Markdown file names.)
    

### Test your knowledge

[Section titled Test your knowledge](#test-your-knowledge)

1.  Content in a Markdown (`.md`) file is converted to:
    
    1.  HTML
    2.  CSS
    3.  JavaScript
    
    Submit
    
    class s extends HTMLElement{#s;#i;#r;#e;#t;constructor(){super(),this.#s=this.dataset.correctLabel,this.#i=this.dataset.incorrectLabel,this.#r=Math.random().toString(),this.#e=this.querySelector(".submit"),this.#t=this.querySelector(".answer"),this.querySelectorAll(".opt-list > li").forEach(t=>this.#l(t))}#l(t){const e=t.querySelector('input\[type="radio"\]');e&&(e.removeAttribute("disabled"),e.setAttribute("name",this.#r),e.addEventListener("change",()=>{this.#n(),this.#c()}),e.checked&&this.#c())}#n(){this.#t.innerText="",this.#t.classList.remove("wrong","correct"),this.#t.classList.add("sr-only")}#o(t){const e=this.querySelector("input:checked ~ template");e?this.#t.replaceChildren(e.content.cloneNode(!0)):this.#t.innerText=t?this.#s:this.#i,this.#t.classList.remove("sr-only","wrong","correct"),this.#t.classList.add(t?"correct":"wrong")}#c(){this.#e.removeAttribute("disabled"),this.#e.classList.remove("sr-only"),this.#e.onclick=()=>this.#h()}#a(){this.#e.setAttribute("disabled",""),this.#e.classList.add("sr-only"),this.#e.onclick=null}#h(){const t=this.querySelector("input:checked");if(!t)return;this.#a();const e=t.dataset.isCorrect!==void 0&&\["","true"\].includes(t.dataset.isCorrect);this.#o(e)}}customElements.define("multiple-choice",s);

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can create a new folder within `src/pages/` for my blog posts.
*    I can create a new Markdown (`.md`) blog post file.
*    I understand that Markdown is another language that, like Astro, produces HTML in my browser.

### Resources

[Section titled Resources](#resources)

*   [Markdown Cheat Sheet from The Markdown Guide](https://www.markdownguide.org/cheat-sheet/) external
    
*   [What are browser developer tools? MDN](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_are_browser_developer_tools) external
    
*   [YAML frontmatter](https://assemble.io/docs/YAML-front-matter.html) external
    

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/2-pages/2.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Create your first Astro page](/en/tutorial/2-pages/1/) [Next  
Add dynamic content about you](/en/tutorial/2-pages/3/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/tutorial/2-pages/3
Add dynamic content about you
=============================

Now that you have a multi-page website with HTML content, it’s time to add some dynamic HTML!

Get ready to…

*   Define your page title in frontmatter, and use it in your HTML
*   Conditionally display HTML elements
*   Add some content about you

Any HTML file is valid Astro language. But, you can do more with Astro than just regular HTML!

Define and use a variable
-------------------------

[Section titled Define and use a variable](#define-and-use-a-variable)

Open `about.astro`, which should look like this:

src/pages/about.astro

    ------<html lang="en">  <head>    <meta charset="utf-8" />    <meta name="viewport" content="width=device-width" />    <title>Astro</title>  </head>  <body>    <a href="/">Home</a>    <a href="/about/">About</a>    <a href="/blog/">Blog</a>    <h1>About Me</h1>    <h2>... and my new Astro site!</h2>
        <p>I am working through Astro's introductory tutorial. This is the second page on my website, and it's the first one I built myself!</p>
        <p>This site will update as I complete more of the tutorial, so keep checking back and see how my journey is going!</p>  </body></html>

1.  Add the following line of JavaScript in the frontmatter script, between the **code fences**:
    
    src/pages/about.astro
    
        ---const pageTitle = "About Me";---
    
2.  Replace both the static “Astro” title and “About Me” heading in your HTML with the dynamic variable `{pageTitle}`.
    
    src/pages/about.astro
    
        <html lang="en">  <head>    <meta charset="utf-8" />    <meta name="viewport" content="width=device-width" />    <title>Astro</title>    <title>{pageTitle}</title>  </head>  <body>    <a href="/">Home</a>    <a href="/about/">About</a>    <a href="/blog/">Blog</a>    <h1>About Me</h1>    <h1>{pageTitle}</h1>    <h2>... and my new Astro site!</h2>
            <p>I am working through Astro's introductory tutorial. This is the second page on my website, and it's the first one I built myself!</p>
            <p>This site will update as I complete more of the tutorial, so keep checking back and see how my journey is going!</p>  </body></html>
    
3.  Refresh the live preview of your `/about` page.
    
    Your page text should look the same, and your page title displayed in your browser tab should now read “About Me” instead of “Astro.”
    
    Instead of typing text directly into HTML tags, you just **defined and then used a variable** in the two sections of your `.astro` file, respectively.
    
4.  Use the same pattern to create a `pageTitle` value to use in `index.astro` (“Home Page”) and `blog.astro` (“My Astro Learning Blog”). Update the HTML of these pages in both places so that your page title matches the heading displayed on each page.
    

Takeaways

1.  **Define** variables in your Astro script using JavaScript or TypeScript expressions.
2.  **Use** these variables in your Astro template inside curly braces `{ }` to tell Astro you’re using some JavaScript.

Write JavaScript expressions in Astro
-------------------------------------

[Section titled Write JavaScript expressions in Astro](#write-javascript-expressions-in-astro)

1.  Add the following JavaScript to your frontmatter, between the **code fences**:
    
    (You can customize the code for yourself, but this tutorial will use the following example.)
    
    src/pages/about.astro
    
        ---const pageTitle = "About Me";
        const identity = {  firstName: "Sarah",  country: "Canada",  occupation: "Technical Writer",  hobbies: ["photography", "birdwatching", "baseball"],};
        const skills = ["HTML", "CSS", "JavaScript", "React", "Astro", "Writing Docs"];---
    
2.  Then, add the following code to your HTML template, below your existing content:
    
    src/pages/about.astro
    
        <p>Here are a few facts about me:</p><ul>  <li>My name is {identity.firstName}.</li>  <li>I live in {identity.country} and I work as a {identity.occupation}.</li>  {identity.hobbies.length >= 2 &&    <li>Two of my hobbies are: {identity.hobbies[0]} and {identity.hobbies[1]}</li>  }</ul><p>My skills are:</p><ul>  {skills.map((skill) => <li>{skill}</li>)}</ul>
    

Takeaways

1.  Writing an Astro template is very much like **writing HTML**, but you can include JavaScript expressions within it.
2.  The Astro frontmatter script contains only JavaScript.
3.  You can use all modern JavaScript **logical operators**, **expressions** and **functions** in either section of your `.astro` file. But, curly braces are necessary (only) in the HTML template body.

### Test your knowledge

[Section titled Test your knowledge](#test-your-knowledge)

1.  A `.astro` file’s frontmatter is written in:
    
    1.  HTML
    2.  YAML
    3.  JavaScript
    
    Submit
    
    class s extends HTMLElement{#s;#i;#r;#e;#t;constructor(){super(),this.#s=this.dataset.correctLabel,this.#i=this.dataset.incorrectLabel,this.#r=Math.random().toString(),this.#e=this.querySelector(".submit"),this.#t=this.querySelector(".answer"),this.querySelectorAll(".opt-list > li").forEach(t=>this.#l(t))}#l(t){const e=t.querySelector('input\[type="radio"\]');e&&(e.removeAttribute("disabled"),e.setAttribute("name",this.#r),e.addEventListener("change",()=>{this.#n(),this.#c()}),e.checked&&this.#c())}#n(){this.#t.innerText="",this.#t.classList.remove("wrong","correct"),this.#t.classList.add("sr-only")}#o(t){const e=this.querySelector("input:checked ~ template");e?this.#t.replaceChildren(e.content.cloneNode(!0)):this.#t.innerText=t?this.#s:this.#i,this.#t.classList.remove("sr-only","wrong","correct"),this.#t.classList.add(t?"correct":"wrong")}#c(){this.#e.removeAttribute("disabled"),this.#e.classList.remove("sr-only"),this.#e.onclick=()=>this.#h()}#a(){this.#e.setAttribute("disabled",""),this.#e.classList.add("sr-only"),this.#e.onclick=null}#h(){const t=this.querySelector("input:checked");if(!t)return;this.#a();const e=t.dataset.isCorrect!==void 0&&\["","true"\].includes(t.dataset.isCorrect);this.#o(e)}}customElements.define("multiple-choice",s);
2.  In addition to HTML, Astro syntax allows you to include:
    
    1.  JavaScript logical operators, expressions and functions
    2.  YAML
    3.  Markdown
    
    Submit
    
3.  When do you need to write your JavaScript inside curly braces?
    
    1.  When you’re not sure whether it’s correct.
        
    2.  When inside the HTML template section of an Astro component.
        
    3.  Between the code fences in an Astro component.
        
    
    Submit
    

Conditionally render elements
-----------------------------

[Section titled Conditionally render elements](#conditionally-render-elements)

You can also use your script variables to choose **whether or not** to render individual elements of your HTML `<body>` content.

1.  Add the following lines to your frontmatter script to **define variables**:
    
    src/pages/about.astro
    
        ---const pageTitle = "About Me";
        const identity = {  firstName: "Sarah",  country: "Canada",  occupation: "Technical Writer",  hobbies: ["photography", "birdwatching", "baseball"],};
        const skills = ["HTML", "CSS", "JavaScript", "React", "Astro", "Writing Docs"];
        const happy = true;const finished = false;const goal = 3;---
    
2.  Add the following lines below your existing paragraphs.
    
    Then, check the live preview in your browser tab to see what is displayed on the page:
    
    src/pages/about.astro
    
        {happy && <p>I am happy to be learning Astro!</p>}
        {finished && <p>I finished this tutorial!</p>}
        {goal === 3 ? <p>My goal is to finish in 3 days.</p> : <p>My goal is not 3 days.</p>}
    
3.  Commit your changes to GitHub before moving on. Do this any time you want to save your work and update your live website.
    

Tip

Astro’s templating syntax is similar to JSX syntax. If you’re ever wondering how to use your script in your HTML, then searching for how it is done in JSX is probably a good starting point!

### Analyze the Pattern

[Section titled Analyze the Pattern](#analyze-the-pattern)

Given the following `.astro` script:

src/pages/about.astro

    ---const operatingSystem = "Linux";const quantity = 3;const footwear = "boots";const student = false;---

For each Astro template expression, can you predict the HTML (if any!) that will be sent to the browser? Click to reveal if you’re right!

1.  `<p>{operatingSystem}</p>`
    
     `<p>Linux</p>` class t extends HTMLElement{constructor(){super(),this.querySelector("input")?.addEventListener("click",e=>{e.target instanceof HTMLInputElement&&(e.target.checked=e.target.disabled=!0)},{once:!0})}}customElements.define("ad-spoiler",t);
    
2.  `{student && <p>I am still in school.</p>}`
    
     Nothing will display because `student` evaluates to false.
    
3.  `<p>I have {quantity + 8} pairs of {footwear}</p>`
    
     `<p>I have 11 pairs of boots</p>`
    
4.  `{operatingSystem === "MacOS" ? <p>I am using a Mac.</p> : <p>I am not using a Mac.</p>}`
    
     `<p>I am not using a Mac.</p>`
    

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can define values in and use values in `.astro` files.
*    I can conditionally render HTML elements.

### Resources

[Section titled Resources](#resources)

*   [Dynamic expressions in Astro](/en/reference/astro-syntax/#jsx-like-expressions)

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/2-pages/3.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Write your first Markdown blog post](/en/tutorial/2-pages/2/) [Next  
Style your About page](/en/tutorial/2-pages/4/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/tutorial/2-pages/4
Style your About page
=====================

Now that you have an About page with content about you, it’s time to style it!

Get ready to…

*   Style items on a single page
*   Use CSS variables

Style an individual page
------------------------

[Section titled Style an individual page](#style-an-individual-page)

Using Astro’s own `<style></style>` tags, you can style items on your page. Adding **attributes** and **directives** to these tags gives you even more ways to style.

1.  Copy the following code and paste it into `src/pages/about.astro`:
    
    src/pages/about.astro
    
        <html lang="en">  <head>    <meta charset="utf-8" />    <meta name="viewport" content="width=device-width" />    <title>{pageTitle}</title>    <style>      h1 {        color: purple;        font-size: 4rem;      }    </style>  </head>
    
    Check all three pages in your browser preview.
    
    *   Which color is the page title of:
        
        *   Your Home page? black class t extends HTMLElement{constructor(){super(),this.querySelector("input")?.addEventListener("click",e=>{e.target instanceof HTMLInputElement&&(e.target.checked=e.target.disabled=!0)},{once:!0})}}customElements.define("ad-spoiler",t);
        *   Your About page?  purple
        *   Your Blog page?  black
    *   The page with the biggest title text is?  Your About page
        
    
    Tip
    
    If you are unable to determine colors visually, you can use the dev tools in your browser to inspect the `<h1>` title elements and verify the text color applied.
    
2.  Add the class name `skill` to the generated `<li>` elements on your About page, so you can style them. Your code should now look like this:
    
    src/pages/about.astro
    
        <p>My skills are:</p><ul>  {skills.map((skill) => <li class="skill">{skill}</li>)}</ul>
    
3.  Add the following code to your existing style tag:
    
    src/pages/about.astro
    
        <style>  h1 {    color: purple;    font-size: 4rem;  }  .skill {    color: green;    font-weight: bold;  }</style>
    
4.  Visit your About page in your browser again, and verify, through visual inspection or dev tools, that each item in your list of skills is now green and bold.
    

Use your first CSS variable
---------------------------

[Section titled Use your first CSS variable](#use-your-first-css-variable)

The Astro `<style>` tag can also reference any variables from your frontmatter script using the `define:vars={ {...} }` directive. You can **define variables within your code fence**, then **use them as CSS variables in your style tag**.

1.  Define a `skillColor` variable by adding it to the frontmatter script of `src/pages/about.astro` like this:
    
    src/pages/about.astro
    
        ---const pageTitle = "About Me";
        const identity = {  firstName: "Sarah",  country: "Canada",  occupation: "Technical Writer",  hobbies: ["photography", "birdwatching", "baseball"],};
        const skills = ["HTML", "CSS", "JavaScript", "React", "Astro", "Writing Docs"];
        const happy = true;const finished = false;const goal = 3;
        const skillColor = "navy";---
    
2.  Update your existing `<style>` tag below to first define, then use this `skillColor` variable inside double curly braces.
    
    src/pages/about.astro
    
        <style define:vars={{skillColor}}>  h1 {    color: purple;    font-size: 4rem;  }  .skill {    color: green;    color: var(--skillColor);    font-weight: bold;  }</style>
    
3.  Check your About page in your browser preview. You should see that the skills are now navy blue, as set by the `skillColor` variable passed to the `define:vars` directive.
    

Try it yourself - Define CSS variables
--------------------------------------

[Section titled Try it yourself - Define CSS variables](#try-it-yourself---define-css-variables)

1.  Update the `<style>` tag on your About page so that it matches the one below.
    
    src/pages/about.astro
    
        <style define:vars={{skillColor, fontWeight, textCase}}>  h1 {    color: purple;    font-size: 4rem;  }  .skill {    color: var(--skillColor);    font-weight: var(--fontWeight);    text-transform: var(--textCase);  }</style>
    
2.  Add any missing variable definitions in your frontmatter script so that your new `<style>` tag successfully applies these styles to your list of skills:
    
    *   The text color is navy blue
    *   The text is bold
    *   The list items are in all-caps (all uppercase letters)

✅ Show me the code! ✅

src/pages/about.astro

    ---const pageTitle = "About Me";
    const identity = {  firstName: "Sarah",  country: "Canada",  occupation: "Technical Writer",  hobbies: ["photography", "birdwatching", "baseball"],};
    const skills = ["HTML", "CSS", "JavaScript", "React", "Astro", "Writing Docs"];
    const happy = true;const finished = false;const goal = 3;
    const skillColor = "navy";const fontWeight = "bold";const textCase = "uppercase";---

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can add CSS styles to an individual page using an Astro `<style>` tag.
*    I can use variables to style elements on the page.

### Resources

[Section titled Resources](#resources)

*   [Astro syntax vs JSX - comparison](/en/reference/astro-syntax/#differences-between-astro-and-jsx)
    
*   [Astro `<style>` tag](/en/guides/styling/#styling-in-astro)
    
*   [CSS variables in Astro](/en/guides/styling/#css-variables)
    

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/2-pages/4.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Add dynamic content about you](/en/tutorial/2-pages/3/) [Next  
Add site-wide styling](/en/tutorial/2-pages/5/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/tutorial/2-pages/5
Add site-wide styling
=====================

Now that you have a styled About page, it’s time to add some global styles for the rest of your site!

Get ready to…

*   Apply styles globally

Add a global stylesheet
-----------------------

[Section titled Add a global stylesheet](#add-a-global-stylesheet)

You have seen that the Astro `<style>` tag is **scoped by default**, meaning that it only affects the elements in its own file.

There are a few ways to define styles **globally** in Astro, but in this tutorial, you will create and import a `global.css` file into each of your pages. This combination of stylesheet and `<style>` tag gives you the ability to control some styles site-wide, and to apply some specific styles exactly where you want them.

1.  Create a new file at the location `src/styles/global.css` (You’ll have to create a `styles` folder first.)
    
2.  Copy the following code into your new file, `global.css`
    
    src/styles/global.css
    
        html {  background-color: #f1f5f9;  font-family: sans-serif;}
        body {  margin: 0 auto;  width: 100%;  max-width: 80ch;  padding: 1rem;  line-height: 1.5;}
        * {  box-sizing: border-box;}
        h1 {  margin: 1rem 0;  font-size: 2.5rem;}
    
3.  In `about.astro`, add the following import statement to your frontmatter:
    
    src/pages/about.astro
    
        ---import '../styles/global.css';
        const pageTitle = "About Me";
        const identity = {  firstName: "Sarah",  country: "Canada",  occupation: "Technical Writer",  hobbies: ["photography", "birdwatching", "baseball"],};
        const skills = ["HTML", "CSS", "JavaScript", "React", "Astro", "Writing Docs"];
        const happy = true;const finished = false;const goal = 3;
        const skillColor = "navy";const fontWeight = "bold";const textCase = "uppercase";---
    
4.  Check the browser preview of your About page, and you should now see new styles applied!
    

Try it yourself - Import your global stylesheet
-----------------------------------------------

[Section titled Try it yourself - Import your global stylesheet](#try-it-yourself---import-your-global-stylesheet)

Add the necessary line of code to each `.astro` file in your project to apply your global styles to every page of your site.

✅ Show me the code! ✅

Add the following import statement to the two other page files: `src/pages/index.astro` and `src/pages/blog.astro`

src/pages/index.astro

    ---import '../styles/global.css';---

Make any changes or additions you want to the content of your About page by adding HTML elements to the page template, either statically or dynamically. Write any additional JavaScript in your frontmatter script to provide you with values to use in your HTML. When you are happy with this page, commit your changes to GitHub before moving on to the next lesson.

### Analyze the Pattern

[Section titled Analyze the Pattern](#analyze-the-pattern)

Your About page is now styled using _both_ the imported `global.css` file _and_ a `<style>` tag.

*   Are styles from both styling methods being applied?
    
     Yes class t extends HTMLElement{constructor(){super(),this.querySelector("input")?.addEventListener("click",e=>{e.target instanceof HTMLInputElement&&(e.target.checked=e.target.disabled=!0)},{once:!0})}}customElements.define("ad-spoiler",t);
    
*   Are there any conflicting styles, and if so, which are applied?
    
     Yes, `<h1>` has a size of `2.5rem` globally, but `4rem` locally in the `<style>` tag. The local `4rem` rule is applied on the About page.
    
*   Describe how `global.css` and `<style>` work together.
    
     When conflicting styles are defined both globally and in a page’s local `<style>` tag, the local styles should overwrite any global styles. (But, there can be other factors involved, so always visually inspect your site to make sure your styles are properly applied!)
    
*   How would you choose whether to declare a style in a `global.css` file or a `<style>` tag?
    
     If you want a style to be applied site-wide, you would choose to use a `global.css` file. However, if you want styles to apply to only the HTML content in a single `.astro` file, and not affect other elements on your site, you would choose a `<style>` tag.
    

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can add global CSS styles by importing a `.css` file.

### Resources

[Section titled Resources](#resources)

*   [Astro syntax vs JSX - comparison](/en/reference/astro-syntax/#differences-between-astro-and-jsx)
    
*   [Astro `<style>` tag](/en/guides/styling/#styling-in-astro)
    
*   [CSS variables in Astro](/en/guides/styling/#css-variables)
    

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/2-pages/5.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Style your About page](/en/tutorial/2-pages/4/) [Next  
Check in: Unit 3 - Components](/en/tutorial/3-components/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)





# Aggregated from ./pages/tutorial/3-components
Check in: Unit 3 - Components
=============================

Now that you have `.astro` and `.md` files generating entire pages on your website, it’s time to make and reuse smaller bits of HTML with Astro components!

Looking ahead
-------------

[Section titled Looking ahead](#looking-ahead)

In this unit, you’ll learn how to create **Astro components** to reuse code for common elements across your website.

You’ll build:

*   A Navigation component that presents a menu of links to your pages
*   A Footer component to include at the bottom of each page
*   A Social Media component, used in the Footer, that links to profile pages
*   An interactive Hamburger component to toggle the Navigation on mobile

Along the way, you’ll use CSS and JavaScript to build a responsive design that reacts to screen sizes and user input.

Checklist
---------

[Section titled Checklist](#checklist)

 *    I am ready to build some Astro components!

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/3-components/index.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Add site-wide styling](/en/tutorial/2-pages/5/) [Next  
Make a reusable Navigation component](/en/tutorial/3-components/1/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/tutorial/3-components/1
Make a reusable Navigation component
====================================

Now that you have the same HTML written in multiple pages of your Astro site, it’s time to replace that duplicated content with a reusable Astro component!

Get ready to…

*   Create a new folder for components
*   Build an Astro component to display your navigation links
*   Replace existing HTML with a new, reusable navigation component

Create a new `src/components/` folder
-------------------------------------

[Section titled Create a new src/components/ folder](#create-a-new-srccomponents-folder)

To hold `.astro` files that will generate HTML but that will not become new pages on your website, you will need a new folder in your project: `src/components/`.

Create a Navigation component
-----------------------------

[Section titled Create a Navigation component](#create-a-navigation-component)

1.  Create a new file: `src/components/Navigation.astro`.
    
2.  Copy your links to navigate between pages from the top of any page and paste them into your new file, `Navigation.astro`:
    
    src/components/Navigation.astro
    
        ------<a href="/">Home</a><a href="/about/">About</a><a href="/blog/">Blog</a>
    
    Tip
    
    If there is nothing in the frontmatter of your `.astro` file, you don’t have to write the code fences. You can always add them back in when you need them.
    

### Import and use Navigation.astro

[Section titled Import and use Navigation.astro](#import-and-use-navigationastro)

1.  Go back to `index.astro` and import your new component inside the code fence:
    
    src/pages/index.astro
    
        ---import Navigation from '../components/Navigation.astro';import "../styles/global.css";
        const pageTitle = "Home Page";---
    
2.  Then below, replace the existing navigation HTML link elements with the new navigation component you just imported:
    
    src/pages/index.astro
    
        <a href="/">Home</a><a href="/about/">About</a><a href="/blog/">Blog</a><Navigation />
    
3.  Check the preview in your browser and notice that it should look exactly the same… and that’s what you want!
    

Your site contains the same HTML as it did before. But now, those three lines of code are provided by your `<Navigation />` component.

Try it yourself - Add navigation to the rest of your site
---------------------------------------------------------

[Section titled Try it yourself - Add navigation to the rest of your site](#try-it-yourself---add-navigation-to-the-rest-of-your-site)

Import and use the `<Navigation />` component in the other two pages on your site (`about.astro` and `blog.astro`) using the same method.

Don’t forget to

*   Add an import statement at the top of the component script, inside the code fence.
*   Replace the existing code with the navigation component.

Note

When you restructure your code but do not change the way your page looks in the browser, you are **refactoring**. You will **refactor** several times in this unit as you replace parts of your page HTML with components.

This allows you to get started quickly with any working code, often duplicated throughout your project. Then, you can improve your existing code’s design incrementally without changing the outward appearance of your site.

### Test your knowledge

[Section titled Test your knowledge](#test-your-knowledge)

1.  You can do this when you have elements repeated on multiple pages:
    
    1.  restart the dev server
        
    2.  refactor to use a reusable component
        
    3.  make a new page
        
    
    Submit
    
    class s extends HTMLElement{#s;#i;#r;#e;#t;constructor(){super(),this.#s=this.dataset.correctLabel,this.#i=this.dataset.incorrectLabel,this.#r=Math.random().toString(),this.#e=this.querySelector(".submit"),this.#t=this.querySelector(".answer"),this.querySelectorAll(".opt-list > li").forEach(t=>this.#l(t))}#l(t){const e=t.querySelector('input\[type="radio"\]');e&&(e.removeAttribute("disabled"),e.setAttribute("name",this.#r),e.addEventListener("change",()=>{this.#n(),this.#c()}),e.checked&&this.#c())}#n(){this.#t.innerText="",this.#t.classList.remove("wrong","correct"),this.#t.classList.add("sr-only")}#o(t){const e=this.querySelector("input:checked ~ template");e?this.#t.replaceChildren(e.content.cloneNode(!0)):this.#t.innerText=t?this.#s:this.#i,this.#t.classList.remove("sr-only","wrong","correct"),this.#t.classList.add(t?"correct":"wrong")}#c(){this.#e.removeAttribute("disabled"),this.#e.classList.remove("sr-only"),this.#e.onclick=()=>this.#h()}#a(){this.#e.setAttribute("disabled",""),this.#e.classList.add("sr-only"),this.#e.onclick=null}#h(){const t=this.querySelector("input:checked");if(!t)return;this.#a();const e=t.dataset.isCorrect!==void 0&&\["","true"\].includes(t.dataset.isCorrect);this.#o(e)}}customElements.define("multiple-choice",s);
2.  Astro components are:
    
    1.  reusable
        
    2.  fragments of HTML
        
    3.  both of the above!
        
    
    Submit
    
3.  Astro components will automatically create a new page on your site when you…
    
    1.  include `<html></html>`
        
    2.  refactor
        
    3.  put the `.astro` file within `src/pages/`
        
    
    Submit
    

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can refactor content into reusable components.
*    I can add a new component to an `.astro` page.

### Resources

[Section titled Resources](#resources)

*   [Astro Component Overview](/en/basics/astro-components/)
    
*   [Refactoring](https://refactoring.com/) external
    

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/3-components/1.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Check in: Unit 3 - Components](/en/tutorial/3-components/) [Next  
Create a social media footer](/en/tutorial/3-components/2/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/tutorial/3-components/2
Create a social media footer
============================

Get ready to…

*   Create a Footer component
*   Create and pass props to a Social Media component

Now that you have used Astro components on a page, it’s time to use a component within another component!

Create a Footer Component
-------------------------

[Section titled Create a Footer Component](#create-a-footer-component)

1.  Create a new file at the location `src/components/Footer.astro`.
    
2.  Copy the following code into your new file, `Footer.astro`.
    
    src/components/Footer.astro
    
        ---const platform = "github";const username = "withastro";---
        <footer>  <p>Learn more about my projects on <a href={`https://www.${platform}.com/${username}`}>{platform}</a>!</p></footer>
    

### Import and use `Footer.astro`

[Section titled Import and use Footer.astro](#import-and-use-footerastro)

1.  Add the following import statement to the frontmatter in each of your three Astro pages (`index.astro`, `about.astro`, and `blog.astro`):
    
        import Footer from '../components/Footer.astro';
    
2.  Add a new `<Footer />` component in your Astro template on each page, just before the closing `</body>` tag to display your footer at the bottom of the page.
    
            <Footer />  </body></html>
    
3.  In your browser preview, check that you can see your new footer text on each page.
    

Try it yourself - Personalize your footer
-----------------------------------------

[Section titled Try it yourself - Personalize your footer](#try-it-yourself---personalize-your-footer)

Customize your footer to display multiple social networks (e.g. Instagram, Twitter, LinkedIn) and include your username to link directly to your own profile.

### Code Check-In

[Section titled Code Check-In](#code-check-in)

If you’ve been following along with each step in the tutorial, your `index.astro` file should look like this:

src/pages/index.astro

    ---import Navigation from '../components/Navigation.astro';import Footer from '../components/Footer.astro';import '../styles/global.css';
    const pageTitle = 'Home Page';---
    <html lang="en">  <head>    <meta charset="utf-8" />    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />    <meta name="viewport" content="width=device-width" />    <meta name="generator" content={Astro.generator} />    <title>{pageTitle}</title>  </head>  <body>    <Navigation />    <h1>{pageTitle}</h1>    <Footer />  </body></html>

Create a Social Media component
-------------------------------

[Section titled Create a Social Media component](#create-a-social-media-component)

Since you might have multiple online accounts you can link to, you can make a single, reusable component and display it multiple times. Each time, you will pass it different properties (`props`) to use: the online platform and your username there.

1.  Create a new file at the location `src/components/Social.astro`.
    
2.  Copy the following code into your new file, `Social.astro`.
    
    src/components/Social.astro
    
        ---const { platform, username } = Astro.props;---<a href={`https://www.${platform}.com/${username}`}>{platform}</a>
    

### Import and use `Social.astro` in your Footer

[Section titled Import and use Social.astro in your Footer](#import-and-use-socialastro-in-your-footer)

1.  Change the code in `src/components/Footer.astro` to import, then use this new component three times, passing different **component attributes** as props each time:
    
    src/components/Footer.astro
    
        ---const platform = "github";const username = "withastro";import Social from './Social.astro';---
        <footer>  <p>Learn more about my projects on <a href={`https://www.${platform}.com/${username}`}>{platform}</a>!</p>  <Social platform="twitter" username="astrodotbuild" />  <Social platform="github" username="withastro" />  <Social platform="youtube" username="astrodotbuild" /></footer>
    
2.  Check your browser preview, and you should see your new footer displaying links to these three platforms on each page.
    

Style your Social Media Component
---------------------------------

[Section titled Style your Social Media Component](#style-your-social-media-component)

1.  Customize the appearance of your links by adding a `<style>` tag to `src/components/Social.astro`.
    
    src/components/Social.astro
    
        ---const { platform, username } = Astro.props;---<a href={`https://www.${platform}.com/${username}`}>{platform}</a>
        <style>  a {    padding: 0.5rem 1rem;    color: white;    background-color: #4c1d95;    text-decoration: none;  }</style>
    
2.  Add a `<style>` tag to `src/components/Footer.astro` to improve the layout of its contents.
    
    src/components/Footer.astro
    
        ---import Social from './Social.astro';---<style>  footer {    display: flex;    gap: 1rem;    margin-top: 2rem;  }</style>
        <footer>  <Social platform="twitter" username="astrodotbuild" />  <Social platform="github" username="withastro" />  <Social platform="youtube" username="astrodotbuild" /></footer>
    
3.  Check your browser preview again and confirm that each page shows an updated footer.
    

### Test Yourself

[Section titled Test Yourself](#test-yourself)

1.  What line of code do you need to write in an Astro component’s frontmatter to receive values of `title`, `author`, and `date` as props?
    
    1.  `const { title, author, date } = Astro.props;`
        
    2.  `import BlogPost from '../components/BlogPost.astro'`
        
    3.  `<BlogPost title="My First Post" author="Dan" date="12 Aug 2022" />`
        
    
    Submit
    
    class s extends HTMLElement{#s;#i;#r;#e;#t;constructor(){super(),this.#s=this.dataset.correctLabel,this.#i=this.dataset.incorrectLabel,this.#r=Math.random().toString(),this.#e=this.querySelector(".submit"),this.#t=this.querySelector(".answer"),this.querySelectorAll(".opt-list > li").forEach(t=>this.#l(t))}#l(t){const e=t.querySelector('input\[type="radio"\]');e&&(e.removeAttribute("disabled"),e.setAttribute("name",this.#r),e.addEventListener("change",()=>{this.#n(),this.#c()}),e.checked&&this.#c())}#n(){this.#t.innerText="",this.#t.classList.remove("wrong","correct"),this.#t.classList.add("sr-only")}#o(t){const e=this.querySelector("input:checked ~ template");e?this.#t.replaceChildren(e.content.cloneNode(!0)):this.#t.innerText=t?this.#s:this.#i,this.#t.classList.remove("sr-only","wrong","correct"),this.#t.classList.add(t?"correct":"wrong")}#c(){this.#e.removeAttribute("disabled"),this.#e.classList.remove("sr-only"),this.#e.onclick=()=>this.#h()}#a(){this.#e.setAttribute("disabled",""),this.#e.classList.add("sr-only"),this.#e.onclick=null}#h(){const t=this.querySelector("input:checked");if(!t)return;this.#a();const e=t.dataset.isCorrect!==void 0&&\["","true"\].includes(t.dataset.isCorrect);this.#o(e)}}customElements.define("multiple-choice",s);
2.  How do you **pass values as props** to an Astro component?
    
    1.  `const { title, author, date } = Astro.props;`
        
    2.  `import BlogPost from '../components/BlogPost.astro'`
        
    3.  `<BlogPost title="My First Post" author="Dan" date="12 Aug 2022" />`
        
    
    Submit
    

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can create new `.astro` components in `src/components/`
*    I can import and use Astro components inside other Astro components.
*    I can pass props to an Astro component.

### Resources

[Section titled Resources](#resources)

*   [Component Props in Astro](/en/basics/astro-components/#component-props)

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/3-components/2.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Make a reusable Navigation component](/en/tutorial/3-components/1/) [Next  
Build it yourself - Header](/en/tutorial/3-components/3/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/tutorial/3-components/3
Build it yourself - Header
==========================

Since your site will be viewed on different devices, it’s time to create a page navigation that can respond to multiple screen sizes!

Get ready to…

*   Create a Header for your site that contains the Navigation component
*   Make the Navigation component responsive

Try it yourself - Build a new Header component
----------------------------------------------

[Section titled Try it yourself - Build a new Header component](#try-it-yourself---build-a-new-header-component)

1.  Create a new Header component. Import and use your existing `Navigation.astro` component inside a `<nav>` element which is inside a `<header>` element.
    
    Show me the code!
    
    Create a file named `Header.astro` in `src/components/`
    
    src/components/Header.astro
    
        ---import Navigation from './Navigation.astro';---<header>  <nav>    <Navigation />  </nav></header>
    

Try it yourself - Update your pages
-----------------------------------

[Section titled Try it yourself - Update your pages](#try-it-yourself---update-your-pages)

1.  On each page, replace your existing `<Navigation/>` component with your new header.
    
    Show me the code!
    
    src/pages/index.astro
    
        ---import Navigation from '../components/Navigation.astro';import Header from '../components/Header.astro';import Footer from '../components/Footer.astro';import '../styles/global.css';const pageTitle = "Home Page";---<html lang="en">  <head>    <meta charset="utf-8" />    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />    <meta name="viewport" content="width=device-width" />    <meta name="generator" content={Astro.generator} />    <title>{pageTitle}</title>  </head>  <body>    <Navigation />    <Header />    <h1>{pageTitle}</h1>    <Footer />  </body></html>
    
2.  Check your browser preview and verify that your header is displayed on every page. It won’t look different yet, but if you inspect your preview using dev tools, you will see that you now have elements like `<header>` and `<nav>` around your navigation links.
    

Add responsive styles
---------------------

[Section titled Add responsive styles](#add-responsive-styles)

1.  Update `Navigation.astro` with the CSS class to control your navigation links. Wrap the existing navigation links in a `<div>` with the class `nav-links`.
    
    src/components/Navigation.astro
    
        ------<div class="nav-links">  <a href="/">Home</a>  <a href="/about">About</a>  <a href="/blog">Blog</a></div>
    
2.  Copy the CSS styles below into `global.css`. These styles:
    
    *   Style and position the navigation links for mobile
    *   Include an `expanded` class that can be toggled to display or hide the links on mobile
    *   Use a `@media` query to define different styles for larger screen sizes
    
    Mobile-first design
    
    Start by defining what should happen on small screen sizes first! Smaller screen sizes require simpler layouts. Then, adjust your styles to accommodate larger devices. If you design the complicated case first, then you have to work to try to make it simple again.
    
    src/styles/global.css
    
        html {  background-color: #f1f5f9;  font-family: sans-serif;}
        body {  margin: 0 auto;  width: 100%;  max-width: 80ch;  padding: 1rem;  line-height: 1.5;}
        * {  box-sizing: border-box;}
        h1 {  margin: 1rem 0;  font-size: 2.5rem;}
        /* nav styles */
        .nav-links {  width: 100%;  top: 5rem;  left: 48px;  background-color: #ff9776;  display: none;  margin: 0;}
        .nav-links a {  display: block;  text-align: center;  padding: 10px 0;  text-decoration: none;  font-size: 1.2rem;  font-weight: bold;  text-transform: uppercase;}
        .nav-links a:hover,.nav-links a:focus {  background-color: #ff9776;}
        .expanded {  display: unset;}
        @media screen and (min-width: 636px) {  .nav-links {    margin-left: 5em;    display: block;    position: static;    width: auto;    background: none;  }
          .nav-links a {    display: inline-block;    padding: 15px 20px;  }
        }
    

Resize your window and look for different styles being applied at different screen widths. Your header is now **responsive** to screen size through the use of `@media` queries.

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can use CSS to add responsive elements to my site.

### Resources

[Section titled Resources](#resources)

*   [Component-based Design](https://www.droptica.com/blog/component-based-design/) external
    
*   [Semantic HTML Tags](https://www.dofactory.com/html/semantics) external
    
*   [Mobile-first Design](https://www.mobileapps.com/blog/mobile-first-design) external
    

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/3-components/3.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Create a social media footer](/en/tutorial/3-components/2/) [Next  
Send your first script to the browser](/en/tutorial/3-components/4/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/tutorial/3-components/4
Send your first script to the browser
=====================================

Let’s add a hamburger menu to open and close your links on mobile screen sizes, requiring some client-side interactivity!

Get ready to…

*   Create a hamburger menu component
*   Write a `<script>` to allow your site visitors to open and close the navigation menu
*   Move your JavaScript to its `.js` file

Build a Hamburger component
---------------------------

[Section titled Build a Hamburger component](#build-a-hamburger-component)

Create a `<Hamburger />` component to open and close your mobile menu.

1.  Create a file named `Hamburger.astro` in `src/components/`
    
2.  Copy the following code into your component. This will represent your 3-line “hamburger” menu to open and close your navigation links on mobile. (You will add the new CSS styles to `global.css` later.)
    
    src/components/Hamburger.astro
    
        ------<div class="hamburger">  <span class="line"></span>  <span class="line"></span>  <span class="line"></span></div>
    
3.  Place this new `<Hamburger />` component just before your `<Navigation />` component in `Header.astro`.
    
    Show me the code!
    
    src/components/Header.astro
    
        ---import Hamburger from './Hamburger.astro';import Navigation from './Navigation.astro';---<header>  <nav>    <Hamburger />    <Navigation />  </nav></header>
    
4.  Add the following styles for your Hamburger component:
    
    src/styles/global.css
    
        /* nav styles */.hamburger {  padding-right: 20px;  cursor: pointer;}
        .hamburger .line {  display: block;  width: 40px;  height: 5px;  margin-bottom: 10px;  background-color: #ff9776;}
        .nav-links {  width: 100%;  top: 5rem;  left: 48px;  background-color: #ff9776;  display: none;  margin: 0;}
        .nav-links a {  display: block;  text-align: center;  padding: 10px 0;  text-decoration: none;  font-size: 1.2rem;  font-weight: bold;  text-transform: uppercase;}
        .nav-links a:hover, a:focus {  background-color: #ff9776;}
        .expanded {  display: unset;}
        @media screen and (min-width: 636px) {  .nav-links {    margin-left: 5em;    display: block;    position: static;    width: auto;    background: none;  }
          .nav-links a {    display: inline-block;    padding: 15px 20px;  }
          .hamburger {    display: none;  }}
    

Write your first script tag
---------------------------

[Section titled Write your first script tag](#write-your-first-script-tag)

Your header is not yet **interactive** because it can’t respond to user input, like clicking on the hamburger menu to show or hide the navigation links.

Adding a `<script>` tag provides client-side JavaScript to “listen” for a user event and then respond accordingly.

1.  Add the following `<script>` tag to `index.astro`, just before the closing `</body>` tag.
    
    src/pages/index.astro
    
          <Footer />  <script>    document.querySelector('.hamburger')?.addEventListener('click', () => {      document.querySelector('.nav-links')?.classList.toggle('expanded');    });  </script></body>
    
2.  Check your browser preview again at various sizes, and verify that you have a working navigation menu that is both responsive to screen size and responds to user input on this page.
    

### Importing a `.js` file

[Section titled Importing a .js file](#importing-a-js-file)

Instead of writing your JavaScript directly on each page, you can move the contents of your `<script>` tag into its own `.js` file in your project.

1.  Create `src/scripts/menu.js` (you will have to create a new `/scripts/` folder) and move your JavaScript into it.
    
    src/scripts/menu.js
    
        document.querySelector('.hamburger').addEventListener('click', () => {  document.querySelector('.nav-links').classList.toggle('expanded');});
    
2.  Replace the contents of the `<script>` tag on `index.astro` with the following file import:
    
    src/pages/index.astro
    
          <Footer />  <script>    document.querySelector('.hamburger')?.addEventListener('click', () => {      document.querySelector('.nav-links')?.classList.toggle('expanded');    });
            import "../scripts/menu.js";  </script></body>
    
3.  Check your browser preview again at a smaller size and verify that the hamburger menu still opens and closes your navigation links.
    
4.  Add the same `<script>` with import to your other two pages, `about.astro` and `blog.astro` and verify that you have a responsive, interactive header on each page.
    
    src/pages/about.astro & src/pages/blog.astro
    
          <Footer />  <script>    import "../scripts/menu.js";  </script></body>
    

Takeaway

You had previously used some JavaScript to build parts of your site:

*   Defining your page title and heading dynamically
*   Mapping through a list of skills on the About page
*   Conditionally displaying HTML elements

Those commands are all executed at build time to create static HTML for your site, and then the code is “thrown away.”

**The JavaScript in a `<script>` tag is sent to the browser**, and is available to run, based on user interactions like refreshing a page or toggling an input.

### Test your knowledge

[Section titled Test your knowledge](#test-your-knowledge)

1.  When does Astro run any JavaScript written in a component’s frontmatter?
    
    1.  Astro never runs JavaScript
        
    2.  at build-time
        
    3.  When a visitor clicks a button
        
    
    Submit
    
    class s extends HTMLElement{#s;#i;#r;#e;#t;constructor(){super(),this.#s=this.dataset.correctLabel,this.#i=this.dataset.incorrectLabel,this.#r=Math.random().toString(),this.#e=this.querySelector(".submit"),this.#t=this.querySelector(".answer"),this.querySelectorAll(".opt-list > li").forEach(t=>this.#l(t))}#l(t){const e=t.querySelector('input\[type="radio"\]');e&&(e.removeAttribute("disabled"),e.setAttribute("name",this.#r),e.addEventListener("change",()=>{this.#n(),this.#c()}),e.checked&&this.#c())}#n(){this.#t.innerText="",this.#t.classList.remove("wrong","correct"),this.#t.classList.add("sr-only")}#o(t){const e=this.querySelector("input:checked ~ template");e?this.#t.replaceChildren(e.content.cloneNode(!0)):this.#t.innerText=t?this.#s:this.#i,this.#t.classList.remove("sr-only","wrong","correct"),this.#t.classList.add(t?"correct":"wrong")}#c(){this.#e.removeAttribute("disabled"),this.#e.classList.remove("sr-only"),this.#e.onclick=()=>this.#h()}#a(){this.#e.setAttribute("disabled",""),this.#e.classList.add("sr-only"),this.#e.onclick=null}#h(){const t=this.querySelector("input:checked");if(!t)return;this.#a();const e=t.dataset.isCorrect!==void 0&&\["","true"\].includes(t.dataset.isCorrect);this.#o(e)}}customElements.define("multiple-choice",s);
2.  Optionally, Astro can send JavaScript to the browser to allow:
    
    1.  users to click page links
        
    2.  faster load times
        
    3.  client-side interactivity
        
    
    Submit
    
3.  The client-side JavaScript will be sent to a user’s browser when it is written or imported:
    
    1.  in `<script>` tags
        
    2.  between a `.astro` file’s code fences
        
    3.  in `global.css`
        
    
    Submit
    

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can add client-side interactivity with JavaScript in a `<script>` tag.
*    I can import a `.js` file into a `<script>` tag.

### Resources

[Section titled Resources](#resources)

[Client-side scripts in Astro](/en/guides/client-side-scripts/)

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/3-components/4.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Build it yourself - Header](/en/tutorial/3-components/3/) [Next  
Check in: Unit 4 - Layouts](/en/tutorial/4-layouts/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)





# Aggregated from ./pages/tutorial/4-layouts
Check in: Unit 4 - Layouts
==========================

Now that you can build with components, it’s time to create some custom layouts!

Looking ahead
-------------

[Section titled Looking ahead](#looking-ahead)

In this unit, you’ll build layouts to share common elements and styles across your pages and blog posts.

To do this, you will:

*   Create reusable layout components
*   Pass content to your layouts with `<slot />`
*   Pass data from Markdown frontmatter to your layouts
*   Nest multiple layouts

Checklist
---------

[Section titled Checklist](#checklist)

 *    I am ready to take my page design to the next level with layouts!

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/4-layouts/index.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Send your first script to the browser](/en/tutorial/3-components/4/) [Next  
Build your first layout](/en/tutorial/4-layouts/1/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/tutorial/4-layouts/1
Build your first layout
=======================

Get ready to…

*   Refactor common elements into a page layout
*   Use an Astro `<slot />` element to place page contents within a layout
*   Pass page-specific values as props to its layout

You still have some Astro components repeatedly rendered on every page. It’s time to refactor again to create a shared page layout!

Create your first layout component
----------------------------------

[Section titled Create your first layout component](#create-your-first-layout-component)

1.  Create a new file at the location `src/layouts/BaseLayout.astro`. (You will need to create a new `layouts` folder first.)
    
2.  Copy the **entire contents** of `index.astro` into your new file, `BaseLayout.astro`.
    
    src/layouts/BaseLayout.astro
    
        ---import Header from '../components/Header.astro';import Footer from '../components/Footer.astro';import '../styles/global.css';const pageTitle = "Home Page";---<html lang="en">  <head>    <meta charset="utf-8" />    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />    <meta name="viewport" content="width=device-width" />    <meta name="generator" content={Astro.generator} />    <title>{pageTitle}</title>  </head>  <body>    <Header />    <h1>{pageTitle}</h1>    <Footer />    <script>      import "../scripts/menu.js";    </script>  </body></html>
    

Use your layout on a page
-------------------------

[Section titled Use your layout on a page](#use-your-layout-on-a-page)

3.  Replace the code at `src/pages/index.astro` with the following:
    
    src/pages/index.astro
    
        ---import BaseLayout from '../layouts/BaseLayout.astro';const pageTitle = "Home Page";---<BaseLayout>  <h2>My awesome blog subtitle</h2></BaseLayout>
    
4.  Check the browser preview again to notice what did (or, spoiler alert: did _not_!) change.
    
5.  Add a `<slot />` element to `src/layouts/BaseLayout.astro` just above the footer component, then check the browser preview of your Home page and notice what really _did_ change this time!
    
    src/layouts/BaseLayout.astro
    
        ---import Header from '../components/Header.astro';import Footer from '../components/Footer.astro';import '../styles/global.css';const pageTitle = "Home Page";---<html lang="en">  <head>    <meta charset="utf-8" />    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />    <meta name="viewport" content="width=device-width" />    <meta name="generator" content={Astro.generator} />    <title>{pageTitle}</title>  </head>  <body>    <Header />    <h1>{pageTitle}</h1>    <slot />    <Footer />    <script>      import "../scripts/menu.js";    </script>  </body></html>
    

The `<slot />` allows you to inject (or “slot in”) **child content** written between opening and closing `<Component></Component>` tags to any `Component.astro` file.

Pass page-specific values as props
----------------------------------

[Section titled Pass page-specific values as props](#pass-page-specific-values-as-props)

6.  Pass the page title to your layout component from `index.astro` using a component attribute:
    
    src/pages/index.astro
    
        ---import BaseLayout from '../layouts/BaseLayout.astro';const pageTitle = "Home Page";---<BaseLayout pageTitle={pageTitle}>  <h2>My awesome blog subtitle</h2></BaseLayout>
    
7.  Change the script of your `BaseLayout.astro` layout component to receive a page title via `Astro.props` instead of defining it as a constant.
    
    src/layouts/BaseLayout.astro
    
        ---import Header from '../components/Header.astro';import Footer from '../components/Footer.astro';import '../styles/global.css';const pageTitle = "Home Page";const { pageTitle } = Astro.props;---
    
8.  Check your browser preview to verify that your page title has not changed. It has the same value, but is now being rendered dynamically. And now, each individual page can specify its own title to the layout.
    

Try it yourself - Use your layout everywhere
--------------------------------------------

[Section titled Try it yourself - Use your layout everywhere](#try-it-yourself---use-your-layout-everywhere)

**Refactor** your other pages (`blog.astro` and `about.astro`) so that they use your new `<BaseLayout>` component to render the common page elements.

Don’t forget to:

*   Pass a page title as props via a component attribute.
    
*   Let the layout be responsible for the HTML rendering of any common elements.
    
*   Move any existing `<style>` tags in the page `<head>` with styles you wish to keep to the page HTML template.
    
*   Delete anything from each individual page that is now being handled by the layout, including:
    
    *   HTML elements
    *   Components and their imports
    *   CSS rules in a `<style>` tag (e.g. `<h1>` in your About page)
    *   `<script>` tags

Keeping your About page styles

Using the `<BaseLayout>` to render your `about.astro` page means you will lose the `<style>` tag added to the `<head>` of this page. To continue to style items only at the page level using Astro’s scoped styling, move the `<style>` tag to the body of the page component. This allows you to style **elements created in this page component** (e.g. your list of skills).

Since your `<h1>` is now created by your layout component, you can add the `is:global` attribute to your style tag to affect every element on this page, including those created by other components: `<style is:global define:vars={{ skillColor, fontWeight, textCase }}>`

### Test your knowledge

[Section titled Test your knowledge](#test-your-knowledge)

1.  An Astro component (`.astro` file) can function as a:
    
    1.  page
    2.  UI component
    3.  layout
    4.  all of the above, because Astro components are so functional! 🏗️
    
    Submit
    
    class s extends HTMLElement{#s;#i;#r;#e;#t;constructor(){super(),this.#s=this.dataset.correctLabel,this.#i=this.dataset.incorrectLabel,this.#r=Math.random().toString(),this.#e=this.querySelector(".submit"),this.#t=this.querySelector(".answer"),this.querySelectorAll(".opt-list > li").forEach(t=>this.#l(t))}#l(t){const e=t.querySelector('input\[type="radio"\]');e&&(e.removeAttribute("disabled"),e.setAttribute("name",this.#r),e.addEventListener("change",()=>{this.#n(),this.#c()}),e.checked&&this.#c())}#n(){this.#t.innerText="",this.#t.classList.remove("wrong","correct"),this.#t.classList.add("sr-only")}#o(t){const e=this.querySelector("input:checked ~ template");e?this.#t.replaceChildren(e.content.cloneNode(!0)):this.#t.innerText=t?this.#s:this.#i,this.#t.classList.remove("sr-only","wrong","correct"),this.#t.classList.add(t?"correct":"wrong")}#c(){this.#e.removeAttribute("disabled"),this.#e.classList.remove("sr-only"),this.#e.onclick=()=>this.#h()}#a(){this.#e.setAttribute("disabled",""),this.#e.classList.add("sr-only"),this.#e.onclick=null}#h(){const t=this.querySelector("input:checked");if(!t)return;this.#a();const e=t.dataset.isCorrect!==void 0&&\["","true"\].includes(t.dataset.isCorrect);this.#o(e)}}customElements.define("multiple-choice",s);
2.  To display a page title on the page, you can:
    
    1.  use a standard HTML element on the page with static text (e.g `<h1>Home Page</h1>`)
        
    2.  use a standard HTML element on the page referring to a variable defined in your component’s frontmatter script (e.g. `<h1>{pageTitle}</h1>`)
        
    3.  use a layout component on the page, passing the title as a component attribute (e.g. `<BaseLayout title="Home Page" />` or `<BaseLayout title={pageTitle} />`)
        
    4.  all of the above, because Astro lets you use plain HTML or supercharge it with some script and components! 💪
        
    
    Submit
    
3.  Information can be passed from one component to another by:
    
    1.  importing a UI component and rendering it in the template of another component
        
    2.  passing props to a component where it is rendered via a component attribute
        
    3.  sending HTML content to be rendered inside another component using a `<slot />` placeholder
        
    4.  all of the above, because Astro was built to take advantage of component-based design! 🧩
        
    
    Submit
    

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can create an Astro layout component with a `<slot />`.
*    I can send page-specific properties to a layout.

### Resources

[Section titled Resources](#resources)

*   [Astro layout components](/en/basics/layouts/)
    
*   [Astro `<slot />`](/en/basics/astro-components/#slots)
    

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/4-layouts/1.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Check in: Unit 4 - Layouts](/en/tutorial/4-layouts/) [Next  
Create and pass data to a custom blog layout](/en/tutorial/4-layouts/2/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/tutorial/4-layouts/2
Create and pass data to a custom blog layout
============================================

Now that you have a layout for your pages, it’s time to add a layout for blog posts!

Get ready to…

*   Create a new blog post layout for your Markdown files
*   Pass YAML frontmatter values as props to layout component

Add a layout to your blog posts
-------------------------------

[Section titled Add a layout to your blog posts](#add-a-layout-to-your-blog-posts)

When you include the `layout` frontmatter property in an `.md` file, all of your frontmatter YAML values are available to the layout file.

1.  Create a new file at `src/layouts/MarkdownPostLayout.astro`
    
2.  Copy the following code into `MarkdownPostLayout.astro`
    
    src/layouts/MarkdownPostLayout.astro
    
        ---const { frontmatter } = Astro.props;---<meta charset="utf-8" /><h1>{frontmatter.title}</h1><p>Written by {frontmatter.author}</p><slot />
    
3.  Add the following frontmatter property in `post-1.md`
    
    src/pages/posts/post-1.md
    
        ---layout: ../../layouts/MarkdownPostLayout.astrotitle: 'My First Blog Post'pubDate: 2022-07-01description: 'This is the first post of my new Astro blog.'author: 'Astro Learner'image:    url: 'https://docs.astro.build/assets/rose.webp'    alt: 'The Astro logo on a dark background with a pink glow.'tags: ["astro", "blogging", "learning in public"]---
    
4.  Check your browser preview again at `http://localhost:4321/posts/post-1` and notice what the layout has added to your page.
    
5.  Add the same layout property to your two other blog posts `post-2.md` and `post-3.md`. Verify in your browser that your layout is also applied to these posts.
    

Tip

When using layouts, you now have the option of including elements, like a page title, in the Markdown content or in the layout. Remember to visually inspect your page preview and make any adjustments necessary to avoid duplicated elements.

Try it yourself - Customize your blog post layout
-------------------------------------------------

[Section titled Try it yourself - Customize your blog post layout](#try-it-yourself---customize-your-blog-post-layout)

**Challenge**: Identify items common to every blog post, and use `MarkdownPostLayout.astro` to render them, instead of writing them in your Markdown in `post-1.md` and in every future blog post.

Here’s an example of refactoring your code to include the `pubDate` in the layout component instead of writing it in the body of your Markdown:

src/pages/posts/post-1.md

    Published on: 2022-07-01
    Welcome to my _new blog_ about learning Astro! Here, I will share my learning journey as I build a new website.

src/layouts/MarkdownPostLayout.astro

    ---const { frontmatter } = Astro.props;---<meta charset="utf-8" /><h1>{frontmatter.title}</h1><p>Published on: {frontmatter.pubDate.toString().slice(0,10)}</p><p>Written by {frontmatter.author}</p><slot />

Refactor as much as you think is useful to you, and add as much to your layout as you want, remembering that everything that you add to your layout is one less thing you will write in each and every blog post!

Here is an example of a refactored layout that leaves only individual blog post content rendered by the slot. Feel free to use this, or create your own!

src/layouts/MarkdownPostLayout.astro

    ---const { frontmatter } = Astro.props;---<meta charset="utf-8" /><h1>{frontmatter.title}</h1><p>{frontmatter.pubDate.toString().slice(0,10)}</p><p><em>{frontmatter.description}</em></p><p>Written by: {frontmatter.author}</p><img src={frontmatter.image.url} width="300" alt={frontmatter.image.alt} /><slot />

Avoid duplication

Anything rendered by your layout does **not** need to be typed into your blog post! If you notice any duplication when you check your browser preview, then be sure to remove content from your Markdown file.

### Test your knowledge

[Section titled Test your knowledge](#test-your-knowledge)

Can you figure out what should go in the blanks so that the following two components together produce working Astro code?

1.  src/pages/posts/learning-astro.md
    
        ---layout: ../../__________/MyMarkdownLayout.astrotitle: "Learning About Markdown in Astro"author: Astro Learner____: 2022-08-08---I learned so much today! Astro allows me to write in Markdown, but also use variables from the frontmatter. I can even access those values in an Astro layout component.
    
2.  src/layouts/MyMarkdownLayout.astro
    
        ---import ____________ from '../components/Footer.astro'const { ___________ } = Astro.props---<h1>{frontmatter.title}</h1><p>Written by: {frontmatter.______} on {frontmatter.pubDate}</p>< _______ /><Footer />
    
    Show the blanks filled in!
    
    1.  src/pages/posts/learning-astro.md
        
            ---layout: ../../layouts/MyMarkdownLayout.astrotitle: "Learning About Markdown in Astro"author: Astro LearnerpubDate: 2022-08-08---I learned so much today! Astro allows me to write in Markdown, but also use variables from the frontmatter. I can even access those values in an Astro layout component.
        
    2.  src/layouts/MyMarkdownLayout.astro
        
            ---import Footer from '../components/Footer.astro'const { frontmatter } = Astro.props---<h1>{frontmatter.title}</h1><p>Written by: {frontmatter.author} on {frontmatter.pubDate}</p><slot /><Footer />
        
    

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can add a layout property to a Markdown blog post in its YAML frontmatter.
*    I can create a separate layout for Markdown posts.
*    I can use values from a blog post’s frontmatter in a layout component.

### Resources

[Section titled Resources](#resources)

*   [Markdown Layouts in Astro](/en/guides/markdown-content/#frontmatter-layout-property)
    
*   [Markdown Layout Props](/en/basics/layouts/#markdown-layout-props)
    
*   [Introduction to YAML](https://dev.to/paulasantamaria/introduction-to-yaml-125f) external
    

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/4-layouts/2.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Build your first layout](/en/tutorial/4-layouts/1/) [Next  
Combine layouts to get the best of both worlds](/en/tutorial/4-layouts/3/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/tutorial/4-layouts/3
Combine layouts to get the best of both worlds
==============================================

Now that you have added a layout to each blog post, it’s time to make your posts look like the rest of the pages on your website!

Get ready to…

*   Nest your blog post layout inside your main page layout

Nest your two layouts
---------------------

[Section titled Nest your two layouts](#nest-your-two-layouts)

You already have a `BaseLayout.astro` for defining the overall layout of your pages.

`MarkdownPostLayout.astro` gives you some additional templating for common blog post properties such as `title` and `date`, but your blog posts don’t look like the other pages on your site. You can match the look of your blog posts to the rest of your site by **nesting layouts**.

1.  In `src/layouts/MarkdownPostLayout.astro`, import `BaseLayout.astro` and use it to wrap the entire template content. Don’t forget to pass the `pageTitle` prop:
    
    src/layouts/MarkdownPostLayout.astro
    
        ---import BaseLayout from './BaseLayout.astro';const { frontmatter } = Astro.props;---<BaseLayout pageTitle={frontmatter.title}>  <meta charset="utf-8" />  <h1>{frontmatter.title}</h1>  <p>{frontmatter.pubDate.toString().slice(0,10)}</p>  <p><em>{frontmatter.description}</em></p>  <p>Written by: {frontmatter.author}</p>  <img src={frontmatter.image.url} width="300" alt={frontmatter.image.alt} />  <slot /></BaseLayout>
    
2.  In `src/layouts/MarkdownPostLayout.astro`, you can now remove the `meta` tag as it is already included in your `BaseLayout`:
    
    src/layouts/MarkdownPostLayout.astro
    
        ---import BaseLayout from './BaseLayout.astro';const { frontmatter } = Astro.props;---<BaseLayout pageTitle={frontmatter.title}>  <meta charset="utf-8" />  <h1>{frontmatter.title}</h1>  <p>{frontmatter.pubDate.toString().slice(0,10)}</p>  <p><em>{frontmatter.description}</em></p>  <p>Written by: {frontmatter.author}</p>  <img src={frontmatter.image.url} width="300" alt={frontmatter.image.alt} />  <slot /></BaseLayout>
    
3.  Check your browser preview at `http://localhost:4321/posts/post-1`. Now you should see content rendered by:
    
    *   Your **main page layout**, including your styles, navigation links, and social footer.
    *   Your **blog post layout**, including frontmatter properties like the description, date, title, and image.
    *   Your **individual blog post Markdown content**, including just the text written in this post.
4.  Notice that your page title is now displayed twice, once by each layout.
    
    Remove the line that displays your page title from `MarkdownPostLayout.astro`:
    
    src/layouts/MarkdownPostLayout.astro
    
        <BaseLayout pageTitle={frontmatter.title}>  <h1>{frontmatter.title}</h1>  <p>{frontmatter.pubDate.toString().slice(0,10)}</p>  <p><em>{frontmatter.description}</em></p>  <p>Written by: {frontmatter.author}</p>  <img src={frontmatter.image.url} width="300" alt={frontmatter.image.alt} />  <slot /></BaseLayout>
    
5.  Check your browser preview again at `http://localhost:4321/posts/post-1` and verify that this line is no longer displayed and that your title is only displayed once. Make any other adjustments necessary to ensure that you do not have any duplicated content.
    

Make sure that:

*   Each blog post shows the same page template, and no content is missing. (If one of your blog posts is missing content, check its frontmatter properties.)
    
*   No content is duplicated on a page. (If something is being rendered twice, then be sure to remove it from `MarkdownPostLayout.astro`.)
    

If you’d like to customize your page template, you can.

### Test your knowledge

[Section titled Test your knowledge](#test-your-knowledge)

1.  This allows you to nest one layout inside another and take advantage of working with modular pieces.
    
    1.  continuous deployment
        
    2.  responsive design
        
    3.  component-based design
        
    
    Submit
    
    class s extends HTMLElement{#s;#i;#r;#e;#t;constructor(){super(),this.#s=this.dataset.correctLabel,this.#i=this.dataset.incorrectLabel,this.#r=Math.random().toString(),this.#e=this.querySelector(".submit"),this.#t=this.querySelector(".answer"),this.querySelectorAll(".opt-list > li").forEach(t=>this.#l(t))}#l(t){const e=t.querySelector('input\[type="radio"\]');e&&(e.removeAttribute("disabled"),e.setAttribute("name",this.#r),e.addEventListener("change",()=>{this.#n(),this.#c()}),e.checked&&this.#c())}#n(){this.#t.innerText="",this.#t.classList.remove("wrong","correct"),this.#t.classList.add("sr-only")}#o(t){const e=this.querySelector("input:checked ~ template");e?this.#t.replaceChildren(e.content.cloneNode(!0)):this.#t.innerText=t?this.#s:this.#i,this.#t.classList.remove("sr-only","wrong","correct"),this.#t.classList.add(t?"correct":"wrong")}#c(){this.#e.removeAttribute("disabled"),this.#e.classList.remove("sr-only"),this.#e.onclick=()=>this.#h()}#a(){this.#e.setAttribute("disabled",""),this.#e.classList.add("sr-only"),this.#e.onclick=null}#h(){const t=this.querySelector("input:checked");if(!t)return;this.#a();const e=t.dataset.isCorrect!==void 0&&\["","true"\].includes(t.dataset.isCorrect);this.#o(e)}}customElements.define("multiple-choice",s);
2.  Multiple layouts are particularly useful for projects that contain Markdown pages, like a…
    
    1.  blog
        
    2.  dashboard
        
    3.  chat app
        
    
    Submit
    
3.  Which of these provides templating for all your pages?
    
    1.  `index.astro`
        
    2.  `BaseLayout.astro`
        
    3.  `post-1.md`
        
    
    Submit
    

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can nest layouts, checking for any duplicated elements.

### Resources

[Section titled Resources](#resources)

*   [Nesting Layouts in Astro](/en/basics/layouts/#nesting-layouts)

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/4-layouts/3.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Create and pass data to a custom blog layout](/en/tutorial/4-layouts/2/) [Next  
Check in: Unit 5 - Astro API](/en/tutorial/5-astro-api/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)





# Aggregated from ./pages/tutorial/5-astro-api
Check in: Unit 5 - Astro API
============================

Now that you have some blog posts, it’s time to use Astro’s API to work with your files!

Looking ahead
-------------

[Section titled Looking ahead](#looking-ahead)

In this unit, you’ll supercharge your blog with an index page, tag pages, and an RSS feed.

Along the way, you’ll learn how to use:

*   `import.meta.glob()` to access data from files in your project
*   `getStaticPaths()` to create multiple pages (routes) at once
*   The Astro RSS package to create an RSS feed

Checklist
---------

[Section titled Checklist](#checklist)

 *    I am ready to add some blog features to my Astro project!

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/5-astro-api/index.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Combine layouts to get the best of both worlds](/en/tutorial/4-layouts/3/) [Next  
Create a blog post archive](/en/tutorial/5-astro-api/1/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/tutorial/5-astro-api/1
Create a blog post archive
==========================

Now that you have a few blog posts to link to, it’s time to configure the Blog page to create a list of them automatically!

Get ready to…

*   Access data from all your posts at once using `import.meta.glob()`
*   Display a dynamically generated list of posts on your Blog page
*   Refactor to use a `<BlogPost />` component for each list item

Dynamically display a list of posts
-----------------------------------

[Section titled Dynamically display a list of posts](#dynamically-display-a-list-of-posts)

1.  Add the following code to `blog.astro` to return information about all your Markdown files. `import.meta.glob()` will return an array of objects, one for each blog post.
    
    src/pages/blog.astro
    
        ---import BaseLayout from '../layouts/BaseLayout.astro'const allPosts = Object.values(import.meta.glob('./posts/*.md', { eager: true }));const pageTitle = "My Astro Learning Blog";---<BaseLayout pageTitle={pageTitle}>  <p>This is where I will post about my journey learning Astro.</p>  <ul>    <li><a href="/posts/post-1/">Post 1</a></li>    <li><a href="/posts/post-2/">Post 2</a></li>    <li><a href="/posts/post-3/">Post 3</a></li>  </ul></BaseLayout>
    
2.  To generate the entire list of posts dynamically, using the post titles and URLs, replace your individual `<li>` tags with the following Astro code:
    
    src/pages/blog.astro
    
        ---import BaseLayout from '../layouts/BaseLayout.astro'const allPosts = Object.values(import.meta.glob('./posts/*.md', { eager: true }));const pageTitle = "My Astro Learning Blog";---<BaseLayout pageTitle={pageTitle}>  <p>This is where I will post about my journey learning Astro.</p>  <ul>    <li><a href="/posts/post-1/">Post 1</a></li>    <li><a href="/posts/post-2/">Post 2</a></li>    <li><a href="/posts/post-3/">Post 3</a></li>
            {allPosts.map((post: any) => <li><a href={post.url}>{post.frontmatter.title}</a></li>)}  </ul></BaseLayout>
    
    Your entire list of blog posts is now being generated dynamically using Astro’s built-in TypeScript support, by mapping over the array returned by `import.meta.glob()`.
    
3.  Add a new blog post by creating a new `post-4.md` file in `src/pages/posts/` and adding some Markdown content. Be sure to include at least the frontmatter properties used below.
    
        ---layout: ../../layouts/MarkdownPostLayout.astrotitle: My Fourth Blog Postauthor: Astro Learnerdescription: "This post will show up on its own!"image:    url: "https://docs.astro.build/default-og-image.png"    alt: "The word astro against an illustration of planets and stars."pubDate: 2022-08-08tags: ["astro", "successes"]---This post should show up with my other blog posts, because `import.meta.glob()` is returning a list of all my posts in order to create my list.
    
4.  Revisit your blog page in your browser preview at `http://localhost:4321/blog` and look for an updated list with four items, including your new blog post!
    

Challenge: Create a BlogPost component
--------------------------------------

[Section titled Challenge: Create a BlogPost component](#challenge-create-a-blogpost-component)

Try on your own to make all the necessary changes to your Astro project so that you can instead use the following code to generate your list of blog posts:

src/pages/blog.astro

    <ul>  {allPosts.map((post: any) => <li><a href={post.url}>{post.frontmatter.title}</a></li>)}  {allPosts.map((post: any) => <BlogPost url={post.url} title={post.frontmatter.title} />)}</ul>

Expand to see the steps

1.  Create a new component in `src/components/`.
    
    Show the filename
    
        BlogPost.astro
    
2.  Write the line of code in your component so that it will be able to receive a `title` and `url` as `Astro.props`.
    
    Show the code
    
    src/components/BlogPost.astro
    
        ---const { title, url } = Astro.props;---
    
3.  Add the templating used to create each item in your blog post list.
    
    Show the code
    
    src/components/BlogPost.astro
    
        <li><a href={url}>{title}</a></li>
    
4.  Import the new component into your Blog page.
    
    Show the code
    
    src/pages/blog.astro
    
        ---import BaseLayout from '../layouts/BaseLayout.astro';import BlogPost from '../components/BlogPost.astro';const allPosts = Object.values(import.meta.glob('../pages/posts/*.md', { eager: true }));const pageTitle = "My Astro Learning Blog";---
    
5.  Check Yourself: see the finished component code.
    
    Show the code
    
    src/components/BlogPost.astro
    
        ---const { title, url } = Astro.props---<li><a href={url}>{title}</a></li>
    
    src/pages/blog.astro
    
        ---import BaseLayout from '../layouts/BaseLayout.astro';import BlogPost from '../components/BlogPost.astro';const allPosts = Object.values(import.meta.glob('../pages/posts/*.md', { eager: true }));const pageTitle = "My Astro Learning Blog"---<BaseLayout pageTitle={pageTitle}>  <p>This is where I will post about my journey learning Astro.</p>  <ul>    {allPosts.map((post: any) => <BlogPost url={post.url} title={post.frontmatter.title} />)}  </ul></BaseLayout>
    

### Test your knowledge

[Section titled Test your knowledge](#test-your-knowledge)

If your Astro component contains the following line of code:

    ---const myPosts = Object.values(import.meta.glob('./posts/*.md', { eager:  true }));---

Choose the syntax you could write to represent:

1.  The title of your third blog post.
    
    1.  `myPosts.map((post) => <LastUpdated date={post.frontmatter.pubDate} />)`
        
    2.  `myPosts[2].frontmatter.title`
        
    3.  `<a href={myPosts[0].url}>First Post!!</a>`
        
    
    Submit
    
    class s extends HTMLElement{#s;#i;#r;#e;#t;constructor(){super(),this.#s=this.dataset.correctLabel,this.#i=this.dataset.incorrectLabel,this.#r=Math.random().toString(),this.#e=this.querySelector(".submit"),this.#t=this.querySelector(".answer"),this.querySelectorAll(".opt-list > li").forEach(t=>this.#l(t))}#l(t){const e=t.querySelector('input\[type="radio"\]');e&&(e.removeAttribute("disabled"),e.setAttribute("name",this.#r),e.addEventListener("change",()=>{this.#n(),this.#c()}),e.checked&&this.#c())}#n(){this.#t.innerText="",this.#t.classList.remove("wrong","correct"),this.#t.classList.add("sr-only")}#o(t){const e=this.querySelector("input:checked ~ template");e?this.#t.replaceChildren(e.content.cloneNode(!0)):this.#t.innerText=t?this.#s:this.#i,this.#t.classList.remove("sr-only","wrong","correct"),this.#t.classList.add(t?"correct":"wrong")}#c(){this.#e.removeAttribute("disabled"),this.#e.classList.remove("sr-only"),this.#e.onclick=()=>this.#h()}#a(){this.#e.setAttribute("disabled",""),this.#e.classList.add("sr-only"),this.#e.onclick=null}#h(){const t=this.querySelector("input:checked");if(!t)return;this.#a();const e=t.dataset.isCorrect!==void 0&&\["","true"\].includes(t.dataset.isCorrect);this.#o(e)}}customElements.define("multiple-choice",s);
2.  A link to the URL of your first blog post.
    
    1.  `myPosts.map((post) => <LastUpdated date={post.frontmatter.pubDate} />)`
        
    2.  `myPosts[2].frontmatter.title`
        
    3.  `<a href={myPosts[0].url}>First Post!!</a>`
        
    
    Submit
    
3.  A component for each post, displaying the date that it was last updated.
    
    1.  `myPosts.map((post) => <LastUpdated date={post.frontmatter.pubDate} />)`
        
    2.  `myPosts[2].frontmatter.title`
        
    3.  `<a href={myPosts[0].url}>First Post!!</a>`
        
    
    Submit
    

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can query for data from my local files.
*    I can display a list of all my blog posts.

### Resources

[Section titled Resources](#resources)

*   [Importing glob patterns in Astro](/en/guides/imports/#importmetaglob)

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/5-astro-api/1.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Check in: Unit 5 - Astro API](/en/tutorial/5-astro-api/) [Next  
Generate tag pages](/en/tutorial/5-astro-api/2/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/tutorial/5-astro-api/2
Generate tag pages
==================

Get ready to…

*   Create a page to generate multiple pages
*   Specify which page routes to build, and pass each page its own props

Dynamic page routing
--------------------

[Section titled Dynamic page routing](#dynamic-page-routing)

You can create entire sets of pages dynamically using `.astro` files that export a `getStaticPaths()` function.

Create pages dynamically
------------------------

[Section titled Create pages dynamically](#create-pages-dynamically)

1.  Create a new file at `src/pages/tags/[tag].astro`. (You will have to create a new folder.) Notice that the file name (`[tag].astro`) uses square brackets. Paste the following code into the file:
    
    src/pages/tags/\[tag\].astro
    
        ---import BaseLayout from '../../layouts/BaseLayout.astro';
        export async function getStaticPaths() {  return [    { params: { tag: "astro" } },    { params: { tag: "successes" } },    { params: { tag: "community" } },    { params: { tag: "blogging" } },    { params: { tag: "setbacks" } },    { params: { tag: "learning in public" } },  ];}
        const { tag } = Astro.params;---<BaseLayout pageTitle={tag}>  <p>Posts tagged with {tag}</p></BaseLayout>
    
    The `getStaticPaths` function returns an array of page routes, and all of the pages at those routes will use the same template defined in the file.
    
2.  If you have customized your blog posts, then replace the individual tag values (e.g. “astro”, “successes”, “community”, etc.) with the tags used in your own posts.
    
3.  Make sure that every blog post contains at least one tag, written as an array, e.g. `tags: ["blogging"]`.
    
4.  Visit `http://localhost:4321/tags/astro` in your browser preview and you should see a page, generated dynamically from `[tag].astro`. Check that you also have pages created for each of your tags at `/tags/successes`, `/tags/community`, and `/tags/learning%20in%20public`, etc., or at each of your custom tags. You may need to first quit and restart the dev server to see these new pages.
    

Use props in dynamic routes
---------------------------

[Section titled Use props in dynamic routes](#use-props-in-dynamic-routes)

1.  Add the following props to your `getStaticPaths()` function in order to make data from all your blog posts available to each page route.
    
    Be sure to give each route in your array the new props, and then make those props available to your component template outside of your function.
    
    src/pages/tags/\[tag\].astro
    
        ---import BaseLayout from '../../layouts/BaseLayout.astro';
        export async function getStaticPaths() {  const allPosts = Object.values(import.meta.glob('../posts/*.md', { eager: true }));
          return [    {params: {tag: "astro"}, props: {posts: allPosts}},    {params: {tag: "successes"}, props: {posts: allPosts}},    {params: {tag: "community"}, props: {posts: allPosts}},    {params: {tag: "blogging"}, props: {posts: allPosts}},    {params: {tag: "setbacks"}, props: {posts: allPosts}},    {params: {tag: "learning in public"}, props: {posts: allPosts}}  ];}
        const { tag } = Astro.params;const { posts } = Astro.props;---
    
2.  Filter your list of posts, using Astro’s built-in TypeScript support, to only include posts that contain the page’s own tag.
    
    src/pages/tags/\[tag\].astro
    
        ---const { tag } = Astro.params;const { posts } = Astro.props;const filteredPosts = posts.filter((post: any) => post.frontmatter.tags?.includes(tag));---
    
3.  Now you can update your HTML template to show a list of each blog post containing the page’s own tag. Add the following code to `[tag].astro`:
    
    src/pages/tags/\[tag\].astro
    
        <BaseLayout pageTitle={tag}>  <p>Posts tagged with {tag}</p>  <ul>    {filteredPosts.map((post: any) => <li><a href={post.url}>{post.frontmatter.title}</a></li>)}  </ul></BaseLayout>
    
4.  You can even refactor this to use your `<BlogPost />` component instead! (Don’t forget to import this component at the top of `[tag].astro`.)
    
    src/pages/tags/\[tag\].astro
    
        <BaseLayout pageTitle={tag}>  <p>Posts tagged with {tag}</p>  <ul>    {filteredPosts.map((post: any) => <li><a href={post.url}>{post.frontmatter.title}</a></li>)}    {filteredPosts.map((post: any) => <BlogPost url={post.url} title={post.frontmatter.title}/>)}  </ul></BaseLayout>
    
5.  Check your browser preview for your individual tag pages, and you should now see a list of all of your blog posts containing that particular tag.
    

### Analyze the pattern

[Section titled Analyze the pattern](#analyze-the-pattern)

For each of the following, state whether the code is written **inside** the `getStaticPaths()` function, or **outside** of it.

1.  The `import.meta.glob()` call to receive information about all your `.md` files to pass to each page route.
    
    1.  inside `getStaticPaths`
    2.  outside `getStaticPaths`
    
    Submit
    
    class s extends HTMLElement{#s;#i;#r;#e;#t;constructor(){super(),this.#s=this.dataset.correctLabel,this.#i=this.dataset.incorrectLabel,this.#r=Math.random().toString(),this.#e=this.querySelector(".submit"),this.#t=this.querySelector(".answer"),this.querySelectorAll(".opt-list > li").forEach(t=>this.#l(t))}#l(t){const e=t.querySelector('input\[type="radio"\]');e&&(e.removeAttribute("disabled"),e.setAttribute("name",this.#r),e.addEventListener("change",()=>{this.#n(),this.#c()}),e.checked&&this.#c())}#n(){this.#t.innerText="",this.#t.classList.remove("wrong","correct"),this.#t.classList.add("sr-only")}#o(t){const e=this.querySelector("input:checked ~ template");e?this.#t.replaceChildren(e.content.cloneNode(!0)):this.#t.innerText=t?this.#s:this.#i,this.#t.classList.remove("sr-only","wrong","correct"),this.#t.classList.add(t?"correct":"wrong")}#c(){this.#e.removeAttribute("disabled"),this.#e.classList.remove("sr-only"),this.#e.onclick=()=>this.#h()}#a(){this.#e.setAttribute("disabled",""),this.#e.classList.add("sr-only"),this.#e.onclick=null}#h(){const t=this.querySelector("input:checked");if(!t)return;this.#a();const e=t.dataset.isCorrect!==void 0&&\["","true"\].includes(t.dataset.isCorrect);this.#o(e)}}customElements.define("multiple-choice",s);
2.  The list of routes to be generated (returned) by `getStaticPaths()`
    
    1.  inside `getStaticPaths`
    2.  outside `getStaticPaths`
    
    Submit
    
3.  The received values of `props` and `params` to be used in the HTML template.
    
    1.  inside `getStaticPaths`
    2.  outside `getStaticPaths`
    
    Submit
    

Takeaway

If you need information to construct the page routes, write it **inside** `getStaticPaths()`.

To receive information in the HTML template of a page route, write it **outside** `getStaticPaths()`.

Advanced JavaScript: Generate pages from existing tags
------------------------------------------------------

[Section titled Advanced JavaScript: Generate pages from existing tags](#advanced-javascript-generate-pages-from-existing-tags)

Your tag pages are now defined statically in `[tag].astro`. If you add a new tag to a blog post, you will also have to revisit this page and update your page routes.

The following example shows how to replace your code on this page with code that will automatically look for, and generate pages for, each tag used on your blog pages.

Note

Even if it looks challenging, you can try following along with the steps to build this function yourself! If you don’t want to walk through the JavaScript required right now, you can skip ahead to the [finished version of the code](#final-code-sample) and use it directly in your project, replacing the existing content.

1.  Check that all your blog posts contain tags
    
    Revisit each of your existing Markdown pages and ensure that every post contains a `tags` array in its frontmatter. Even if you only have one tag, it should still be written as an array, e.g. `tags: ["blogging"]`.
    
2.  Create an array of all your existing tags using Astro’s built-in TypeScript support.
    
    Add the following code to provide you with a list of every tag used in your blog posts.
    
    src/pages/tags/\[tag\].astro
    
        ---import BaseLayout from '../../layouts/BaseLayout.astro';
        export async function getStaticPaths() {  const allPosts = Object.values(import.meta.glob('../posts/*.md', { eager: true }));
          const uniqueTags = [...new Set(allPosts.map((post: any) => post.frontmatter.tags).flat())];}
    
    Tell me what this line of code is doing in more detail!
    
    It’s OK if this isn’t something you would have written yourself yet!
    
    It goes through each Markdown post, one by one, and combines each array of tags into one single larger array. Then, it makes a new `Set` from all the individual tags it found (to ignore repeated values). Finally, it turns that set into an array (with no duplications), that you can use to show a list of tags on your page.
    
    You now have an array `uniqueTags` with element items `"astro"`, `"successes"`, `"community"`, `"blogging"`, `"setbacks"`, `"learning in public"`
    
3.  Replace the `return` value of the `getStaticPaths` function
    
    src/pages/tags/\[tag\].astro
    
        return [  {params: {tag: "astro"}, props: {posts: allPosts}},  {params: {tag: "successes"}, props: {posts: allPosts}},  {params: {tag: "community"}, props: {posts: allPosts}},  {params: {tag: "blogging"}, props: {posts: allPosts}},  {params: {tag: "setbacks"}, props: {posts: allPosts}},  {params: {tag: "learning in public"}, props: {posts: allPosts}}]
        return uniqueTags.map((tag) => {  const filteredPosts = allPosts.filter((post: any) => post.frontmatter.tags.includes(tag));  return {    params: { tag },    props: { posts: filteredPosts },  };});
    
4.  A `getStaticPaths` function should always return a list of objects containing `params` (what to call each page route) and optionally any `props` (data that you want to pass to those pages). Earlier, you defined each tag name that you knew was used in your blog and passed the entire list of posts as props to each page.
    
    Now, you generate this list of objects automatically using your `uniqueTags` array to define each parameter.
    
    And, now the list of all blog posts is filtered **before** it is sent to each page as props. Be sure to remove the previous line of code filtering the posts, and update your HTML template to use `posts` instead of `filteredPosts`.
    
    src/pages/tags/\[tag\].astro
    
        const { tag } = Astro.params;const { posts } = Astro.props;const filteredPosts = posts.filter((post) => post.frontmatter.tags?.includes(tag));---<!-- --><ul>  {filteredPosts.map((post: any) => <BlogPost url={post.url} title={post.frontmatter.title}/>)}  {posts.map((post: any) => <BlogPost url={post.url} title={post.frontmatter.title}/>)}</ul>
    

### Final code sample

[Section titled Final code sample](#final-code-sample)

To check your work, or if you just want complete, correct code to copy into `[tag].astro`, here is what your Astro component should look like:

src/pages/tags/\[tag\].astro

    ---import BaseLayout from '../../layouts/BaseLayout.astro';import BlogPost from '../../components/BlogPost.astro';
    export async function getStaticPaths() {  const allPosts = Object.values(import.meta.glob('../posts/*.md', { eager: true }));
      const uniqueTags = [...new Set(allPosts.map((post: any) => post.frontmatter.tags).flat())];
      return uniqueTags.map((tag) => {    const filteredPosts = allPosts.filter((post: any) => post.frontmatter.tags.includes(tag));    return {      params: { tag },      props: { posts: filteredPosts },    };  });}
    const { tag } = Astro.params;const { posts } = Astro.props;---<BaseLayout pageTitle={tag}>  <p>Posts tagged with {tag}</p>  <ul>    {posts.map((post: any) => <BlogPost url={post.url} title={post.frontmatter.title}/>)}  </ul></BaseLayout>

Now, you should be able to visit any of your tag pages in your browser preview.

Navigate to `http://localhost:4321/tags/community` and you should see a list of only your blog posts with the tag `community`. Similarly `http://localhost:4321/tags/learning%20in%20public` should display a list of the blog posts tagged `learning in public`.

In the next section, you will create navigation links to these pages.

### Test your knowledge

[Section titled Test your knowledge](#test-your-knowledge)

Choose the term that matches the description.

1.  A function that returns an array of page routes.
    
    1.  params
    2.  dynamic routing
    3.  `getStaticPaths()`
    4.  props
    
    Submit
    
2.  The process of creating multiple page routes from one file in Astro.
    
    1.  params
    2.  dynamic routing
    3.  `getStaticPaths()`
    4.  props
    
    Submit
    
3.  A value that defines the name of a page route generated dynamically.
    
    1.  params
    2.  dynamic routing
    3.  `getStaticPaths()`
    4.  props
    
    Submit
    

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can generate pages dynamically.
*    I can pass `props` to each page route.

### Resources

[Section titled Resources](#resources)

*   [Dynamic Page Routing in Astro](/en/guides/routing/#dynamic-routes)
    
*   [`getStaticPaths()` API documentation](/en/reference/routing-reference/#getstaticpaths)
    

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/5-astro-api/2.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Create a blog post archive](/en/tutorial/5-astro-api/1/) [Next  
Build a tag index page](/en/tutorial/5-astro-api/3/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/tutorial/5-astro-api/3
Build a tag index page
======================

Now that you have individual pages for every tag, it’s time to make links to them.

Get ready to…

*   Add a new page using the `/pages/folder/index.astro` routing pattern
*   Display a list of all your unique tags, linking to each tag page
*   Update your site with navigation links to this new Tags page

Use the `/pages/folder/index.astro` routing pattern
---------------------------------------------------

[Section titled Use the /pages/folder/index.astro routing pattern](#use-the-pagesfolderindexastro-routing-pattern)

To add a Tag Index page to your website, you could create a new file at `src/pages/tags.astro`.

But, since you already have the directory `/tags/`, you can take advantage of another routing pattern in Astro, and keep all your files related to tags together.

Try it yourself - Make a Tag Index page
---------------------------------------

[Section titled Try it yourself - Make a Tag Index page](#try-it-yourself---make-a-tag-index-page)

1.  Create a new file `index.astro` in the directory `src/pages/tags/`.
    
2.  Navigate to `http://localhost:4321/tags` and verify that your site now contains a page at this URL. It will be empty, but it will exist.
    
3.  Create a minimal page at `src/pages/tags/index.astro` that uses your layout. You have done this before!
    
    Expand to see the steps
    
    1.  Create a new page component in `src/pages/tags/`.
        
        Show the filename
        
            index.astro
        
    2.  Import and use your `<BaseLayout>`.
        
        Show the code
        
        src/pages/tags/index.astro
        
            ---import BaseLayout from '../../layouts/BaseLayout.astro';---<BaseLayout></BaseLayout>
        
    3.  Define a page title, and pass it to your layout as a component attribute.
        
        Show the code
        
        src/pages/tags/index.astro
        
            ---import BaseLayout from '../../layouts/BaseLayout.astro';const pageTitle = "Tag Index";---<BaseLayout pageTitle={pageTitle}></BaseLayout>
        
    
4.  Check your browser preview again and you should have a formatted page, ready to add content to!
    

Create an array of tags
-----------------------

[Section titled Create an array of tags](#create-an-array-of-tags)

You have previously displayed items in a list from an array using `map()`. What would it look like to define an array of all your tags, then display them in a list on this page?

See the code

src/pages/tags/index.astro

    ---import BaseLayout from '../../layouts/BaseLayout.astro';const tags = ['astro', 'blogging', 'learning in public', 'successes', 'setbacks', 'community']const pageTitle = "Tag Index";---<BaseLayout pageTitle={pageTitle}>  <ul>    {tags.map((tag) => <li>{tag}</li>)}  </ul></BaseLayout>

You could do this, but then you would need to come back to this file and update your array every time you use a new tag in a future blog post.

Fortunately, you already know a way to grab the data from all your Markdown files in one line of code, then return a list of all your tags.

1.  In `src/pages/tags/index.astro`, add the line of code to the frontmatter script that will give your page access to the data from every `.md` blog post file.
    
    See the code
    
    src/pages/tags/index.astro
    
        ---import BaseLayout from '../../layouts/BaseLayout.astro';const allPosts = Object.values(import.meta.glob('../posts/*.md', { eager: true }));const pageTitle = "Tag Index";---
    
2.  Next, add the following line of JavaScript to your page component. This is the same code relying on Astro’s built-in TypeScript support you used in `src/pages/tags/[tag].astro` to return a list of unique tags.
    
    src/pages/tags/index.astro
    
        ---import BaseLayout from '../../layouts/BaseLayout.astro';const allPosts = Object.values(import.meta.glob('../posts/*.md', { eager: true }));const tags = [...new Set(allPosts.map((post: any) => post.frontmatter.tags).flat())];const pageTitle = "Tag Index";---
    

Create your list of tags
------------------------

[Section titled Create your list of tags](#create-your-list-of-tags)

Instead of creating items in an unordered list this time, create one `<p>` for each item, inside a `<div>`. The pattern should look familiar!

1.  Add the following code to your component template:
    
    src/pages/tags/index.astro
    
        <BaseLayout pageTitle={pageTitle}>  <div>{tags.map((tag) => <p>{tag}</p>)}</div></BaseLayout>
    
    In your browser preview, verify that you can see your tags listed. If any blog posts are missing tags, or they are improperly formatted, Astro’s built-in TypeScript support will show you errors so you can check and correct your code.
    
2.  To make each tag link to its own page, add the following `<a>` link to each tag name:
    
    src/pages/tags/index.astro
    
        <BaseLayout pageTitle={pageTitle}>  <div>    {tags.map((tag) => (      <p><a href={`/tags/${tag}`}>{tag}</a></p>    ))}  </div></BaseLayout>
    

Add styles to your tag list
---------------------------

[Section titled Add styles to your tag list](#add-styles-to-your-tag-list)

1.  Add the following CSS classes to style both your `<div>` and each `<p>` that will be generated. Note: Astro uses HTML syntax for adding class names!
    
    src/pages/tags/index.astro
    
        <BaseLayout pageTitle={pageTitle}>  <div class="tags">    {tags.map((tag) => (      <p class="tag"><a href={`/tags/${tag}`}>{tag}</a></p>    ))}  </div></BaseLayout>
    
2.  Define these new CSS classes by adding the following `<style>` tag to this page:
    
    src/pages/tags/index.astro
    
        <style>  a {    color: #00539F;  }
          .tags {    display: flex;    flex-wrap: wrap;  }
          .tag {    margin: 0.25em;    border: dotted 1px #a1a1a1;    border-radius: .5em;    padding: .5em 1em;    font-size: 1.15em;    background-color: #F8FCFD;  }</style>
    
3.  Check your browser preview at `http://localhost:4321/tags` to verify that you have some new styles and that each of the tags on the page has a working link to its own individual tag page.
    

### Code Check-In

[Section titled Code Check-In](#code-check-in)

Here is what your new page should look like:

src/pages/tags/index.astro

    ---import BaseLayout from '../../layouts/BaseLayout.astro';const allPosts = Object.values(import.meta.glob('../posts/*.md', { eager: true }));const tags = [...new Set(allPosts.map((post: any) => post.frontmatter.tags).flat())];const pageTitle = "Tag Index";---<BaseLayout pageTitle={pageTitle}>  <div class="tags">    {tags.map((tag) => (      <p class="tag"><a href={`/tags/${tag}`}>{tag}</a></p>    ))}  </div></BaseLayout><style>  a {    color: #00539F;  }
      .tags {    display: flex;    flex-wrap: wrap;  }
      .tag {    margin: 0.25em;    border: dotted 1px #a1a1a1;    border-radius: .5em;    padding: .5em 1em;    font-size: 1.15em;    background-color: #F8FCFD;  }</style>

Add this page to your navigation
--------------------------------

[Section titled Add this page to your navigation](#add-this-page-to-your-navigation)

Right now, you can navigate to `http://localhost:4321/tags` and see this page. From this page, you can click on links to your individual tag pages.

But, you still need to make these pages discoverable from other pages on your website.

1.  In your `Navigation.astro` component, include a link to this new tag index page.
    
    Show me the code
    
    src/components/Navigation.astro
    
        <a href="/">Home</a><a href="/about/">About</a><a href="/blog/">Blog</a><a href="/tags/">Tags</a>
    

Challenge: Include tags in your blog post layout
------------------------------------------------

[Section titled Challenge: Include tags in your blog post layout](#challenge-include-tags-in-your-blog-post-layout)

You have now written all the code you need to also display a list of tags on each blog post, and link them to their tag pages. You have existing work that you can reuse!

Follow the steps below, then check your work by comparing it to the [final code sample](#code-check-in-markdownpostlayout).

1.  Copy the `<div class="tags">...</div>` and `<style>...</style>` from `src/pages/tags/index.astro` and reuse it inside `MarkdownPostLayout.astro`:
    
    src/layouts/MarkdownPostLayout.astro
    
        ---import BaseLayout from './BaseLayout.astro';const { frontmatter } = Astro.props;---<BaseLayout pageTitle={frontmatter.title}>  <p><em>{frontmatter.description}</em></p>  <p>{frontmatter.pubDate.toString().slice(0,10)}</p>
          <p>Written by: {frontmatter.author}</p>
          <img src={frontmatter.image.url} width="300" alt={frontmatter.image.alt} />
          <div class="tags">    {tags.map((tag: string) => (      <p class="tag"><a href={`/tags/${tag}`}>{tag}</a></p>    ))}  </div>
          <slot /></BaseLayout><style>  a {    color: #00539F;  }
          .tags {    display: flex;    flex-wrap: wrap;  }
          .tag {    margin: 0.25em;    border: dotted 1px #a1a1a1;    border-radius: .5em;    padding: .5em 1em;    font-size: 1.15em;    background-color: #F8FCFD;  }</style>
    

Before this code will work, you need to make **one small edit** to the code you pasted into `MarkdownPostLayout.astro`. Can you figure out what it is?

Give me a hint

How are the other props (e.g. title, author, etc.) written in your layout template? How does your layout receive props from an individual blog post?

Give me another hint!

In order to use props (values passed) from a `.md` blog post in your layout, like tags, you need to prefix the value with a certain word.

Show me the code!

src/layouts/MarkdownPostLayout.astro

        <div class="tags">      {frontmatter.tags.map((tag: string) => (        <p class="tag"><a href={`/tags/${tag}`}>{tag}</a></p>      ))}    </div>

### Code Check-in: MarkdownPostLayout

[Section titled Code Check-in: MarkdownPostLayout](#code-check-in-markdownpostlayout)

To check your work, or if you just want complete, correct code to copy into `MarkdownPostLayout.astro`, here is what your Astro component should look like:

src/layouts/MarkdownPostLayout.astro

    ---import BaseLayout from './BaseLayout.astro';const { frontmatter } = Astro.props;---<BaseLayout pageTitle={frontmatter.title}>  <p><em>{frontmatter.description}</em></p>  <p>{frontmatter.pubDate.toString().slice(0,10)}</p>
      <p>Written by: {frontmatter.author}</p>
      <img src={frontmatter.image.url} width="300" alt={frontmatter.image.alt} />
      <div class="tags">    {frontmatter.tags.map((tag: string) => (      <p class="tag"><a href={`/tags/${tag}`}>{tag}</a></p>    ))}  </div>
      <slot /></BaseLayout><style>  a {    color: #00539F;  }
      .tags {    display: flex;    flex-wrap: wrap;  }
      .tag {    margin: 0.25em;    border: dotted 1px #a1a1a1;    border-radius: .5em;    padding: .5em 1em;    font-size: 1.15em;    background-color: #F8FCFD;  }</style>

### Test your knowledge

[Section titled Test your knowledge](#test-your-knowledge)

Match each file path with a second file path that will create a page at the same route.

1.  `src/pages/categories.astro`
    
    1.  `src/pages/posts/post.astro`
    2.  `src/pages/posts/index.astro`
    3.  `src/components/shoes/Shoe.astro`
    4.  `src/pages/categories/index.astro`
    
    Submit
    
    class s extends HTMLElement{#s;#i;#r;#e;#t;constructor(){super(),this.#s=this.dataset.correctLabel,this.#i=this.dataset.incorrectLabel,this.#r=Math.random().toString(),this.#e=this.querySelector(".submit"),this.#t=this.querySelector(".answer"),this.querySelectorAll(".opt-list > li").forEach(t=>this.#l(t))}#l(t){const e=t.querySelector('input\[type="radio"\]');e&&(e.removeAttribute("disabled"),e.setAttribute("name",this.#r),e.addEventListener("change",()=>{this.#n(),this.#c()}),e.checked&&this.#c())}#n(){this.#t.innerText="",this.#t.classList.remove("wrong","correct"),this.#t.classList.add("sr-only")}#o(t){const e=this.querySelector("input:checked ~ template");e?this.#t.replaceChildren(e.content.cloneNode(!0)):this.#t.innerText=t?this.#s:this.#i,this.#t.classList.remove("sr-only","wrong","correct"),this.#t.classList.add(t?"correct":"wrong")}#c(){this.#e.removeAttribute("disabled"),this.#e.classList.remove("sr-only"),this.#e.onclick=()=>this.#h()}#a(){this.#e.setAttribute("disabled",""),this.#e.classList.add("sr-only"),this.#e.onclick=null}#h(){const t=this.querySelector("input:checked");if(!t)return;this.#a();const e=t.dataset.isCorrect!==void 0&&\["","true"\].includes(t.dataset.isCorrect);this.#o(e)}}customElements.define("multiple-choice",s);
2.  `src/pages/posts.astro`
    
    1.  `src/pages/products/shoes.astro`
    2.  `src/pages/posts/post.astro`
    3.  `src/pages/posts/index.astro`
    4.  `src/pages/categories/index.astro`
    
    Submit
    
3.  `src/pages/products/shoes/index.astro`
    
    1.  `src/pages/products/shoes.astro`
    2.  `src/pages/posts/post.astro`
    3.  `src/pages/posts/index.astro`
    4.  `src/components/shoes/Shoe.astro`
    
    Submit
    

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can use Astro’s `/pages/folder/index.astro` routing feature.

### Resources

[Section titled Resources](#resources)

*   [Static Routing in Astro](/en/guides/routing/#static-routes)

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/5-astro-api/3.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Generate tag pages](/en/tutorial/5-astro-api/2/) [Next  
Add an RSS feed](/en/tutorial/5-astro-api/4/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/tutorial/5-astro-api/4
Add an RSS feed
===============

Get ready to…

*   Install an Astro package for creating an RSS feed for your website
*   Create a feed that can be subscribed to and read by RSS feed readers

Install Astro’s RSS package
---------------------------

[Section titled Install Astro’s RSS package](#install-astros-rss-package)

Astro provides a custom package to quickly add an RSS feed to your website.

This official package generates a non-HTML document with information about all of your blog posts that can be read by **feed readers** like Feedly, The Old Reader, and more. This document is updated every time your site is rebuilt.

Individuals can subscribe to your feed in a feed reader, and receive a notification when you publish a new blog post on your site, making it a popular blog feature.

1.  Quit the Astro development server and run the following command in the terminal to install Astro’s RSS package.
    
    (() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()
    
    *   [npm](#tab-panel-3399)
    *   [pnpm](#tab-panel-3400)
    *   [Yarn](#tab-panel-3401)
    
    Terminal window
    
        npm install @astrojs/rss
    
    Terminal window
    
        pnpm add @astrojs/rss
    
    Terminal window
    
        yarn add @astrojs/rss
    
    class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);
2.  Restart the dev server to begin working on your Astro project again.
    
    *   [npm](#tab-panel-3402)
    *   [pnpm](#tab-panel-3403)
    *   [Yarn](#tab-panel-3404)
    
    Terminal window
    
        npm run dev
    
    Terminal window
    
        pnpm run dev
    
    Terminal window
    
        yarn run dev
    

Create an `.xml` feed document
------------------------------

[Section titled Create an .xml feed document](#create-an-xml-feed-document)

1.  Create a new file in `src/pages/` called `rss.xml.js`
    
2.  Copy the following code into this new document. Customize the `title` and `description` properties, and if necessary, specify a different language in `customData`:
    
    src/pages/rss.xml.js
    
        import rss, { pagesGlobToRssItems } from '@astrojs/rss';
        export async function GET(context) {  return rss({    title: 'Astro Learner | Blog',    description: 'My journey learning Astro',    site: context.site,    items: await pagesGlobToRssItems(import.meta.glob('./**/*.md')),    customData: `<language>en-us</language>`,  });}
    
3.  Add the `site` property to the Astro config with your site’s own unique Netlify URL.
    
    astro.config.mjs
    
        import { defineConfig } from "astro/config";
        export default defineConfig({  site: "https://example.com"});
    
4.  Visit `http://localhost:4321/rss.xml` and verify that you can see (unformatted) text on the page with an `item` for each of your `.md` files. Each item should contain blog post information such as `title`, `url`, and `description`.
    
    View your RSS feed in a reader
    
    Download a feed reader, or sign up for an online feed reader service and subscribe to your site by adding your own Netlify URL. You can also share this link with others so they can subscribe to your posts, and be notified when a new one is published.
    

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can install an Astro package using the command line.
*    I can create an RSS feed for my website.

### Resources

[Section titled Resources](#resources)

*   [RSS item generation in Astro](/en/recipes/rss/#using-glob-imports)

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/5-astro-api/4.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Build a tag index page](/en/tutorial/5-astro-api/3/) [Next  
Check in: Unit 6 - Astro Islands](/en/tutorial/6-islands/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)





# Aggregated from ./pages/tutorial/6-islands
Check in: Unit 6 - Astro Islands
================================

Now that you have a fully functioning blog, it’s time to add some interactive islands to your site!

Looking ahead
-------------

[Section titled Looking ahead](#looking-ahead)

In this unit, you’ll use **Astro islands** to bring frontend framework components into your Astro site.

You will:

*   Add a UI framework, Preact, to your Astro project
*   Use Preact to create an interactive greeting component
*   Learn when you might _not_ choose islands for interactivity

Checklist
---------

[Section titled Checklist](#checklist)

 *    I am ready to add some interactivity to my site, and start living that island life!

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/6-islands/index.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Add an RSS feed](/en/tutorial/5-astro-api/4/) [Next  
Build your first Astro island](/en/tutorial/6-islands/1/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/tutorial/6-islands/1
Build your first Astro island
=============================

Use a Preact component to greet your visitors with a randomly-selected welcome message!

Get ready to…

*   Add Preact to your Astro project
*   Include Astro islands (Preact `.jsx` components) on your home page
*   Use `client:` directives to make islands interactive

Add Preact to your Astro project
--------------------------------

[Section titled Add Preact to your Astro project](#add-preact-to-your-astro-project)

1.  If it’s running, quit the dev server to have access to the terminal (keyboard shortcut: Ctrl + C).
    
2.  Add the ability to use Preact components in your Astro project with a single command:
    
    (() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()
    
    *   [npm](#tab-panel-3405)
    *   [pnpm](#tab-panel-3406)
    *   [Yarn](#tab-panel-3407)
    
    Terminal window
    
        npx astro add preact
    
    Terminal window
    
        pnpm astro add preact
    
    Terminal window
    
        yarn astro add preact
    
    class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);
3.  Follow the command line instructions to confirm adding Preact to your project.
    

Include a Preact greeting banner
--------------------------------

[Section titled Include a Preact greeting banner](#include-a-preact-greeting-banner)

This component will take an array of greeting messages as a prop and randomly select one of them to show as a welcome message. The user can click a button to get a new random message.

1.  Create a new file in `src/components/` named `Greeting.jsx`
    
    Note the `.jsx` file extension. This file will be written in Preact, not Astro.
    
2.  Add the following code to `Greeting.jsx`:
    
    src/components/Greeting.jsx
    
        import { useState } from 'preact/hooks';
        export default function Greeting({messages}) {
          const randomMessage = () => messages[(Math.floor(Math.random() * messages.length))];
          const [greeting, setGreeting] = useState(messages[0]);
          return (    <div>      <h3>{greeting}! Thank you for visiting!</h3>      <button onClick={() => setGreeting(randomMessage())}>        New Greeting      </button>    </div>  );}
    
3.  Import and use this component on your Home page `index.astro`.
    
    src/pages/index.astro
    
        ---import BaseLayout from '../layouts/BaseLayout.astro';import Greeting from '../components/Greeting';const pageTitle = "Home Page";---<BaseLayout pageTitle={pageTitle}>  <h2>My awesome blog subtitle</h2>  <Greeting messages={["Hi", "Hello", "Howdy", "Hey there"]} /></BaseLayout>
    
    Check the preview in your browser: you should see a random greeting, but the button won’t work!
    
4.  Add a second `<Greeting />` component with the `client:load` directive.
    
    src/pages/index.astro
    
        ---import BaseLayout from '../layouts/BaseLayout.astro';import Greeting from '../components/Greeting';const pageTitle = "Home Page";---<BaseLayout pageTitle={pageTitle}>  <h2>My awesome blog subtitle</h2>  <Greeting messages={["Hi", "Hello", "Howdy", "Hey there"]} />  <Greeting client:load messages={["Hej", "Hallo", "Hola", "Habari"]} /></BaseLayout>
    
5.  Revisit your page and compare the two components. The second button works because the `client:load` directive tells Astro to send and rerun its JavaScript on the _client_ when the page _loads_, making the component interactive. This is called a **hydrated** component.
    
6.  Once the difference is clear, remove the non-hydrated Greeting component.
    
    src/pages/index.astro
    
        ---import BaseLayout from '../layouts/BaseLayout.astro';import Greeting from '../components/Greeting';const pageTitle = "Home Page";---<BaseLayout pageTitle={pageTitle}>  <h2>My awesome blog subtitle</h2>  <Greeting messages={["Hi", "Hello", "Howdy", "Hey there"]} />  <Greeting client:load messages={["Hej", "Hallo", "Hola", "Habari"]} /></BaseLayout>
    

### Analyze the Pattern

[Section titled Analyze the Pattern](#analyze-the-pattern)

There are other `client:` directives to explore. Each sends the JavaScript to the client at a different time. `client:visible`, for example, will only send the component’s JavaScript when it is visible on the page.

Consider an Astro component with the following code:

    ---import BaseLayout from '../layouts/BaseLayout.astro';import AstroBanner from '../components/AstroBanner.astro';import PreactBanner from '../components/PreactBanner';import SvelteCounter from '../components/SvelteCounter.svelte';---<BaseLayout>  <AstroBanner />  <PreactBanner />  <PreactBanner client:load />  <SvelteCounter />  <SvelteCounter client:visible /></BaseLayout>

1.  Which of the five components will be **hydrated** islands, sending JavaScript to the client?
    
     `<PreactBanner client:load />` and `<SvelteCounter client:visible />` will be hydrated islands. class t extends HTMLElement{constructor(){super(),this.querySelector("input")?.addEventListener("click",e=>{e.target instanceof HTMLInputElement&&(e.target.checked=e.target.disabled=!0)},{once:!0})}}customElements.define("ad-spoiler",t);
    
2.  In what way(s) will the two `<PreactBanner />` components be the same? In what way(s) will they be different?
    
     **Same**: They both show the same HTML elements and look the same initially. **Different**: The component with the `client:load` directive will rerender after the page is loaded, and any interactive elements that it has will work.
    
3.  Assume the `SvelteCounter` component shows a number and has a button to increase it. If you couldn’t see your website’s code, only the live published page, how would you tell which of the two `<SvelteCounter />` components used `client:visible`?
    
     Try clicking the button, and see which one is interactive. If it responds to your input, it must have had a `client:` directive.
    

### Test your knowledge

[Section titled Test your knowledge](#test-your-knowledge)

For each of the following components, identify what will be sent to the browser:

1.  `<ReactCounter client:load />`
    
    1.  HTML and CSS only
        
    2.  HTML, CSS, and JavaScript
        
    
    Submit
    
    class s extends HTMLElement{#s;#i;#r;#e;#t;constructor(){super(),this.#s=this.dataset.correctLabel,this.#i=this.dataset.incorrectLabel,this.#r=Math.random().toString(),this.#e=this.querySelector(".submit"),this.#t=this.querySelector(".answer"),this.querySelectorAll(".opt-list > li").forEach(t=>this.#l(t))}#l(t){const e=t.querySelector('input\[type="radio"\]');e&&(e.removeAttribute("disabled"),e.setAttribute("name",this.#r),e.addEventListener("change",()=>{this.#n(),this.#c()}),e.checked&&this.#c())}#n(){this.#t.innerText="",this.#t.classList.remove("wrong","correct"),this.#t.classList.add("sr-only")}#o(t){const e=this.querySelector("input:checked ~ template");e?this.#t.replaceChildren(e.content.cloneNode(!0)):this.#t.innerText=t?this.#s:this.#i,this.#t.classList.remove("sr-only","wrong","correct"),this.#t.classList.add(t?"correct":"wrong")}#c(){this.#e.removeAttribute("disabled"),this.#e.classList.remove("sr-only"),this.#e.onclick=()=>this.#h()}#a(){this.#e.setAttribute("disabled",""),this.#e.classList.add("sr-only"),this.#e.onclick=null}#h(){const t=this.querySelector("input:checked");if(!t)return;this.#a();const e=t.dataset.isCorrect!==void 0&&\["","true"\].includes(t.dataset.isCorrect);this.#o(e)}}customElements.define("multiple-choice",s);
2.  `<SvelteCard />`
    
    1.  HTML and CSS only
        
    2.  HTML, CSS, and JavaScript
        
    
    Submit
    

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can install an Astro integration.
*    I can write UI framework components in their own language.
*    I can use a `client:` directive for hydration on my UI framework component.

### Resources

[Section titled Resources](#resources)

*   [Astro Integrations Guide](/en/guides/integrations-guide/)
    
*   [Using UI Framework Components in Astro](/en/guides/framework-components/#using-framework-components)
    
*   [Astro client directives reference](/en/reference/directives-reference/#client-directives)
    

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/6-islands/1.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Check in: Unit 6 - Astro Islands](/en/tutorial/6-islands/) [Next  
Back on dry land. Take your blog from day to night, no island required!](/en/tutorial/6-islands/2/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/tutorial/6-islands/2
Back on dry land. Take your blog from day to night, no island required!
=======================================================================

Now that you can build Astro islands for interactive elements, don’t forget that you can go pretty far with just vanilla JavaScript and CSS!

Let’s build a clickable icon to let your users toggle between light or dark mode using another `<script>` tag for interactivity… with no framework JavaScript sent to the browser.

Get ready to…

*   Build an interactive theme toggle with only JavaScript and CSS
*   Send as little JavaScript to the browser as possible!

Add and style a theme toggle icon
---------------------------------

[Section titled Add and style a theme toggle icon](#add-and-style-a-theme-toggle-icon)

1.  Create a new file at `src/components/ThemeIcon.astro` and paste the following code into it:
    
    src/components/ThemeIcon.astro
    
        ------<button id="themeToggle">  <svg width="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">    <path class="sun" fill-rule="evenodd" d="M12 17.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zm0 1.5a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm12-7a.8.8 0 0 1-.8.8h-2.4a.8.8 0 0 1 0-1.6h2.4a.8.8 0 0 1 .8.8zM4 12a.8.8 0 0 1-.8.8H.8a.8.8 0 0 1 0-1.6h2.5a.8.8 0 0 1 .8.8zm16.5-8.5a.8.8 0 0 1 0 1l-1.8 1.8a.8.8 0 0 1-1-1l1.7-1.8a.8.8 0 0 1 1 0zM6.3 17.7a.8.8 0 0 1 0 1l-1.7 1.8a.8.8 0 1 1-1-1l1.7-1.8a.8.8 0 0 1 1 0zM12 0a.8.8 0 0 1 .8.8v2.5a.8.8 0 0 1-1.6 0V.8A.8.8 0 0 1 12 0zm0 20a.8.8 0 0 1 .8.8v2.4a.8.8 0 0 1-1.6 0v-2.4a.8.8 0 0 1 .8-.8zM3.5 3.5a.8.8 0 0 1 1 0l1.8 1.8a.8.8 0 1 1-1 1L3.5 4.6a.8.8 0 0 1 0-1zm14.2 14.2a.8.8 0 0 1 1 0l1.8 1.7a.8.8 0 0 1-1 1l-1.8-1.7a.8.8 0 0 1 0-1z"/>    <path class="moon" fill-rule="evenodd" d="M16.5 6A10.5 10.5 0 0 1 4.7 16.4 8.5 8.5 0 1 0 16.4 4.7l.1 1.3zm-1.7-2a9 9 0 0 1 .2 2 9 9 0 0 1-11 8.8 9.4 9.4 0 0 1-.8-.3c-.4 0-.8.3-.7.7a10 10 0 0 0 .3.8 10 10 0 0 0 9.2 6 10 10 0 0 0 4-19.2 9.7 9.7 0 0 0-.9-.3c-.3-.1-.7.3-.6.7a9 9 0 0 1 .3.8z"/>  </svg></button>
        <style>  #themeToggle {    border: 0;    background: none;  }  .sun { fill: black; }  .moon { fill: transparent; }
          :global(.dark) .sun { fill: transparent; }  :global(.dark) .moon { fill: white; }</style>
    
2.  Add the icon to `Header.astro` so that it will be displayed on all pages. Don’t forget to import the component.
    
    src/components/Header.astro
    
        ---import Hamburger from './Hamburger.astro';import Navigation from './Navigation.astro';import ThemeIcon from './ThemeIcon.astro';---<header>  <nav>    <Hamburger />    <ThemeIcon />    <Navigation />  </nav></header>
    
3.  Visit your browser preview at `http://localhost:4321` to see the icon now on all your pages. You can try clicking it, but you have not written a script to make it interactive yet.
    

Add CSS styling for a dark theme
--------------------------------

[Section titled Add CSS styling for a dark theme](#add-css-styling-for-a-dark-theme)

Choose some alternate colors to use in dark mode.

1.  In `global.css`, define some dark styles. You can choose your own, or copy and paste:
    
    src/styles/global.css
    
        html.dark {  background-color: #0d0950;  color: #fff;}
        .dark .nav-links a {  color: #fff;}
    

Add client-side interactivity
-----------------------------

[Section titled Add client-side interactivity](#add-client-side-interactivity)

To add interactivity to an Astro component, you can use a `<script>` tag. This script can check and set the current theme from `localStorage` and toggle the theme when the icon is clicked.

1.  Add the following `<script>` tag in `src/components/ThemeIcon.astro` after your `<style>` tag:
    
    src/components/ThemeIcon.astro
    
        <style>  .sun { fill: black; }  .moon { fill: transparent; }
          :global(.dark) .sun { fill: transparent; }  :global(.dark) .moon { fill: white; }</style>
        <script is:inline>  const theme = (() => {    const localStorageTheme = localStorage?.getItem("theme") ?? '';    if (['dark', 'light'].includes(localStorageTheme)) {      return localStorageTheme;    }    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {      return 'dark';    }      return 'light';  })();
          if (theme === 'light') {    document.documentElement.classList.remove('dark');  } else {    document.documentElement.classList.add('dark');  }
          window.localStorage.setItem('theme', theme);
          const handleToggleClick = () => {    const element = document.documentElement;    element.classList.toggle("dark");
            const isDark = element.classList.contains("dark");    localStorage.setItem("theme", isDark ? "dark" : "light");  }
          document.getElementById("themeToggle")?.addEventListener("click", handleToggleClick);</script>
    
2.  Check your browser preview at `http://localhost:4321` and click the theme icon. Verify that you can change between light and dark modes.
    

### Test your knowledge

[Section titled Test your knowledge](#test-your-knowledge)

Choose whether each of the following statements describes Astro `<script>` tags, UI framework components, or both.

1.  They allow you to include interactive UI elements on your website.
    
    1.  Astro `<script>` tags
        
    2.  UI framework components
        
    3.  both
        
    
    Submit
    
    class s extends HTMLElement{#s;#i;#r;#e;#t;constructor(){super(),this.#s=this.dataset.correctLabel,this.#i=this.dataset.incorrectLabel,this.#r=Math.random().toString(),this.#e=this.querySelector(".submit"),this.#t=this.querySelector(".answer"),this.querySelectorAll(".opt-list > li").forEach(t=>this.#l(t))}#l(t){const e=t.querySelector('input\[type="radio"\]');e&&(e.removeAttribute("disabled"),e.setAttribute("name",this.#r),e.addEventListener("change",()=>{this.#n(),this.#c()}),e.checked&&this.#c())}#n(){this.#t.innerText="",this.#t.classList.remove("wrong","correct"),this.#t.classList.add("sr-only")}#o(t){const e=this.querySelector("input:checked ~ template");e?this.#t.replaceChildren(e.content.cloneNode(!0)):this.#t.innerText=t?this.#s:this.#i,this.#t.classList.remove("sr-only","wrong","correct"),this.#t.classList.add(t?"correct":"wrong")}#c(){this.#e.removeAttribute("disabled"),this.#e.classList.remove("sr-only"),this.#e.onclick=()=>this.#h()}#a(){this.#e.setAttribute("disabled",""),this.#e.classList.add("sr-only"),this.#e.onclick=null}#h(){const t=this.querySelector("input:checked");if(!t)return;this.#a();const e=t.dataset.isCorrect!==void 0&&\["","true"\].includes(t.dataset.isCorrect);this.#o(e)}}customElements.define("multiple-choice",s);
2.  They will create static elements on your site unless you include a `client:` to send their JavaScript to the client and run in the browser.
    
    1.  Astro `<script>` tags
        
    2.  UI framework components
        
    3.  both
        
    
    Submit
    
3.  They allow you to “try out” a new framework without requiring you to start an entirely new project using that tech stack.
    
    1.  Astro `<script>` tags
        
    2.  UI framework components
        
    3.  both
        
    
    Submit
    
4.  They allow you to reuse code you have written in other frameworks and you can often just drop them right into your site.
    
    1.  Astro `<script>` tags
        
    2.  UI framework components
        
    3.  both
        
    
    Submit
    
5.  They allow you to add interactivity without needing to know or learn any other JavaScript frameworks.
    
    1.  Astro `<script>` tags
        
    2.  UI framework components
        
    3.  both
        
    
    Submit
    

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can use JavaScript for interactivity when I don’t want to add a framework.

### Resources

[Section titled Resources](#resources)

*   [Client-side `<script>` in Astro](/en/guides/client-side-scripts/)

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/6-islands/2.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Build your first Astro island](/en/tutorial/6-islands/1/) [Next  
Congratulations!](/en/tutorial/6-islands/3/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/tutorial/6-islands/3
Congratulations!
================

There’s one more edit to make…

src/pages/about.astro

    ---import BaseLayout from "../layouts/BaseLayout.astro";const pageTitle = "About Me";const happy = true;const finished = false;const finished = true;const goal = 3;const identity = {  firstName: "Sarah",  country: "Canada",  occupation: "Technical Writer",  hobbies: ["photography", "birdwatching", "baseball"],};const skills = ["HTML", "CSS", "JavaScript", "React", "Astro", "Writing Docs"];const skillColor = "navy";const fontWeight = "bold";const textCase = "uppercase";---

We hope you learned a little about the basics of Astro, and had fun along the way!

You can find the code for the project in this tutorial on [GitHub](https://github.com/withastro/blog-tutorial-demo/tree/complete) or open a working version in an online code environment like [IDX](https://idx.google.com/import?url=https:%2F%2Fgithub.com%2Fwithastro%2Fblog-tutorial-demo%2F) or [StackBlitz](https://stackblitz.com/github/withastro/blog-tutorial-demo/tree/complete?file=src/pages/index.astro).

Check out our docs for guides and reference material, and visit our Discord to ask questions, get help or just hang out!

Welcome to the universe, astronaut. 👩🏼‍🚀👨🏿‍🚀🧑‍🚀👩🏾‍🚀

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can’t wait to start my next Astro project! 🚀

Share your achievement!
-----------------------

[Section titled Share your achievement!](#share-your-achievement)

Congratulations on completing the Astro blog tutorial! Share your achievement with the world and let everyone know you’re an Astronaut now!

[Share on Twitter](https://twitter.com/intent/tweet?text=Just%20finished%20learning%20how%20to%20build%20my%20first%20Astro%20blog!%20Check%20it%20out%20at%20https://docs.astro.build/%0Avia%20%40astrodotbuild) [Share on Reddit](https://www.reddit.com/submit?url=https://docs.astro.build/&title=Just%20finished%20learning%20how%20to%20build%20my%20first%20Astro%20blog!) [Share on Bluesky](https://bsky.app/intent/compose?text=Just%20finished%20learning%20how%20to%20build%20my%20first%20Astro%20blog!%20Check%20it%20out%20at%20https://docs.astro.build/%0Avia%20%40astro.build)

Next Steps
----------

[Section titled Next Steps](#next-steps)

You can enhance this project’s final code with one of our tutorial extensions, or start your next Astro project!

[Start a new Astro Project](/en/install-and-setup/) Begin a new empty project, or use an existing Astro theme template.

[Join us on Discord](https://astro.build/chat) Connect with our community to ask questions, share your work, and get involved with the project!

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/6-islands/3.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Back on dry land. Take your blog from day to night, no island required!](/en/tutorial/6-islands/2/) [Next  
Optional: Make a content collection](/en/tutorial/6-islands/4/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/tutorial/6-islands/4
Optional: Make a content collection
===================================

Now that you have a blog using Astro’s [built-in file-based routing](/en/guides/routing/#static-routes), you will update it to use a [content collection](/en/guides/content-collections/). Content collections are a powerful way to manage groups of similar content, such as blog posts.

Get ready to…

*   Move your folder of blog posts into `src/blog/`
*   Create a schema to define your blog post frontmatter
*   Use `getCollection()` to get blog post content and metadata

Learn: Pages vs Collections
---------------------------

[Section titled Learn: Pages vs Collections](#learn-pages-vs-collections)

Even when using content collections, you will still use the `src/pages/` folder for individual pages, such as your About Me page. But, moving your blog posts outside of this special folder will allow you to use more powerful and performant APIs to generate your blog post index and display your individual blog posts.

At the same time, you’ll receive better guidance and autocompletion in your code editor because you will have a **[schema](/en/guides/content-collections/#defining-the-collection-schema)** to define a common structure for each post that Astro will help you enforce through [Zod](https://zod.dev/), a schema declaration and validation library for TypeScript. In your schema, you can specify when frontmatter properties are required, such as a description or an author, and which data type each property must be, such as a string or an array. This leads to catching many mistakes sooner, with descriptive error messages telling you exactly what the problem is.

Read more about [Astro’s content collections](/en/guides/content-collections/) in our guide, or get started with the instructions below to convert a basic blog from `src/pages/posts/` to `src/blog/`.

### Test your knowledge

[Section titled Test your knowledge](#test-your-knowledge)

1.  Which type of page would you probably keep in `src/pages/`?
    
    1.  Blog posts that all contain the same basic structure and metadata
        
    2.  Product pages in an eCommerce site
        
    3.  A contact page, because you do not have multiple similar pages of this type
        
    
    Submit
    
    class s extends HTMLElement{#s;#i;#r;#e;#t;constructor(){super(),this.#s=this.dataset.correctLabel,this.#i=this.dataset.incorrectLabel,this.#r=Math.random().toString(),this.#e=this.querySelector(".submit"),this.#t=this.querySelector(".answer"),this.querySelectorAll(".opt-list > li").forEach(t=>this.#l(t))}#l(t){const e=t.querySelector('input\[type="radio"\]');e&&(e.removeAttribute("disabled"),e.setAttribute("name",this.#r),e.addEventListener("change",()=>{this.#n(),this.#c()}),e.checked&&this.#c())}#n(){this.#t.innerText="",this.#t.classList.remove("wrong","correct"),this.#t.classList.add("sr-only")}#o(t){const e=this.querySelector("input:checked ~ template");e?this.#t.replaceChildren(e.content.cloneNode(!0)):this.#t.innerText=t?this.#s:this.#i,this.#t.classList.remove("sr-only","wrong","correct"),this.#t.classList.add(t?"correct":"wrong")}#c(){this.#e.removeAttribute("disabled"),this.#e.classList.remove("sr-only"),this.#e.onclick=()=>this.#h()}#a(){this.#e.setAttribute("disabled",""),this.#e.classList.add("sr-only"),this.#e.onclick=null}#h(){const t=this.querySelector("input:checked");if(!t)return;this.#a();const e=t.dataset.isCorrect!==void 0&&\["","true"\].includes(t.dataset.isCorrect);this.#o(e)}}customElements.define("multiple-choice",s);
2.  Which is **not** a benefit of moving blog posts to a content collection?
    
    1.  Pages are automatically created for each file
        
    2.  Better error messages, because Astro knows more about each file
        
    3.  Better data fetching, with a more performant function
        
    
    Submit
    
3.  Content collections uses TypeScript …
    
    1.  To make me feel bad
        
    2.  To understand and validate my collections, and to provide editor tooling
        
    3.  Only if I have the `strictest` configuration set in `tsconfig.json`
        
    
    Submit
    

The steps below show you how to extend the final product of the Build a Blog tutorial by creating a content collection for the blog posts.

Upgrade dependencies
--------------------

[Section titled Upgrade dependencies](#upgrade-dependencies)

Upgrade to the latest version of Astro, and upgrade all integrations to their latest versions by running the following commands in your terminal:

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3408)
*   [pnpm](#tab-panel-3409)
*   [Yarn](#tab-panel-3410)

Terminal window

    # Upgrade Astro and official integrations togethernpx @astrojs/upgrade

Terminal window

    # Upgrade Astro and official integrations togetherpnpm dlx @astrojs/upgrade

Terminal window

    # Upgrade Astro and official integrations togetheryarn dlx @astrojs/upgrade

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

Create a collection for your posts
----------------------------------

[Section titled Create a collection for your posts](#create-a-collection-for-your-posts)

1.  Create a new **collection** (folder) called `src/blog/`.
    
2.  Move all your existing blog posts (`.md` files) from `src/pages/posts/` into this new collection.
    
3.  Create a `src/content.config.ts` file to [define a schema](/en/guides/content-collections/#defining-the-collection-schema) for your `postsCollection`. For the existing blog tutorial code, add the following contents to the file to define all the frontmatter properties used in its blog posts:
    
    src/content.config.ts
    
        // Import the glob loaderimport { glob } from "astro/loaders";// Import utilities from `astro:content`import { z, defineCollection } from "astro:content";// Define a `loader` and `schema` for each collectionconst blog = defineCollection({    loader: glob({ pattern: '**/[^_]*.md', base: "./src/blog" }),    schema: z.object({      title: z.string(),      pubDate: z.date(),      description: z.string(),      author: z.string(),      image: z.object({        url: z.string(),        alt: z.string()      }),      tags: z.array(z.string())    })});// Export a single `collections` object to register your collection(s)export const collections = { blog };
    
4.  In order for Astro to recognize your schema, quit (`CTRL + C`) and restart the dev server to continue with the tutorial. This will define the `astro:content` module.
    

Generate pages from a collection
--------------------------------

[Section titled Generate pages from a collection](#generate-pages-from-a-collection)

1.  Create a page file called `src/pages/posts/[...slug].astro`. Your Markdown and MDX files no longer automatically become pages using Astro’s file-based routing when they are inside a collection, so you must create a page responsible for generating each individual blog post.
    
2.  Add the following code to [query your collection](/en/guides/content-collections/#querying-collections) to make each blog post’s slug and page content available to each page it will generate:
    
    src/pages/posts/\[...slug\].astro
    
        ---import { getCollection, render } from 'astro:content';
        export async function getStaticPaths() {  const posts = await getCollection('blog');  return posts.map(post => ({    params: { slug: post.id }, props: { post },  }));}
        const { post } = Astro.props;const { Content } = await render(post);---
    
3.  Render your post `<Content />` within the layout for Markdown pages. This allows you to specify a common layout for all of your posts.
    
    src/pages/posts/\[...slug\].astro
    
        ---import { getCollection, render } from 'astro:content';import MarkdownPostLayout from '../../layouts/MarkdownPostLayout.astro';
        export async function getStaticPaths() {  const posts = await getCollection('blog');  return posts.map(post => ({    params: { slug: post.id }, props: { post },  }));}
        const { post } = Astro.props;const { Content } = await render(post);---<MarkdownPostLayout frontmatter={post.data}>  <Content /></MarkdownPostLayout>
    
4.  Remove the `layout` definition in each individual post’s frontmatter. Your content is now wrapped in a layout when rendered, and this property is no longer needed.
    
    src/content/posts/post-1.md
    
        ---layout: ../../layouts/MarkdownPostLayout.astrotitle: 'My First Blog Post'pubDate: 2022-07-01...---
    

Replace `import.meta.glob()` with `getCollection()`
---------------------------------------------------

[Section titled Replace import.meta.glob() with getCollection()](#replace-importmetaglob-with-getcollection)

5.  Anywhere you have a list of blog posts, like the tutorial’s Blog page (`src/pages/blog.astro/`), you will need to replace `import.meta.glob()` with [`getCollection()`](/en/reference/modules/astro-content/#getcollection) as the way to fetch content and metadata from your Markdown files.
    
    src/pages/blog.astro
    
        ---import { getCollection } from "astro:content";import BaseLayout from "../layouts/BaseLayout.astro";import BlogPost from "../components/BlogPost.astro";
        const pageTitle = "My Astro Learning Blog";const allPosts = Object.values(import.meta.glob("../pages/posts/*.md", { eager: true }));const allPosts = await getCollection("blog");---
    
6.  You will also need to update references to the data returned for each `post`. You will now find your frontmatter values on the `data` property of each object. Also, when using collections each `post` object will have a page `slug`, not a full URL.
    
    src/pages/blog.astro
    
        ---import { getCollection } from "astro:content";import BaseLayout from "../layouts/BaseLayout.astro";import BlogPost from "../components/BlogPost.astro";
        const pageTitle = "My Astro Learning Blog";const allPosts = await getCollection("blog");---<BaseLayout pageTitle={pageTitle}>  <p>This is where I will post about my journey learning Astro.</p>  <ul>    {      allPosts.map((post) => (        <BlogPost url={post.url} title={post.frontmatter.title} />)}        <BlogPost url={`/posts/${post.id}/`} title={post.data.title} />      ))    }  </ul></BaseLayout>
    
7.  The tutorial blog project also dynamically generates a page for each tag using `src/pages/tags/[tag].astro` and displays a list of tags at `src/pages/tags/index.astro`.
    
    Apply the same changes as above to these two files:
    
    *   fetch data about all your blog posts using `getCollection("blog")` instead of using `import.meta.glob()`
    *   access all frontmatter values using `data` instead of `frontmatter`
    *   create a page URL by adding the post’s `slug` to the `/posts/` path
    
    The page that generates individual tag pages now becomes:
    
    src/pages/tags/\[tag\].astro
    
        ---import { getCollection } from "astro:content";import BaseLayout from "../../layouts/BaseLayout.astro";import BlogPost from "../../components/BlogPost.astro";
        export async function getStaticPaths() {  const allPosts = await getCollection("blog");  const uniqueTags = [...new Set(allPosts.map((post) => post.data.tags).flat())];
          return uniqueTags.map((tag) => {    const filteredPosts = allPosts.filter((post) =>      post.data.tags.includes(tag)    );    return {      params: { tag },      props: { posts: filteredPosts },    };  });}
        const { tag } = Astro.params;const { posts } = Astro.props;---
        <BaseLayout pageTitle={tag}>  <p>Posts tagged with {tag}</p>  <ul>    { posts.map((post) => <BlogPost url={`/posts/${post.id}/`} title={post.data.title} />) }  </ul></BaseLayout>
    
    ### Try it yourself - Update the query in the Tag Index page
    
    [Section titled Try it yourself - Update the query in the Tag Index page](#try-it-yourself---update-the-query-in-the-tag-index-page)
    
    Import and use `getCollection` to fetch the tags used in the blog posts on `src/pages/tags/index.astro`, following the [same steps as above](#replace-importmetaglob-with-getcollection).
    
    Show me the code.
    
    src/pages/tags/index.astro
    
        ---import { getCollection } from "astro:content";import BaseLayout from "../../layouts/BaseLayout.astro";const allPosts = await getCollection("blog");const tags = [...new Set(allPosts.map((post) => post.data.tags).flat())];const pageTitle = "Tag Index";---<!-- ... -->
    

Update any frontmatter values to match your schema
--------------------------------------------------

[Section titled Update any frontmatter values to match your schema](#update-any-frontmatter-values-to-match-your-schema)

If necessary, update any frontmatter values throughout your project, such as in your layout, that do not match your collections schema.

In the blog tutorial example, `pubDate` was a string. Now, according to the schema that defines types for the post frontmatter, `pubDate` will be a `Date` object. You can now take advantage of this to use the methods available for any `Date` object to format the date.

To render the date in the blog post layout, convert it to a string using `toLocaleDateString()` method:

src/layouts/MarkdownPostLayout.astro

    <!-- ... --><BaseLayout pageTitle={frontmatter.title}>    <p>{frontmatter.pubDate.toLocaleDateString()}</p>    <p><em>{frontmatter.description}</em></p>    <p>Written by: {frontmatter.author}</p>    <img src={frontmatter.image.url} width="300" alt={frontmatter.image.alt} /><!-- ... -->

Update the RSS function
-----------------------

[Section titled Update the RSS function](#update-the-rss-function)

The tutorial blog project includes an RSS feed. This function must also use `getCollection()` to return information from your blog posts. You will then generate the RSS items using the `data` object returned.

src/pages/rss.xml.js

    import rss from '@astrojs/rss';import { pagesGlobToRssItems } from '@astrojs/rss';import { getCollection } from 'astro:content';
    export async function GET(context) {  const posts = await getCollection("blog");  return rss({    title: 'Astro Learner | Blog',    description: 'My journey learning Astro',    site: context.site,    items: await pagesGlobToRssItems(import.meta.glob('./**/*.md')),    items: posts.map((post) => ({      title: post.data.title,      pubDate: post.data.pubDate,      description: post.data.description,      link: `/posts/${post.id}/`,    })),    customData: `<language>en-us</language>`,  })}

For the full example of the blog tutorial using content collections, see the [Content Collections branch](https://github.com/withastro/blog-tutorial-demo/tree/content-collections) of the tutorial repo.

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can use content collections to manage groups of similar content for better performance and organization.

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/6-islands/4.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Congratulations!](/en/tutorial/6-islands/3/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)





