Add Integrations
================

**Astro integrations** add new functionality and behaviors for your project with only a few lines of code. You can use an official integration, [integrations built by the community](#finding-more-integrations) or even [build a custom integration yourself](#building-your-own-integration).

Integrations can…

*   Unlock React, Vue, Svelte, Solid, and other popular UI frameworks with a [renderer](/en/guides/framework-components/).
*   Enable on-demand rendering with an [SSR adapter](/en/guides/on-demand-rendering/).
*   Integrate tools like MDX, and Partytown with a few lines of code.
*   Add new features to your project, like automatic sitemap generation.
*   Write custom code that hooks into the build process, dev server, and more.

Integrations directory

Browse or search the complete set of hundreds of official and community integrations in our [integrations directory](https://astro.build/integrations/). Find packages to add to your Astro project for authentication, analytics, performance, SEO, accessibility, UI, developer tools, and more.

Official Integrations
---------------------

[Section titled Official Integrations](#official-integrations)

The following integrations are maintained by Astro.

### Front-end frameworks

*   ![](/logos/alpine-js.svg)
    
    ### [@astrojs/alpinejs](/en/guides/integrations-guide/alpinejs/)
    
*   ![](/logos/preact.svg)
    
    ### [@astrojs/preact](/en/guides/integrations-guide/preact/)
    
*   ![](/logos/react.svg)
    
    ### [@astrojs/react](/en/guides/integrations-guide/react/)
    
*   ![](/logos/solid.svg)
    
    ### [@astrojs/solid⁠-⁠js](/en/guides/integrations-guide/solid-js/)
    
*   ![](/logos/svelte.svg)
    
    ### [@astrojs/svelte](/en/guides/integrations-guide/svelte/)
    
*   ![](/logos/vue.svg)
    
    ### [@astrojs/vue](/en/guides/integrations-guide/vue/)
    

### Adapters

*   ![](/logos/cloudflare-pages.svg)
    
    ### [@astrojs/cloudflare](/en/guides/integrations-guide/cloudflare/)
    
*   ![](/logos/netlify.svg)
    
    ### [@astrojs/netlify](/en/guides/integrations-guide/netlify/)
    
*   ![](/logos/node.svg)
    
    ### [@astrojs/node](/en/guides/integrations-guide/node/)
    
*   ![](/logos/vercel.svg)
    
    ### [@astrojs/vercel](/en/guides/integrations-guide/vercel/)
    

### Other integrations

*   ![](/logos/db.svg)
    
    ### [@astrojs/db](/en/guides/integrations-guide/db/)
    
*   ![](/logos/markdoc.svg)
    
    ### [@astrojs/markdoc](/en/guides/integrations-guide/markdoc/)
    
*   ![](/logos/mdx.svg)
    
    ### [@astrojs/mdx](/en/guides/integrations-guide/mdx/)
    
*   ![](/logos/partytown.svg)
    
    ### [@astrojs/partytown](/en/guides/integrations-guide/partytown/)
    
*   ![](/logos/sitemap.svg)
    
    ### [@astrojs/sitemap](/en/guides/integrations-guide/sitemap/)
    

Automatic Integration Setup
---------------------------

[Section titled Automatic Integration Setup](#automatic-integration-setup)

Astro includes an `astro add` command to automate the setup of official integrations. Several community plugins can also be added using this command. Please check each integration’s own documentation to see whether `astro add` is supported, or whether you must [install manually](#manual-installation).

Run the `astro add` command using the package manager of your choice and our automatic integration wizard will update your configuration file and install any necessary dependencies.

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3208)
*   [pnpm](#tab-panel-3209)
*   [Yarn](#tab-panel-3210)

Terminal window

    npx astro add react

Terminal window

    pnpm astro add react

Terminal window

    yarn astro add react

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

It’s even possible to add multiple integrations at the same time!

*   [npm](#tab-panel-3211)
*   [pnpm](#tab-panel-3212)
*   [Yarn](#tab-panel-3213)

Terminal window

    npx astro add react sitemap partytown

Terminal window

    pnpm astro add react sitemap partytown

Terminal window

    yarn astro add react sitemap partytown

Handling integration dependencies

If you see any warnings like `Cannot find package '[package-name]'` after adding an integration, your package manager may not have installed [peer dependencies](https://nodejs.org/en/blog/npm/peer-dependencies/) for you. To install these missing packages, run the following command:

*   [npm](#tab-panel-3214)
*   [pnpm](#tab-panel-3215)
*   [Yarn](#tab-panel-3216)

Terminal window

    npm install [package-name]

Terminal window

    pnpm add [package-name]

Terminal window

    yarn add [package-name]

### Manual Installation

[Section titled Manual Installation](#manual-installation)

Astro integrations are always added through the `integrations` property in your `astro.config.mjs` file.

There are three common ways to import an integration into your Astro project:

1.  [Install an npm package integration](#installing-an-npm-package).
    
2.  Import your own integration from a local file inside your project.
    
3.  Write your integration inline, directly in your config file.
    
    astro.config.mjs
    
        import { defineConfig } from 'astro/config';import installedIntegration from '@astrojs/vue';import localIntegration from './my-integration.js';
        export default defineConfig({  integrations: [    // 1. Imported from an installed npm package    installedIntegration(),    // 2. Imported from a local JS file    localIntegration(),    // 3. An inline object    {name: 'namespace:id', hooks: { /* ... */ }},  ]});
    

Check out the [Integration API](/en/reference/integrations-reference/) reference to learn all of the different ways that you can write an integration.

#### Installing an NPM package

[Section titled Installing an NPM package](#installing-an-npm-package)

Install an NPM package integration using a package manager, and then update `astro.config.mjs` manually.

For example, to install the `@astrojs/sitemap` integration:

1.  Install the integration to your project dependencies using your preferred package manager:
    
    *   [npm](#tab-panel-3217)
    *   [pnpm](#tab-panel-3218)
    *   [Yarn](#tab-panel-3219)
    
    Terminal window
    
        npm install @astrojs/sitemap
    
    Terminal window
    
        pnpm add @astrojs/sitemap
    
    Terminal window
    
        yarn add @astrojs/sitemap
    
2.  Import the integration to your `astro.config.mjs` file, and add it to your `integrations[]` array, along with any configuration options:
    
    astro.config.mjs
    
        import { defineConfig } from 'astro/config';import sitemap from '@astrojs/sitemap';
        export default defineConfig({  // ...  integrations: [sitemap()],  // ...});
    
    Note that different integrations may have different configuration settings. Read each integration’s documentation, and apply any necessary config options to your chosen integration in `astro.config.mjs`.
    

### Custom Options

[Section titled Custom Options](#custom-options)

Integrations are almost always authored as factory functions that return the actual integration object. This lets you pass arguments and options to the factory function that customize the integration for your project.

    integrations: [  // Example: Customize your integration with function arguments  sitemap({filter: true})]

### Toggle an Integration

[Section titled Toggle an Integration](#toggle-an-integration)

Falsy integrations are ignored, so you can toggle integrations on & off without worrying about left-behind `undefined` and boolean values.

    integrations: [  // Example: Skip building a sitemap on Windows  process.platform !== 'win32' && sitemap()]

Upgrading Integrations
----------------------

[Section titled Upgrading Integrations](#upgrading-integrations)

To upgrade all official integrations at once, run the `@astrojs/upgrade` command. This will upgrade both Astro and all official integrations to their latest versions.

### Automatic Upgrading

[Section titled Automatic Upgrading](#automatic-upgrading)

*   [npm](#tab-panel-3220)
*   [pnpm](#tab-panel-3221)
*   [Yarn](#tab-panel-3222)

Terminal window

    # Upgrade Astro and official integrations together to latestnpx @astrojs/upgrade

Terminal window

    # Upgrade Astro and official integrations together to latestpnpm dlx @astrojs/upgrade

Terminal window

    # Upgrade Astro and official integrations together to latestyarn dlx @astrojs/upgrade

### Manual Upgrading

[Section titled Manual Upgrading](#manual-upgrading)

To upgrade one or more integrations manually, use the appropriate command for your package manager.

*   [npm](#tab-panel-3223)
*   [pnpm](#tab-panel-3224)
*   [Yarn](#tab-panel-3225)

Terminal window

    # Example: upgrade React and Partytown integrationsnpm install @astrojs/react@latest @astrojs/partytown@latest

Terminal window

    # Example: upgrade React and Partytown integrationspnpm add @astrojs/react@latest @astrojs/partytown@latest

Terminal window

    # Example: upgrade React and Partytown integrationsyarn add @astrojs/react@latest @astrojs/partytown@latest

Removing an Integration
-----------------------

[Section titled Removing an Integration](#removing-an-integration)

1.  To remove an integration, first uninstall the integration from your project.
    
    *   [npm](#tab-panel-3226)
    *   [pnpm](#tab-panel-3227)
    *   [Yarn](#tab-panel-3228)
    
    Terminal window
    
        npm uninstall @astrojs/react
    
    Terminal window
    
        pnpm remove @astrojs/react
    
    Terminal window
    
        yarn remove @astrojs/react
    
2.  Next, remove the integration from your `astro.config.*` file:
    
    astro.config.mjs
    
        import { defineConfig } from 'astro/config';
        import react from '@astrojs/react';
        export default defineConfig({  integrations: [    react()  ]});
    

Finding More Integrations
-------------------------

[Section titled Finding More Integrations](#finding-more-integrations)

You can find many integrations developed by the community in the [Astro Integrations Directory](https://astro.build/integrations/). Follow links there for detailed usage and configuration instructions.

Building Your Own Integration
-----------------------------

[Section titled Building Your Own Integration](#building-your-own-integration)

Astro’s Integration API is inspired by Rollup and Vite, and designed to feel familiar to anyone who has ever written a Rollup or Vite plugin before.

Check out the [Integration API](/en/reference/integrations-reference/) reference to learn what integrations can do and how to write one yourself.

Learn

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/integrations-guide/index.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Error reference](/en/reference/error-reference/) [Next  
Alpine.js](/en/guides/integrations-guide/alpinejs/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)