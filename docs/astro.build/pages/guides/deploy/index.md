Deploy your Astro Site
======================

**Ready to build and deploy your Astro site?** Follow one of our guides to different deployment services or scroll down for general guidance about deploying an Astro site.

Deployment Guides
-----------------

[Section titled Deployment Guides](#deployment-guides)

*   ![](/logos/netlify.svg)
    
    ### [Netlify](/en/guides/deploy/netlify/)
    
    On demandStatic
    
*   ![](/logos/vercel.svg)
    
    ### [Vercel](/en/guides/deploy/vercel/)
    
    On demandStatic
    
*   ![](/logos/deno.svg)
    
    ### [Deno Deploy](/en/guides/deploy/deno/)
    
    On demandStatic
    
*   ![](/logos/github.svg)
    
    ### [GitHub Pages](/en/guides/deploy/github/)
    
    Static
    
*   ![](/logos/gitlab.svg)
    
    ### [GitLab Pages](/en/guides/deploy/gitlab/)
    
    Static
    
*   ![](/logos/cloudflare-pages.svg)
    
    ### [Cloudflare Pages](/en/guides/deploy/cloudflare/)
    
    On demandStatic
    
*   ![](/logos/aws.svg)
    
    ### [AWS](/en/guides/deploy/aws/)
    
    On demandStatic
    
*   ![](/logos/flightcontrol.svg)
    
    ### [AWS via Flightcontrol](/en/guides/deploy/flightcontrol/)
    
    On demandStatic
    
*   ![](/logos/sst.svg)
    
    ### [AWS via SST](/en/guides/deploy/sst/)
    
    On demandStatic
    
*   ![](/logos/clever-cloud.svg)
    
    ### [Clever Cloud](/en/guides/deploy/clever-cloud/)
    
    On demandStatic
    
*   ![](/logos/azion.svg)
    
    ### [Azion](/en/guides/deploy/azion/)
    
    On demandStatic
    
*   ![](/logos/google-cloud.svg)
    
    ### [Google Cloud](/en/guides/deploy/google-cloud/)
    
    On demandStatic
    
*   ![](/logos/firebase.svg)
    
    ### [Google Firebase](/en/guides/deploy/google-firebase/)
    
    On demandStatic
    
*   ![](/logos/heroku.svg)
    
    ### [Heroku](/en/guides/deploy/heroku/)
    
    Static
    
*   ![](/logos/microsoft-azure.svg)
    
    ### [Microsoft Azure](/en/guides/deploy/microsoft-azure/)
    
    Static
    
*   ![](/logos/buddy.svg)
    
    ### [Buddy](/en/guides/deploy/buddy/)
    
    Static
    
*   ![](/logos/edgio.svg)
    
    ### [Edgio](/en/guides/deploy/edgio/)
    
    On demandStatic
    
*   ![](/logos/fleek.svg)
    
    ### [Fleek](/en/guides/deploy/fleek/)
    
    Static
    
*   ![](/logos/flyio.svg)
    
    ### [Fly.io](/en/guides/deploy/flyio/)
    
    On demandStatic
    
*   ![](/logos/render.svg)
    
    ### [Render](/en/guides/deploy/render/)
    
    Static
    
*   ![](/logos/stormkit.svg)
    
    ### [Stormkit](/en/guides/deploy/stormkit/)
    
    Static
    
*   ![](/logos/surge.svg)
    
    ### [Surge](/en/guides/deploy/surge/)
    
    Static
    
*   ![](/logos/cleavr.svg)
    
    ### [Cleavr](/en/guides/deploy/cleavr/)
    
    On demandStatic
    
*   ![](/logos/kinsta.svg)
    
    ### [Kinsta](/en/guides/deploy/kinsta/)
    
    On demandStatic
    
*   ![](/logos/zeabur.svg)
    
    ### [Zeabur](/en/guides/deploy/zeabur/)
    
    On demandStatic
    
*   ![](/logos/zerops.svg)
    
    ### [Zerops](/en/guides/deploy/zerops/)
    
    On demandStatic
    

Quick Deploy Options
--------------------

[Section titled Quick Deploy Options](#quick-deploy-options)

You can build and deploy an Astro site to a number of hosts quickly using either their website’s dashboard UI or a CLI.

### Website UI

[Section titled Website UI](#website-ui)

A quick way to deploy your website is to connect your Astro project’s online Git repository (e.g. GitHub, GitLab, Bitbucket) to a host provider and take advantage of continuous deployment using Git.

These host platforms automatically detect pushes to your Astro project’s source repository, build your site and deploy it to the web at a custom URL or your personal domain. Often, setting up a deployment on these platforms will follow steps something like the following:

1.  Add your repository to an online Git provider (e.g. in GitHub, GitLab, Bitbucket)
    
2.  Choose a host that supports **continuous deployment** (e.g. [Netlify](/en/guides/deploy/netlify/) or [Vercel](/en/guides/deploy/vercel/)) and import your Git repository as a new site/project.
    
    Many common hosts will recognize your project as an Astro site, and should choose the appropriate configuration settings to build and deploy your site as shown below. (If not, these settings can be changed.)
    
    Deploy settings
    
    *   **Build Command:** `astro build` or `npm run build`
    *   **Publish directory:** `dist`
    
3.  Click “Deploy” and your new website will be created at a unique URL for that host (e.g. `new-astro-site.netlify.app`).
    

The host will be automatically configured to watch your Git provider’s main branch for changes, and to rebuild and republish your site at each new commit. These settings can typically be configured in your host provider’s dashboard UI.

### CLI Deployment

[Section titled CLI Deployment](#cli-deployment)

Some hosts will have their own command line interface (CLI) you can install globally to your machine using npm. Often, using a CLI to deploy looks something like the following:

1.  Install your host’s CLI globally, for example:
    
    (() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()
    
    *   [npm](#tab-panel-3161)
    *   [pnpm](#tab-panel-3162)
    *   [Yarn](#tab-panel-3163)
    
    Terminal window
    
        npm install --global netlify-cli
    
    Terminal window
    
        pnpm add --global netlify-cli
    
    Terminal window
    
        yarn global add netlify-cli
    
    class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);
2.  Run the CLI and follow any instructions for authorization, setup etc.
    
3.  Build your site and deploy to your host
    
    Many common hosts will build and deploy your site for you. They will usually recognize your project as an Astro site, and should choose the appropriate configuration settings to build and deploy as shown below. (If not, these settings can be changed.)
    
    Deploy settings
    
    *   **Build Command:** `astro build` or `npm run build`
    *   **Publish directory:** `dist`
    
    Other hosts will require you to [build your site locally](#building-your-site-locally) and deploy using the command line.
    

Building Your Site Locally
--------------------------

[Section titled Building Your Site Locally](#building-your-site-locally)

Many hosts like Netlify and Vercel will build your site for you and then publish that build output to the web. But, some sites will require you to build locally and then run a deploy command or upload your build output.

You may also wish to build locally to preview your site, or to catch any potential errors and warnings in your own environment.

Run the command `npm run build` to build your Astro site.

*   [npm](#tab-panel-3164)
*   [pnpm](#tab-panel-3165)
*   [Yarn](#tab-panel-3166)

Terminal window

    npm run build

Terminal window

    pnpm run build

Terminal window

    yarn run build

By default, the build output will be placed at `dist/`. This location can be changed using the [`outDir` configuration option](/en/reference/configuration-reference/#outdir).

Adding an Adapter for on-demand rendering
-----------------------------------------

[Section titled Adding an Adapter for on-demand rendering](#adding-an-adapter-for-on-demand-rendering)

Note

Before deploying your Astro site with [on-demand rendering](/en/guides/on-demand-rendering/) enabled, make sure you have:

*   Installed the [appropriate adapter](/en/guides/on-demand-rendering/) to your project dependencies (either manually, or using the adapter’s `astro add` command, e.g. `npx astro add netlify`).
*   [Added the adapter](/en/reference/configuration-reference/#integrations) to your `astro.config.mjs` file’s import and default export when installing manually. (The `astro add` command will take care of this step for you!)

Recipes

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/deploy/index.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Publish to NPM](/en/reference/publish-to-npm/) [Next  
AWS](/en/guides/deploy/aws/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)