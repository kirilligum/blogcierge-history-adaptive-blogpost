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

