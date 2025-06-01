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

# Aggregated from ./pages/guides/deploy/cloudflare
Deploy your Astro Site to Cloudflare
====================================

You can deploy full-stack applications, including front-end static assets and back-end APIs, as well as on-demand rendered sites, to both [Cloudflare Workers](https://developers.cloudflare.com/workers/static-assets/) and [Cloudflare Pages](https://pages.cloudflare.com/).

This guide includes:

*   [How to deploy to Cloudflare Workers](#cloudflare-workers)
*   [How to deploy to Cloudflare Pages](#cloudflare-pages)

Note

Cloudflare recommends using Cloudflare Workers for new projects. For existing Pages projects, refer to [Cloudflare’s migration guide](https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/) and [compatibility matrix](https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/#compatibility-matrix).

Read more about [using the Cloudflare runtime](/en/guides/integrations-guide/cloudflare/) in your Astro project.

Prerequisites
-------------

[Section titled Prerequisites](#prerequisites)

To get started, you will need:

*   A Cloudflare account. If you don’t already have one, you can create a free Cloudflare account during the process.

Cloudflare Workers
------------------

[Section titled Cloudflare Workers](#cloudflare-workers)

### How to deploy with Wrangler

[Section titled How to deploy with Wrangler](#how-to-deploy-with-wrangler)

1.  Install [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/get-started/).
    
    Terminal window
    
        npm install wrangler@latest --save-dev
    
2.  If your site uses on demand rendering, install the [`@astrojs/cloudflare` adapter](/en/guides/integrations-guide/cloudflare/).
    
    This will install the adapter and make the appropriate changes to your `astro.config.mjs` file in one step.
    
    Terminal window
    
        npx astro add cloudflare
    
    Then, create a `.assetsignore` file in your `public/` folder, and add the following lines to it:
    
    public/.assetsignore
    
        _worker.js_routes.json
    
    Read more about [on-demand rendering in Astro](/en/guides/on-demand-rendering/).
    
3.  Create a [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/).
    
    (() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()
    
    *   [Static](#tab-panel-3116)
    *   [On demand](#tab-panel-3117)
    
    wrangler.jsonc
    
        {  "$schema": "node_modules/wrangler/config-schema.json",  "name": "my-astro-app",  // Update to today's date  "compatibility_date": "2025-03-25",  "assets": {    "directory": "./dist"  }}
    
    wrangler.jsonc
    
        {  "$schema": "node_modules/wrangler/config-schema.json",  "name": "my-astro-app",  "main": "./dist/_worker.js/index.js",  // Update to today's date  "compatibility_date": "2025-03-25",  "compatibility_flags": ["nodejs_compat"],  "assets": {    "binding": "ASSETS",    "directory": "./dist"  },  "observability": {    "enabled": true  }}
    
    class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);
4.  Preview your project locally with Wrangler.
    
    Terminal window
    
        npx astro build && npx wrangler dev
    
5.  Deploy using `npx wrangler deploy`.
    
    Terminal window
    
        npx astro build && npx wrangler deploy
    

After your assets are uploaded, Wrangler will give you a preview URL to inspect your site.

Read more about using [Cloudflare runtime APIs](/en/guides/integrations-guide/cloudflare/) such as bindings.

### How to deploy with CI/CD

[Section titled How to deploy with CI/CD](#how-to-deploy-with-cicd)

You can also use a CI/CD system such as [Workers Builds (BETA)](https://developers.cloudflare.com/workers/ci-cd/builds/) to automatically build and deploy your site on push.

If you’re using Workers Builds:

1.  Follow Steps 1-3 from the Wrangler section above.
    
2.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and navigate to `Workers & Pages`. Select `Create`.
    
3.  Under `Import a repository`, select a Git account and then the repository containing your Astro project.
    
4.  Configure your project with:
    
    *   Build command: `npx astro build`
    *   Deploy command: `npx wrangler deploy`
5.  Click `Save and Deploy`. You can now preview your Worker at its provided `workers.dev` subdomain.
    

Cloudflare Pages
----------------

[Section titled Cloudflare Pages](#cloudflare-pages)

### How to deploy with Wrangler

[Section titled How to deploy with Wrangler](#how-to-deploy-with-wrangler-1)

1.  Install [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/get-started/).
    
    Terminal window
    
        npm install wrangler@latest --save-dev
    
2.  If your site uses on demand rendering, install the [`@astrojs/cloudflare` adapter](/en/guides/integrations-guide/cloudflare/).
    
    This will install the adapter and make the appropriate changes to your `astro.config.mjs` file in one step.
    
    Terminal window
    
        npx astro add cloudflare
    
    Read more about [on demand rendering in Astro](/en/guides/on-demand-rendering/).
    
3.  Preview your project locally with Wrangler.
    
    Terminal window
    
        npx astro build && npx wrangler pages dev ./dist
    
4.  Deploy using `npx wrangler deploy`.
    
    Terminal window
    
        npx astro build && npx wrangler pages deploy ./dist
    

After your assets are uploaded, Wrangler will give you a preview URL to inspect your site.

### How to deploy a site with Git

[Section titled How to deploy a site with Git](#how-to-deploy-a-site-with-git)

1.  Push your code to your git repository (e.g. GitHub, GitLab).
    
2.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and navigate to **Compute (Workers) > Workers & Pages**. Select **Create** and then select the **Pages** tab. Connect your git repository.
    
3.  Configure your project with:
    
    *   **Framework preset**: `Astro`
    *   **Build command:** `npm run build`
    *   **Build output directory:** `dist`
    *   **Environment variables:** Set the `NODE_VERSION` variable to `20` or `22`. By default, Cloudflare Pages builds sites using Node.js `v18.17.1`, which is not compatible with the latest version of Astro.
4.  Click the **Save and Deploy** button.
    

Troubleshooting
---------------

[Section titled Troubleshooting](#troubleshooting)

### Client-side hydration

[Section titled Client-side hydration](#client-side-hydration)

Client-side hydration may fail as a result of Cloudflare’s Auto Minify setting. If you see `Hydration completed but contains mismatches` in the console, make sure to disable Auto Minify under Cloudflare settings.

### Node.js runtime APIs

[Section titled Node.js runtime APIs](#nodejs-runtime-apis)

If you are building a project that is using on-demand rendering with [the Cloudflare adapter](/en/guides/integrations-guide/cloudflare/) and the server fails to build with an error message such as `[Error] Could not resolve "XXXX. The package "XXXX" wasn't found on the file system but is built into node.`:

*   This means that a package or import you are using in the server-side environment is not compatible with the [Cloudflare runtime APIs](https://developers.cloudflare.com/workers/runtime-apis/nodejs/).
    
*   If you are directly importing a Node.js runtime API, please refer to the Astro documentation on Cloudflare’s [Node.js compatibility](/en/guides/integrations-guide/cloudflare/#nodejs-compatibility) for further steps on how to resolve this.
    
*   If you are importing a package that imports a Node.js runtime API, check with the author of the package to see if they support the `node:*` import syntax. If they do not, you may need to find an alternative package.
    

More Deployment Guides
----------------------

*   ![](/logos/netlify.svg)
    
    ### [Netlify](/en/guides/deploy/netlify/)
    
*   ![](/logos/vercel.svg)
    
    ### [Vercel](/en/guides/deploy/vercel/)
    
*   ![](/logos/deno.svg)
    
    ### [Deno Deploy](/en/guides/deploy/deno/)
    
*   ![](/logos/github.svg)
    
    ### [GitHub Pages](/en/guides/deploy/github/)
    
*   ![](/logos/gitlab.svg)
    
    ### [GitLab Pages](/en/guides/deploy/gitlab/)
    
*   ![](/logos/cloudflare-pages.svg)
    
    ### [Cloudflare Pages](/en/guides/deploy/cloudflare/)
    
*   ![](/logos/aws.svg)
    
    ### [AWS](/en/guides/deploy/aws/)
    
*   ![](/logos/flightcontrol.svg)
    
    ### [AWS via Flightcontrol](/en/guides/deploy/flightcontrol/)
    
*   ![](/logos/sst.svg)
    
    ### [AWS via SST](/en/guides/deploy/sst/)
    
*   ![](/logos/clever-cloud.svg)
    
    ### [Clever Cloud](/en/guides/deploy/clever-cloud/)
    
*   ![](/logos/azion.svg)
    
    ### [Azion](/en/guides/deploy/azion/)
    
*   ![](/logos/google-cloud.svg)
    
    ### [Google Cloud](/en/guides/deploy/google-cloud/)
    
*   ![](/logos/firebase.svg)
    
    ### [Google Firebase](/en/guides/deploy/google-firebase/)
    
*   ![](/logos/heroku.svg)
    
    ### [Heroku](/en/guides/deploy/heroku/)
    
*   ![](/logos/microsoft-azure.svg)
    
    ### [Microsoft Azure](/en/guides/deploy/microsoft-azure/)
    
*   ![](/logos/buddy.svg)
    
    ### [Buddy](/en/guides/deploy/buddy/)
    
*   ![](/logos/edgio.svg)
    
    ### [Edgio](/en/guides/deploy/edgio/)
    
*   ![](/logos/fleek.svg)
    
    ### [Fleek](/en/guides/deploy/fleek/)
    
*   ![](/logos/flyio.svg)
    
    ### [Fly.io](/en/guides/deploy/flyio/)
    
*   ![](/logos/render.svg)
    
    ### [Render](/en/guides/deploy/render/)
    
*   ![](/logos/stormkit.svg)
    
    ### [Stormkit](/en/guides/deploy/stormkit/)
    
*   ![](/logos/surge.svg)
    
    ### [Surge](/en/guides/deploy/surge/)
    
*   ![](/logos/cleavr.svg)
    
    ### [Cleavr](/en/guides/deploy/cleavr/)
    
*   ![](/logos/kinsta.svg)
    
    ### [Kinsta](/en/guides/deploy/kinsta/)
    
*   ![](/logos/zeabur.svg)
    
    ### [Zeabur](/en/guides/deploy/zeabur/)
    
*   ![](/logos/zerops.svg)
    
    ### [Zerops](/en/guides/deploy/zerops/)
    

Recipes

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/deploy/cloudflare.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Clever Cloud](/en/guides/deploy/clever-cloud/) [Next  
Deno](/en/guides/deploy/deno/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/guides/deploy/github
Deploy your Astro Site to GitHub Pages
======================================

You can use [GitHub Pages](https://pages.github.com/) to host an Astro website directly from a repository on [GitHub.com](https://github.com/).

How to deploy
-------------

[Section titled How to deploy](#how-to-deploy)

You can deploy an Astro site to GitHub Pages by using [GitHub Actions](https://github.com/features/actions) to automatically build and deploy your site. To do this, your source code must be hosted on GitHub.

Astro maintains the official `withastro/action` to deploy your project with very little configuration. Follow the instructions below to deploy your Astro site to GitHub pages, and see [the package README](https://github.com/withastro/action) if you need more information.

Configure Astro for GitHub Pages
--------------------------------

[Section titled Configure Astro for GitHub Pages](#configure-astro-for-github-pages)

### Deploying to a `github.io` URL

[Section titled Deploying to a github.io URL](#deploying-to-a-githubio-url)

Set the [`site`](/en/reference/configuration-reference/#site) and [`base`](/en/reference/configuration-reference/#base) options in `astro.config.mjs`.

astro.config.mjs

    import { defineConfig } from 'astro/config'
    export default defineConfig({  site: 'https://astronaut.github.io',  base: 'my-repo',})

#### `site`

[Section titled site](#site)

The value for `site` must be one of the following:

*   The following URL based on your username: `https://<username>.github.io`
*   The random URL autogenerated for a [GitHub Organization’s private page](https://docs.github.com/en/enterprise-cloud@latest/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site): `https://<random-string>.pages.github.io/`

#### `base`

[Section titled base](#base)

A value for `base` may be required so that Astro will treat your repository name (e.g. `/my-repo`) as the root of your website.

Note

Don’t set a `base` parameter if:

*   Your page is served from the root folder.
*   Your repository is located at `https://github.com/<USERNAME>/<USERNAME>.github.io`.

The value for `base` should be your repository’s name starting with a forward slash, for example `/my-blog`. This is so that Astro understands your website’s root is `/my-repo`, rather than the default `/`.

Caution

When this value is configured, all of your internal page links must be prefixed with your `base` value:

    <a href="/my-repo/about">About</a>

See more about [configuring a `base` value](/en/reference/configuration-reference/#base)

### Using GitHub pages with a custom domain

[Section titled Using GitHub pages with a custom domain](#using-github-pages-with-a-custom-domain)

Set up a custom domain

You can set up a custom domain by adding the following `./public/CNAME` file to your project:

public/CNAME

    sub.mydomain.com

This will deploy your site at your custom domain instead of `user.github.io`. Don’t forget to also [configure DNS for your domain provider](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-a-subdomain).

To configure Astro for using GitHub pages with a custom domain, set your domain as the value for `site`. Do not set a value for `base`:

astro.config.mjs

    import { defineConfig } from 'astro/config'
    export default defineConfig({  site: 'https://example.com',})

Configure a GitHub Action
-------------------------

[Section titled Configure a GitHub Action](#configure-a-github-action)

1.  Create a new file in your project at `.github/workflows/deploy.yml` and paste in the YAML below.
    
    deploy.yml
    
        name: Deploy to GitHub Pages
        on:  # Trigger the workflow every time you push to the `main` branch  # Using a different branch name? Replace `main` with your branch’s name  push:    branches: [ main ]  # Allows you to run this workflow manually from the Actions tab on GitHub.  workflow_dispatch:
        # Allow this job to clone the repo and create a page deploymentpermissions:  contents: read  pages: write  id-token: write
        jobs:  build:    runs-on: ubuntu-latest    steps:      - name: Checkout your repository using git        uses: actions/checkout@v4      - name: Install, build, and upload your site        uses: withastro/action@v3        # with:          # path: . # The root location of your Astro project inside the repository. (optional)          # node-version: 20 # The specific version of Node that should be used to build your site. Defaults to 20. (optional)          # package-manager: pnpm@latest # The Node package manager that should be used to install dependencies and build your site. Automatically detected based on your lockfile. (optional)
          deploy:    needs: build    runs-on: ubuntu-latest    environment:      name: github-pages      url: ${{ steps.deployment.outputs.page_url }}    steps:      - name: Deploy to GitHub Pages        id: deployment        uses: actions/deploy-pages@v4
    
    Note
    
    The astro action takes a few optional inputs. These can be provided by uncommenting the `with:` line and the input you want to use.
    
    Caution
    
    The official Astro [action](https://github.com/withastro/action) scans for a lockfile to detect your preferred package manager (`npm`, `yarn`, `pnpm`, or `bun`). You should commit your package manager’s automatically generated `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`, or `bun.lockb` file to your repository.
    
2.  On GitHub, go to your repository’s **Settings** tab and find the **Pages** section of the settings.
    
3.  Choose **GitHub Actions** as the **Source** of your site.
    
4.  Commit the new workflow file and push it to GitHub.
    

Your site should now be published! When you push changes to your Astro project’s repository, the GitHub Action will automatically deploy them for you.

Examples
--------

[Section titled Examples](#examples)

*   [Github Pages Deployment](https://github.com/hkbertoson/github-pages)

More Deployment Guides
----------------------

*   ![](/logos/netlify.svg)
    
    ### [Netlify](/en/guides/deploy/netlify/)
    
*   ![](/logos/vercel.svg)
    
    ### [Vercel](/en/guides/deploy/vercel/)
    
*   ![](/logos/deno.svg)
    
    ### [Deno Deploy](/en/guides/deploy/deno/)
    
*   ![](/logos/github.svg)
    
    ### [GitHub Pages](/en/guides/deploy/github/)
    
*   ![](/logos/gitlab.svg)
    
    ### [GitLab Pages](/en/guides/deploy/gitlab/)
    
*   ![](/logos/cloudflare-pages.svg)
    
    ### [Cloudflare Pages](/en/guides/deploy/cloudflare/)
    
*   ![](/logos/aws.svg)
    
    ### [AWS](/en/guides/deploy/aws/)
    
*   ![](/logos/flightcontrol.svg)
    
    ### [AWS via Flightcontrol](/en/guides/deploy/flightcontrol/)
    
*   ![](/logos/sst.svg)
    
    ### [AWS via SST](/en/guides/deploy/sst/)
    
*   ![](/logos/clever-cloud.svg)
    
    ### [Clever Cloud](/en/guides/deploy/clever-cloud/)
    
*   ![](/logos/azion.svg)
    
    ### [Azion](/en/guides/deploy/azion/)
    
*   ![](/logos/google-cloud.svg)
    
    ### [Google Cloud](/en/guides/deploy/google-cloud/)
    
*   ![](/logos/firebase.svg)
    
    ### [Google Firebase](/en/guides/deploy/google-firebase/)
    
*   ![](/logos/heroku.svg)
    
    ### [Heroku](/en/guides/deploy/heroku/)
    
*   ![](/logos/microsoft-azure.svg)
    
    ### [Microsoft Azure](/en/guides/deploy/microsoft-azure/)
    
*   ![](/logos/buddy.svg)
    
    ### [Buddy](/en/guides/deploy/buddy/)
    
*   ![](/logos/edgio.svg)
    
    ### [Edgio](/en/guides/deploy/edgio/)
    
*   ![](/logos/fleek.svg)
    
    ### [Fleek](/en/guides/deploy/fleek/)
    
*   ![](/logos/flyio.svg)
    
    ### [Fly.io](/en/guides/deploy/flyio/)
    
*   ![](/logos/render.svg)
    
    ### [Render](/en/guides/deploy/render/)
    
*   ![](/logos/stormkit.svg)
    
    ### [Stormkit](/en/guides/deploy/stormkit/)
    
*   ![](/logos/surge.svg)
    
    ### [Surge](/en/guides/deploy/surge/)
    
*   ![](/logos/cleavr.svg)
    
    ### [Cleavr](/en/guides/deploy/cleavr/)
    
*   ![](/logos/kinsta.svg)
    
    ### [Kinsta](/en/guides/deploy/kinsta/)
    
*   ![](/logos/zeabur.svg)
    
    ### [Zeabur](/en/guides/deploy/zeabur/)
    
*   ![](/logos/zerops.svg)
    
    ### [Zerops](/en/guides/deploy/zerops/)
    

Recipes

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/deploy/github.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Fly.io](/en/guides/deploy/flyio/) [Next  
GitLab Pages](/en/guides/deploy/gitlab/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/guides/deploy/google-firebase
Deploy your Astro Site to Google’s Firebase Hosting
===================================================

[Firebase Hosting](https://firebase.google.com/products/hosting) is a service provided by Google’s [Firebase](https://firebase.google.com/) app development platform, which can be used to deploy an Astro site.

See our separate guide for [adding Firebase backend services](/en/guides/backend/google-firebase/) such as databases, authentication, and storage.

Project Configuration
---------------------

[Section titled Project Configuration](#project-configuration)

Your Astro project can be deployed to Firebase as a static site, or as a server-side rendered site (SSR).

### Static Site

[Section titled Static Site](#static-site)

Your Astro project is a static site by default. You don’t need any extra configuration to deploy a static Astro site to Firebase.

### Adapter for SSR

[Section titled Adapter for SSR](#adapter-for-ssr)

To enable SSR in your Astro project and deploy on Firebase add the [Node.js adapter](/en/guides/integrations-guide/node/).

Note

Deploying an SSR Astro site to Firebase requires the [Blaze plan](https://firebase.google.com/pricing) or higher.

How to deploy
-------------

[Section titled How to deploy](#how-to-deploy)

1.  Install the [Firebase CLI](https://github.com/firebase/firebase-tools). This is a command-line tool that allows you to interact with Firebase from the terminal.
    
    (() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()
    
    *   [npm](#tab-panel-3146)
    *   [pnpm](#tab-panel-3147)
    *   [Yarn](#tab-panel-3148)
    
    Terminal window
    
        npm install firebase-tools
    
    Terminal window
    
        pnpm add firebase-tools
    
    Terminal window
    
        yarn add firebase-tools
    
    class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);
2.  Authenticate the Firebase CLI with your Google account. This will open a browser window where you can log in to your Google account.
    
    *   [npm](#tab-panel-3149)
    *   [pnpm](#tab-panel-3150)
    *   [Yarn](#tab-panel-3151)
    
    Terminal window
    
        npx firebase login
    
    Terminal window
    
        pnpm exec firebase login
    
    Terminal window
    
        yarn firebase login
    
3.  Enable experimental web frameworks support. This is an experimental feature that allows the Firebase CLI to detect and configure your deployment settings for Astro.
    
    *   [npm](#tab-panel-3152)
    *   [pnpm](#tab-panel-3153)
    *   [Yarn](#tab-panel-3154)
    
    Terminal window
    
        npx firebase experiments:enable webframeworks
    
    Terminal window
    
        pnpm exec firebase experiments:enable webframeworks
    
    Terminal window
    
        yarn firebase experiments:enable webframeworks
    
4.  Initialize Firebase Hosting in your project. This will create a `firebase.json` and `.firebaserc` file in your project root.
    
    *   [npm](#tab-panel-3155)
    *   [pnpm](#tab-panel-3156)
    *   [Yarn](#tab-panel-3157)
    
    Terminal window
    
        npx firebase init hosting
    
    Terminal window
    
        pnpm exec firebase init hosting
    
    Terminal window
    
        yarn firebase init hosting
    
5.  Deploy your site to Firebase Hosting. This will build your Astro site and deploy it to Firebase.
    
    *   [npm](#tab-panel-3158)
    *   [pnpm](#tab-panel-3159)
    *   [Yarn](#tab-panel-3160)
    
    Terminal window
    
        npx firebase deploy --only hosting
    
    Terminal window
    
        pnpm exec firebase deploy --only hosting
    
    Terminal window
    
        yarn firebase deploy --only hosting
    

More Deployment Guides
----------------------

*   ![](/logos/netlify.svg)
    
    ### [Netlify](/en/guides/deploy/netlify/)
    
*   ![](/logos/vercel.svg)
    
    ### [Vercel](/en/guides/deploy/vercel/)
    
*   ![](/logos/deno.svg)
    
    ### [Deno Deploy](/en/guides/deploy/deno/)
    
*   ![](/logos/github.svg)
    
    ### [GitHub Pages](/en/guides/deploy/github/)
    
*   ![](/logos/gitlab.svg)
    
    ### [GitLab Pages](/en/guides/deploy/gitlab/)
    
*   ![](/logos/cloudflare-pages.svg)
    
    ### [Cloudflare Pages](/en/guides/deploy/cloudflare/)
    
*   ![](/logos/aws.svg)
    
    ### [AWS](/en/guides/deploy/aws/)
    
*   ![](/logos/flightcontrol.svg)
    
    ### [AWS via Flightcontrol](/en/guides/deploy/flightcontrol/)
    
*   ![](/logos/sst.svg)
    
    ### [AWS via SST](/en/guides/deploy/sst/)
    
*   ![](/logos/clever-cloud.svg)
    
    ### [Clever Cloud](/en/guides/deploy/clever-cloud/)
    
*   ![](/logos/azion.svg)
    
    ### [Azion](/en/guides/deploy/azion/)
    
*   ![](/logos/google-cloud.svg)
    
    ### [Google Cloud](/en/guides/deploy/google-cloud/)
    
*   ![](/logos/firebase.svg)
    
    ### [Google Firebase](/en/guides/deploy/google-firebase/)
    
*   ![](/logos/heroku.svg)
    
    ### [Heroku](/en/guides/deploy/heroku/)
    
*   ![](/logos/microsoft-azure.svg)
    
    ### [Microsoft Azure](/en/guides/deploy/microsoft-azure/)
    
*   ![](/logos/buddy.svg)
    
    ### [Buddy](/en/guides/deploy/buddy/)
    
*   ![](/logos/edgio.svg)
    
    ### [Edgio](/en/guides/deploy/edgio/)
    
*   ![](/logos/fleek.svg)
    
    ### [Fleek](/en/guides/deploy/fleek/)
    
*   ![](/logos/flyio.svg)
    
    ### [Fly.io](/en/guides/deploy/flyio/)
    
*   ![](/logos/render.svg)
    
    ### [Render](/en/guides/deploy/render/)
    
*   ![](/logos/stormkit.svg)
    
    ### [Stormkit](/en/guides/deploy/stormkit/)
    
*   ![](/logos/surge.svg)
    
    ### [Surge](/en/guides/deploy/surge/)
    
*   ![](/logos/cleavr.svg)
    
    ### [Cleavr](/en/guides/deploy/cleavr/)
    
*   ![](/logos/kinsta.svg)
    
    ### [Kinsta](/en/guides/deploy/kinsta/)
    
*   ![](/logos/zeabur.svg)
    
    ### [Zeabur](/en/guides/deploy/zeabur/)
    
*   ![](/logos/zerops.svg)
    
    ### [Zerops](/en/guides/deploy/zerops/)
    

Recipes

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/deploy/google-firebase.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Google Cloud](/en/guides/deploy/google-cloud/) [Next  
Heroku](/en/guides/deploy/heroku/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



