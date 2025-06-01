Astro v5 is here! [Learn how to upgrade your site](/en/guides/upgrade-to/v5/)

Install Astro
=============

The [`create astro` CLI command](#install-from-the-cli-wizard) is the fastest way to start a new Astro project from scratch. It will walk you through every step of setting up your new Astro project and allow you to choose from a few different official starter templates.

You can also run the CLI command with the `template` flag to begin your project using any existing theme or starter template. Explore our [themes and starters showcase](https://astro.build/themes/) where you can browse themes for blogs, portfolios, documentation sites, landing pages, and more!

To install Astro manually instead, see our [step-by-step manual installation guide](#manual-setup).

Online previews

Prefer to try Astro in your browser? Visit [astro.new](https://astro.new/) to browse our starter templates and spin up a new Astro project without ever leaving your browser.

Prerequisites
-------------

[Section titled Prerequisites](#prerequisites)

*   **Node.js** - `v18.20.8` or `v20.3.0`, `v22.0.0` or higher. ( `v19` and `v21` are not supported.)
*   **Text editor** - We recommend [VS Code](https://code.visualstudio.com/) with our [Official Astro extension](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode).
*   **Terminal** - Astro is accessed through its command-line interface (CLI).

Browser compatibility
---------------------

[Section titled Browser compatibility](#browser-compatibility)

Astro is built with Vite which targets browsers with modern JavaScript support by default. For a complete reference, you can see the [list of currently supported browser versions in Vite](https://vite.dev/guide/build.html#browser-compatibility).

Install from the CLI wizard
---------------------------

[Section titled Install from the CLI wizard](#install-from-the-cli-wizard)

You can run `create astro` anywhere on your machine, so there’s no need to create a new empty directory for your project before you begin. If you don’t have an empty directory yet for your new project, the wizard will help create one for you automatically.

1.  Run the following command in your terminal to start the install wizard:
    
    (() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()
    
    *   [npm](#tab-panel-1283)
    *   [pnpm](#tab-panel-1284)
    *   [Yarn](#tab-panel-1285)
    
    Terminal window
    
        # create a new project with npmnpm create astro@latest
    
    Terminal window
    
        # create a new project with pnpmpnpm create astro@latest
    
    Terminal window
    
        # create a new project with yarnyarn create astro
    
    class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);
    
    If all goes well, you will see a success message followed by some recommended next steps.
    
2.  Now that your project has been created, you can `cd` into your new project directory to begin using Astro.
    
3.  If you skipped the “Install dependencies?” step during the CLI wizard, then be sure to install your dependencies before continuing.
    
    *   [npm](#tab-panel-1286)
    *   [pnpm](#tab-panel-1287)
    *   [Yarn](#tab-panel-1288)
    
    Terminal window
    
        npm install
    
    Terminal window
    
        pnpm install
    
    Terminal window
    
        yarn install
    
4.  You can now [start the Astro dev server](/en/develop-and-build/#start-the-astro-dev-server) and see a live preview of your project while you build!
    

CLI installation flags
----------------------

[Section titled CLI installation flags](#cli-installation-flags)

You can run the `create astro` command with additional flags to customize the setup process (e.g. answering “yes” to all questions, skipping the Houston animation) or your new project (e.g. install git or not, add integrations).

See [all the available `create astro` command flags](https://github.com/withastro/astro/blob/main/packages/create-astro/README.md)

### Add integrations

[Section titled Add integrations](#add-integrations)

You can start a new Astro project and install any [official integrations](/en/guides/integrations-guide/) or community integrations that support the `astro add` command at the same time by passing the `--add` argument to the `create astro` command.

Run the following command in your terminal, substituting any integration that supports the `astro add` command:

*   [npm](#tab-panel-1289)
*   [pnpm](#tab-panel-1290)
*   [Yarn](#tab-panel-1291)

Terminal window

    # create a new project with React and Partytownnpm create astro@latest -- --add react --add partytown

Terminal window

    # create a new project with React and Partytownpnpm create astro@latest --add react --add partytown

Terminal window

    # create a new project with React and Partytownyarn create astro --add react --add partytown

### Use a theme or starter template

[Section titled Use a theme or starter template](#use-a-theme-or-starter-template)

You can start a new Astro project based on an [official example](https://github.com/withastro/astro/tree/main/examples) or the `main` branch of any GitHub repository by passing a `--template` argument to the `create astro` command.

Run the following command in your terminal, substituting the official Astro starter template name, or the GitHub username and repository of the theme you want to use:

*   [npm](#tab-panel-1292)
*   [pnpm](#tab-panel-1293)
*   [Yarn](#tab-panel-1294)

Terminal window

    # create a new project with an official examplenpm create astro@latest -- --template <example-name>
    # create a new project based on a GitHub repository’s main branchnpm create astro@latest -- --template <github-username>/<github-repo>

Terminal window

    # create a new project with an official examplepnpm create astro@latest --template <example-name>
    # create a new project based on a GitHub repository’s main branchpnpm create astro@latest --template <github-username>/<github-repo>

Terminal window

    # create a new project with an official exampleyarn create astro --template <example-name>
    # create a new project based on a GitHub repository’s main branchyarn create astro --template <github-username>/<github-repo>

By default, this command will use the template repository’s `main` branch. To use a different branch name, pass it as part of the `--template` argument: `<github-username>/<github-repo>#<branch>`.

Manual Setup
------------

[Section titled Manual Setup](#manual-setup)

This guide will walk you through the steps to manually install and configure a new Astro project.

If you prefer not to use our automatic `create astro` CLI tool, you can set up your project yourself by following the guide below.

1.  Create your directory
    
    Create an empty directory with the name of your project, and then navigate into it.
    
    Terminal window
    
        mkdir my-astro-projectcd my-astro-project
    
    Once you are in your new directory, create your project `package.json` file. This is how you will manage your project dependencies, including Astro. If you aren’t familiar with this file format, run the following command to create one.
    
    *   [npm](#tab-panel-1295)
    *   [pnpm](#tab-panel-1296)
    *   [Yarn](#tab-panel-1297)
    
    Terminal window
    
        npm init --yes
    
    Terminal window
    
        pnpm init
    
    Terminal window
    
        yarn init --yes
    
2.  Install Astro
    
    First, install the Astro project dependencies inside your project.
    
    Important
    
    Astro must be installed locally, not globally. Make sure you are _not_ running `npm install -g astro` `pnpm add -g astro` or `yarn add global astro`.
    
    *   [npm](#tab-panel-1298)
    *   [pnpm](#tab-panel-1299)
    *   [Yarn](#tab-panel-1300)
    
    Terminal window
    
        npm install astro
    
    Terminal window
    
        pnpm add astro
    
    Terminal window
    
        yarn add astro
    
    Then, replace any placeholder “scripts” section of your `package.json` with the following:
    
    package.json
    
        {  "scripts": {    "test": "echo \"Error: no test specified\" && exit 1",    "dev": "astro dev",    "build": "astro build",    "preview": "astro preview"  },}
    
    You’ll use these scripts later in the guide to start Astro and run its different commands.
    
3.  Create your first page
    
    In your text editor, create a new file in your directory at `src/pages/index.astro`. This will be your first Astro page in the project.
    
    For this guide, copy and paste the following code snippet (including `---` dashes) into your new file:
    
    src/pages/index.astro
    
        ---// Welcome to Astro! Everything between these triple-dash code fences// is your "component frontmatter". It never runs in the browser.console.log('This runs in your terminal, not the browser!');---<!-- Below is your "component template." It's just HTML, but with    some magic sprinkled in to help you build great templates. --><html>  <body>    <h1>Hello, World!</h1>  </body></html><style>  h1 {    color: orange;  }</style>
    
4.  Create your first static asset
    
    You will also want to create a `public/` directory to store your static assets. Astro will always include these assets in your final build, so you can safely reference them from inside your component templates.
    
    In your text editor, create a new file in your directory at `public/robots.txt`. `robots.txt` is a simple file that most sites will include to tell search bots like Google how to treat your site.
    
    For this guide, copy and paste the following code snippet into your new file:
    
    public/robots.txt
    
        # Example: Allow all bots to scan and index your site.# Full syntax: https://developers.google.com/search/docs/advanced/robots/create-robots-txtUser-agent: *Allow: /
    
5.  Create `astro.config.mjs`
    
    Astro is configured using `astro.config.mjs`. This file is optional if you do not need to configure Astro, but you may wish to create it now.
    
    Create `astro.config.mjs` at the root of your project, and copy the code below into it:
    
    astro.config.mjs
    
        import { defineConfig } from "astro/config";
        // https://astro.build/configexport default defineConfig({});
    
    If you want to include [UI framework components](/en/guides/framework-components/) such as React, Svelte, etc. or use other tools such as MDX or Partytown in your project, here is where you will [manually import and configure integrations](/en/guides/integrations-guide/).
    
    Read Astro’s [API configuration reference](/en/reference/configuration-reference/) for more information.
    
6.  Add TypeScript support
    
    TypeScript is configured using `tsconfig.json`. Even if you don’t write TypeScript code, this file is important so that tools like Astro and VS Code know how to understand your project. Some features (like npm package imports) aren’t fully supported in the editor without a `tsconfig.json` file.
    
    If you do intend to write TypeScript code, using Astro’s `strict` or `strictest` template is recommended. You can view and compare the three template configurations at [astro/tsconfigs/](https://github.com/withastro/astro/blob/main/packages/astro/tsconfigs/).
    
    Create `tsconfig.json` at the root of your project, and copy the code below into it. (You can use `base`, `strict`, or `strictest` for your TypeScript template):
    
    tsconfig.json
    
        {  "extends": "astro/tsconfigs/base"}
    
    Read Astro’s [TypeScript setup guide](/en/guides/typescript/#setup) for more information.
    
7.  Next Steps
    
    If you have followed the steps above, your project directory should now look like this:
    
    *   Directorynode\_modules/
        
        *   …
        
    *   Directorypublic/
        
        *   robots.txt
        
    *   Directorysrc/
        
        *   Directorypages/
            
            *   index.astro
            
        
    *   astro.config.mjs
    *   package-lock.json or `yarn.lock`, `pnpm-lock.yaml`, etc.
    *   package.json
    *   tsconfig.json
    
8.  You can now [start the Astro dev server](/en/develop-and-build/#start-the-astro-dev-server) and see a live preview of your project while you build!
    

Learn

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/install-and-setup.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Tutorial: Build a blog](/en/tutorial/0-introduction/) [Next  
Project structure](/en/basics/project-structure/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

